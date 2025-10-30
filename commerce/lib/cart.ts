// Simple cart service - stores cart in memory for now
import { Cart, CartItem, Product, ProductWithVariants } from './types';

// In-memory cart storage (will be lost on page refresh)
// In a real app, you'd store this in localStorage, session, or database
let cartState: Cart = {
  id: 'cart-1',
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Get current cart
export function getCart(): Cart {
  return { ...cartState };
}

// Add item to cart
export function addToCart(product: ProductWithVariants, quantity: number = 1): Cart {
  const price = parseFloat(product.variants[0]?.price.amount || '0');
  const existingItem = cartState.items.find(item => item.productId === product.id);

  if (existingItem) {
    // Update existing item
    existingItem.quantity += quantity;
    existingItem.totalPrice = existingItem.quantity * existingItem.price;
  } else {
    // Add new item
    const newItem: CartItem = {
      id: `cart-item-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productHandle: product.handle,
      productImageUrl: product.imageUrl,
      price,
      quantity,
      totalPrice: price * quantity
    };
    cartState.items.push(newItem);
  }

  updateCartTotals();
  return { ...cartState };
}

// Remove item from cart
export function removeFromCart(itemId: string): Cart {
  cartState.items = cartState.items.filter(item => item.id !== itemId);
  updateCartTotals();
  return { ...cartState };
}

// Update item quantity
export function updateCartItemQuantity(itemId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(itemId);
  }

  const item = cartState.items.find(item => item.id === itemId);
  if (item) {
    item.quantity = quantity;
    item.totalPrice = item.price * quantity;
    updateCartTotals();
  }

  return { ...cartState };
}

// Clear entire cart
export function clearCart(): Cart {
  cartState = {
    id: 'cart-1',
    items: [],
    totalItems: 0,
    totalPrice: 0
  };
  return { ...cartState };
}

// Helper to recalculate cart totals
function updateCartTotals(): void {
  cartState.totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0);
  cartState.totalPrice = cartState.items.reduce((total, item) => total + item.totalPrice, 0);
}

// For compatibility with existing cart context
export function createCart(): Promise<Cart> {
  return Promise.resolve(getCart());
}

// Legacy compatibility functions that match existing cart actions API
export async function addItem(lines: Array<{ merchandiseId: string; quantity: number }>): Promise<Cart> {
  // This is a simplified version - in real app you'd look up the product by merchandiseId
  // For now, just return current cart since we handle add to cart differently
  return getCart();
}

export async function removeItem(lineIds: string[]): Promise<Cart> {
  lineIds.forEach(id => removeFromCart(id));
  return getCart();
}

export async function updateItem(lines: Array<{ id: string; quantity: number }>): Promise<Cart> {
  lines.forEach(line => updateCartItemQuantity(line.id, line.quantity));
  return getCart();
}
