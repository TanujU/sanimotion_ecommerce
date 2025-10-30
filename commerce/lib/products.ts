// Simple product service that works directly with Supabase
import { supabase } from './supabase';
import { Product, ProductWithVariants } from './types';

// Helper function to create URL-friendly handle from product name
function createHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function sanitizePrice(value: any): string {
  if (value == null) return '0.00';
  const str = String(value).trim();
  // Keep only digits, comma, dot
  let s = str.replace(/[^0-9,\.]/g, '');
  // If both separators exist, assume EU format ('.' thousands, ',' decimal)
  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/\./g, '').replace(/,/g, '.');
  } else if (s.includes(',')) {
    // Only comma present: treat as decimal separator
    s = s.replace(/,/g, '.');
  }
  // Now remove any extra dots except the last one
  const parts = s.split('.');
  if (parts.length > 2) {
    const decimals = parts.pop();
    s = parts.join('') + '.' + decimals;
  }
  const num = parseFloat(s);
  return Number.isFinite(num) ? num.toFixed(2) : '0.00';
}

// Get all products from Supabase
export async function getProducts(searchQuery?: string): Promise<ProductWithVariants[]> {
  try {
    let query = supabase
      .from('products')
      .select('*'); // be tolerant to differing column names across environments

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    const mapped = products.map(convertToProductWithVariants);
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return mapped.filter(p =>
        p.title.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
      );
    }
    return mapped;
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

// Get a single product by handle (URL-friendly name)
export async function getProduct(handle: string): Promise<ProductWithVariants | null> {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return null;
    }

    // Find product by matching handle
    const product = products.find(p => createHandle(p.name ?? p.Artikelbezeichnung) === handle);
    if (!product) return null;

    return convertToProductWithVariants(product);
  } catch (error) {
    console.error('Error in getProduct:', error);
    return null;
  }
}

// Get product recommendations (just return other products for now)
export async function getProductRecommendations(productId: string): Promise<ProductWithVariants[]> {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .neq('id', productId)
      .limit(3);

    if (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }

    return products.map(convertToProductWithVariants);
  } catch (error) {
    console.error('Error in getProductRecommendations:', error);
    return [];
  }
}

// Convert Supabase product to format expected by existing components
function convertToProductWithVariants(product: any): ProductWithVariants {
  const productName: string = product.name ?? product.Artikelbezeichnung ?? 'Unknown Product';
  const handle = createHandle(productName);
  const rawPrice = product.price ?? product.Preis ?? product.preis;
  const priceAmount = sanitizePrice(rawPrice);
  
  return {
    id: product.id,
    name: productName,
    title: productName, // alias for compatibility
    handle,
    dosage: '1 Stück', // Default dosage since it's not in the database
    description: product.description || `${productName} - Medical product`,
    imageUrl: product.image_url ?? product.imageUrl ?? undefined,
    availableForSale: product.is_active === undefined ? true : !!product.is_active,
    createdAt: product.created_at || new Date().toISOString(),
    updatedAt: product.updated_at || new Date().toISOString(),
    variants: [{
      id: `${product.id}-variant`,
      title: 'Standard',
      availableForSale: !!product.is_active,
      price: {
        amount: priceAmount,
        currencyCode: 'EUR'
      },
      selectedOptions: []
    }],
    priceRange: {
      maxVariantPrice: { amount: priceAmount, currencyCode: 'EUR' },
      minVariantPrice: { amount: priceAmount, currencyCode: 'EUR' }
    },
    images: product.image_url ? [{ url: product.image_url, altText: productName, width: 800, height: 800 }] : [],
    featuredImage: product.image_url ? { url: product.image_url, altText: productName, width: 800, height: 800 } : undefined
  };
}
