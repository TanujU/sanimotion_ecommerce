// Compatibility types - re-exports new types with old shopify names
// This allows existing components to work while we transition

// Re-export all types from our new types file
export type {
  Product,
  ProductWithVariants,
  ProductVariant,
  Cart,
  CartItem,
  Collection,
  Menu
} from '../types';

// Keep the original Product type name pointing to ProductWithVariants for compatibility
export type { ProductWithVariants as Product } from '../types';

// Legacy types that some components might expect
export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type SEO = {
  title: string;
  description: string;
};

export type Connection<T> = {
  edges: Array<{ node: T }>;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

// Additional compatibility types
export type ShopifyProduct = ProductWithVariants;
export type ShopifyCart = Cart;
export type ShopifyCollection = Collection;