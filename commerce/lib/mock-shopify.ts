import { mockProducts, mockCollections, mockCart, MockProduct, MockCollection } from './mock-data';

// Mock functions that match the Shopify API interface
export async function getProducts(): Promise<MockProduct[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProducts;
}

export async function getProduct(handle: string): Promise<MockProduct | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProducts.find(product => product.handle === handle) || null;
}

export async function getCollections(): Promise<MockCollection[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCollections;
}

export async function getCollection(handle: string): Promise<MockCollection | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCollections.find(collection => collection.handle === handle) || null;
}

export async function getCart() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCart;
}

export async function createCart() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCart;
}

export async function addToCart(cartId: string, lines: any[]) {
  await new Promise(resolve => setTimeout(resolve, 100));
  // In a real implementation, this would update the cart
  return mockCart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  await new Promise(resolve => setTimeout(resolve, 100));
  // In a real implementation, this would update the cart
  return mockCart;
}

export async function updateCart(cartId: string, lines: any[]) {
  await new Promise(resolve => setTimeout(resolve, 100));
  // In a real implementation, this would update the cart
  return mockCart;
}
