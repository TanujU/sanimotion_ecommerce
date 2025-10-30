// Compatibility layer - re-exports new services with old shopify names
// This allows existing components to work while we transition away from the shopify structure

// Re-export all product functions
export { 
  getProducts, 
  getProduct, 
  getProductRecommendations 
} from './products';

// Re-export all cart functions
export { 
  getCart,
  addItem,
  removeItem,
  updateItem,
  createCart,
  clearCart
} from './cart';

// Mock functions for collections and other shopify features we don't use
export async function getCollections() {
  return [];
}

export async function getCollection(handle: string) {
  return null;
}

export async function getCollectionProducts({ collection }: { collection: string }) {
  return [];
}

export async function getMenu(handle: string) {
  return [
    { title: 'All', path: '/search' },
    { title: 'Medical Supplies', path: '/search' }
  ];
}

export async function getFooterMenu() {
  return [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];
}

export async function getPage(handle: string) {
  return {
    id: handle,
    title: 'Page',
    handle,
    body: 'Content not available',
    bodySummary: 'Summary not available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function getPages() {
  return [];
}

// Legacy cart functions with different names
export async function addToCart(lines: Array<{ merchandiseId: string; quantity: number }>) {
  // Just return empty cart for now - components will be updated
  return await getCart();
}

export async function removeFromCart(lineIds: string[]) {
  return await getCart();
}

export async function updateCart(lines: Array<{ id: string; merchandiseId?: string; quantity: number }>) {
  return await getCart();
}

export async function revalidate() {
  // No-op for compatibility
  return new Response('OK');
}
