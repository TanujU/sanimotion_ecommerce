import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Product type from Supabase
export interface SupabaseProduct {
  id: string;
  name: string;
  dosage: string;
  price: number;
  created_at?: string;
  updated_at?: string;
}

// Convert Supabase product to Shopify-compatible format
export function convertSupabaseProductToShopify(product: SupabaseProduct) {
  // Create a unique handle by combining name slug with product ID
  const nameSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const uniqueHandle = `${nameSlug}-${product.id.slice(0, 8)}`; // Use first 8 chars of ID for uniqueness
  
  return {
    id: product.id,
    handle: uniqueHandle,
    availableForSale: true,
    title: product.name,
    description: `${product.name} - ${product.dosage}`,
    descriptionHtml: `<p>${product.name} - ${product.dosage}</p>`,
    dosage: product.dosage, // Add dosage as a separate field
    options: [],
    priceRange: {
      maxVariantPrice: {
        amount: product.price.toString(),
        currencyCode: 'EUR'
      },
      minVariantPrice: {
        amount: product.price.toString(),
        currencyCode: 'EUR'
      }
    },
    variants: [
      {
        id: product.id,
        title: 'Default Title',
        availableForSale: true,
        selectedOptions: [],
        price: {
          amount: product.price.toString(),
          currencyCode: 'EUR'
        }
      }
    ],
    featuredImage: null, // No images - will show fallback
    images: [], // No images - will show fallback
    seo: {
      title: product.name,
      description: `${product.name} - ${product.dosage}`
    },
    tags: ['medical', 'injectable'],
    updatedAt: product.updated_at || new Date().toISOString(),
    createdAt: product.created_at || new Date().toISOString()
  };
}

// Fetch all products from Supabase
export async function getProductsFromSupabase() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return [];
    }

    return products || [];
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return [];
  }
}

// Fetch a single product by ID from Supabase
export async function getProductFromSupabase(id: string) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product from Supabase:', error);
      return null;
    }

    return product;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return null;
  }
}

// Fetch a single product by handle (name slug) from Supabase
export async function getProductByHandleFromSupabase(handle: string) {
  try {
    // Extract product ID from handle (format: "name-slug-productid")
    const handleParts = handle.split('-');
    const possibleId = handleParts[handleParts.length - 1];
    
    // First try to find by ID if the handle ends with an ID-like string
    if (possibleId && possibleId.length >= 8) {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .like('id', `${possibleId}%`)
        .limit(1);

      if (!error && products && products.length > 0) {
        return products[0];
      }
    }
    
    // Fallback: search by name (remove the ID part from handle)
    const nameFromHandle = handleParts.slice(0, -1).join('-').replace(/-/g, ' ');
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${nameFromHandle}%`)
      .limit(1);

    if (error) {
      console.error('Error fetching product by handle from Supabase:', error);
      return null;
    }

    return products?.[0] || null;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return null;
  }
}

// Search products from Supabase
export async function searchProductsFromSupabase(query: string) {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%, dosage.ilike.%${query}%`)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error searching products in Supabase:', error);
      return [];
    }

    return products || [];
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return [];
  }
}
