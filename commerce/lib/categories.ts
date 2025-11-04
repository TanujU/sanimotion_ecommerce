import { supabase } from './supabase';

export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithPath {
  id: string;
  title: string;
  path: string;
  description?: string;
}

// Fetch all active categories from the database
export async function getCategories(): Promise<CategoryWithPath[]> {
  try {
    console.log('Fetching categories from categories table...');
    
    // Try to fetch from categories table with Produktbereich column
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('id, Produktbereich, description')
      .not('Produktbereich', 'is', null)
      .order('Produktbereich', { ascending: true });

    console.log('Categories query result:', { categoriesData, categoriesError });

    // If categories table exists and has data, use it
    if (!categoriesError && categoriesData && categoriesData.length > 0) {
      console.log(`Found ${categoriesData.length} categories in categories table:`, categoriesData);
      return categoriesData.map(cat => ({
        id: cat.id,
        title: cat.Produktbereich,
        path: `/search/${createCategorySlug(cat.Produktbereich)}`,
        description: cat.description || cat.Produktbereich
      }));
    }

    console.log('Categories table empty or error, trying products.Produktbereich column...');
    
    // Fallback: Fetch from products.Produktbereich
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('Produktbereich')
      .not('Produktbereich', 'is', null);

    if (productsError) {
      console.error('Error fetching products for categories:', productsError);
      return [];
    }

    if (!products || products.length === 0) {
      console.log('No products with Produktbereich found in database');
      return [];
    }

    console.log('Fetched products with Produktbereich:', products.slice(0, 5));

    // Extract unique category names from Produktbereich
    const uniqueCategories = Array.from(
      new Set(
        products
          .map(p => p.Produktbereich)
          .filter((cat): cat is string => !!cat && cat.trim().length > 0)
      )
    ).sort();

    console.log(`Found ${uniqueCategories.length} unique categories from Produktbereich:`, uniqueCategories);

    // Convert to CategoryWithPath format
    return uniqueCategories.map((categoryName, index) => ({
      id: `produktbereich-${index}`,
      title: categoryName,
      path: `/search/${createCategorySlug(categoryName)}`,
      description: categoryName
    }));
  } catch (error) {
    console.error('Exception in getCategories:', error);
    return [];
  }
}

// Helper function to create URL-friendly slugs from category names
function createCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Fetch a single category by slug (from Produktbereich)
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    console.log('Getting category by slug:', slug);
    
    // Fetch all unique categories from Produktbereich
    const categories = await getCategories();
    
    console.log('All categories for slug matching:', categories.map(c => ({ title: c.title, slug: createCategorySlug(c.title) })));
    
    // Find the category that matches the slug
    const category = categories.find(cat => 
      createCategorySlug(cat.title) === slug
    );

    if (!category) {
      console.log('No category found for slug:', slug);
      return null;
    }

    console.log('Found category:', category);

    // Convert to Category format
    return {
      id: category.id,
      name: category.title,
      description: category.description,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in getCategoryBySlug:', error);
    return null;
  }
}

