// Simple, clear types for our e-commerce store

export interface Product {
  id: string;
  name: string;
  handle: string; // URL-friendly version of name
  dosage?: string;
  price: number;
  description?: string;
  imageUrl?: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productHandle: string;
  productImageUrl?: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Collection {
  id: string;
  name: string;
  handle: string;
  description?: string;
}

// For compatibility with existing components that expect these shapes
export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ProductWithVariants extends Omit<Product, 'price'> {
  title: string; // alias for name
  dosage?: string;
  variants: ProductVariant[];
  priceRange: {
    maxVariantPrice: { amount: string; currencyCode: string };
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: Array<{
    url: string;
    altText: string;
    width: number;
    height: number;
  }>;
  featuredImage?: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
}

export interface Menu {
  title: string;
  path: string;
}
