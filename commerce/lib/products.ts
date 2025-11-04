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

// Get all products from Supabase with images
export async function getProducts(searchQuery?: string, categoryName?: string): Promise<ProductWithVariants[]> {
  try {
    console.log('Fetching products with filters:', { searchQuery, categoryName });
    
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images!product_images_product_id_fkey(
          image_url,
          is_primary,
          sort_order
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by Produktbereich (category) if provided
    if (categoryName) {
      console.log('Filtering by Produktbereich:', categoryName);
      query = query.eq('Produktbereich', categoryName);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      return [];
    }

    if (!products) {
      console.log('No products returned from query');
      return [];
    }

    console.log(`Fetched ${products.length} products`);
    if (categoryName && products.length > 0) {
      console.log('Sample product Produktbereich:', products[0]?.Produktbereich);
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
    console.error('Exception in getProducts:', error);
    return [];
  }
}

// Get a single product by handle (URL-friendly name)
export async function getProduct(handle: string): Promise<ProductWithVariants | null> {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images!product_images_product_id_fkey(
          image_url,
          is_primary,
          sort_order
        )
      `);

    if (error) {
      console.error('Error fetching products:', error);
      return null;
    }

    console.log('Looking for handle:', handle);
    console.log('Available products:', products?.map(p => ({
      name: p.name ?? p.Artikelbezeichnung,
      handle: createHandle(p.name ?? p.Artikelbezeichnung),
      images: p.product_images
    })));

    // Find product by matching handle
    const product = products.find(p => createHandle(p.name ?? p.Artikelbezeichnung) === handle);
    
    if (!product) {
      console.log('Product not found for handle:', handle);
      return null;
    }

    console.log('Found product:', {
      name: product.name ?? product.Artikelbezeichnung,
      product_images: product.product_images,
      price: product.price
    });

    const converted = convertToProductWithVariants(product);
    console.log('Converted product:', {
      title: converted.title,
      images: converted.images,
      featuredImage: converted.featuredImage,
      imageUrl: converted.imageUrl,
      price: converted.priceRange
    });

    return converted;
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
      .select(`
        *,
        product_images!product_images_product_id_fkey(
          image_url,
          is_primary,
          sort_order
        )
      `)
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
  
  // Get primary image from product_images relation
  const productImages = product.product_images || [];
  const primaryImage = productImages.find((img: any) => img.is_primary) || productImages[0];
  const rawImageUrl = primaryImage?.image_url || product.image_url || product.imageUrl;
  const imageUrl = rawImageUrl ? rawImageUrl.trim() : undefined;
  
  // Build all images array with trimmed URLs
  const allImages = productImages
    .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((img: any) => ({
      url: img.image_url ? img.image_url.trim() : '',
      altText: productName,
      width: 800,
      height: 800
    }))
    .filter((img: any) => img.url.length > 0); // Filter out empty URLs
  
  return {
    id: product.id,
    name: productName,
    title: productName, // alias for compatibility
    handle,
    dosage: '1 Stück', // Default dosage since it's not in the database
    description: product.description || `${productName} - Medical product`,
    imageUrl: imageUrl,
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
    images: allImages.length > 0 ? allImages : (imageUrl ? [{ url: imageUrl, altText: productName, width: 800, height: 800 }] : []),
    featuredImage: imageUrl ? { url: imageUrl, altText: productName, width: 800, height: 800 } : undefined
  };
}
