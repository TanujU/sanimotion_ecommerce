export interface MockProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  images: {
    id: string;
    url: string;
    altText: string;
  }[];
  variants: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  }[];
  tags: string[];
}

export interface MockCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  products: MockProduct[];
}

export interface MockCartItem {
  id: string;
  quantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: any[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: {
        url: string;
        altText: string;
      };
    };
  };
}

export interface MockCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: MockCartItem[];
  totalQuantity: number;
}

export const mockProducts: MockProduct[] = [
  // Products will be loaded from Supabase database
];

export const mockCollections: MockCollection[] = [
  // ===== COLLECTION OPTIONS =====
];

// Create a mutable mock cart
let mockCartState: MockCart = {
  id: 'mock-cart-id',
  checkoutUrl: '#',
  cost: {
    subtotalAmount: {
      amount: '0.00',
      currencyCode: 'EUR'
    },
    totalAmount: {
      amount: '0.00',
      currencyCode: 'EUR'
    },
    totalTaxAmount: {
      amount: '0.00',
      currencyCode: 'EUR'
    }
  },
  lines: [],
  totalQuantity: 0
};

// Function to get current cart state
export function getMockCart(): MockCart {
  return { ...mockCartState };
}

// Function to add item to cart
export function addItemToMockCart(variantId: string, quantity: number = 1): MockCart {
  const product = mockProducts.find(p => p.variants.some(v => v.id === variantId));
  const variant = product?.variants.find(v => v.id === variantId);
  
  if (!product || !variant) {
    throw new Error('Product or variant not found');
  }

  const existingItem = mockCartState.lines.find(item => item.merchandise.id === variantId);
  
  if (existingItem) {
    // Update existing item
    existingItem.quantity += quantity;
    existingItem.cost.totalAmount.amount = (parseFloat(variant.price.amount) * existingItem.quantity).toFixed(2);
  } else {
    // Add new item
    const newItem: MockCartItem = {
      id: `line-${Date.now()}`,
      quantity,
      cost: {
        totalAmount: {
          amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
          currencyCode: variant.price.currencyCode
        }
      },
      merchandise: {
        id: variantId,
        title: variant.title,
        selectedOptions: [],
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: {
            url: product.images[0]?.url || '',
            altText: product.images[0]?.altText || product.title
          }
        }
      }
    };
    mockCartState.lines.push(newItem);
  }

  // Update cart totals
  const totalQuantity = mockCartState.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = mockCartState.lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);

  mockCartState.totalQuantity = totalQuantity;
  mockCartState.cost.totalAmount.amount = totalAmount.toFixed(2);
  mockCartState.cost.subtotalAmount.amount = totalAmount.toFixed(2);

  return { ...mockCartState };
}

// Function to remove item from cart
export function removeItemFromMockCart(lineId: string): MockCart {
  mockCartState.lines = mockCartState.lines.filter(item => item.id !== lineId);
  
  // Update cart totals
  const totalQuantity = mockCartState.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = mockCartState.lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);

  mockCartState.totalQuantity = totalQuantity;
  mockCartState.cost.totalAmount.amount = totalAmount.toFixed(2);
  mockCartState.cost.subtotalAmount.amount = totalAmount.toFixed(2);

  return { ...mockCartState };
}

// Function to update item quantity
export function updateItemQuantityInMockCart(lineId: string, quantity: number): MockCart {
  const item = mockCartState.lines.find(item => item.id === lineId);
  if (!item) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    return removeItemFromMockCart(lineId);
  }

  const singleItemPrice = parseFloat(item.cost.totalAmount.amount) / item.quantity;
  item.quantity = quantity;
  item.cost.totalAmount.amount = (singleItemPrice * quantity).toFixed(2);

  // Update cart totals
  const totalQuantity = mockCartState.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = mockCartState.lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);

  mockCartState.totalQuantity = totalQuantity;
  mockCartState.cost.totalAmount.amount = totalAmount.toFixed(2);
  mockCartState.cost.subtotalAmount.amount = totalAmount.toFixed(2);

  return { ...mockCartState };
}

// Function to clear the cart (for checkout)
export function clearMockCart(): MockCart {
  mockCartState = {
    id: 'mock-cart-id',
    checkoutUrl: '#',
    cost: {
      subtotalAmount: {
        amount: '0.00',
        currencyCode: 'EUR'
      },
      totalAmount: {
        amount: '0.00',
        currencyCode: 'EUR'
      },
      totalTaxAmount: {
        amount: '0.00',
        currencyCode: 'EUR'
      }
    },
    lines: [],
    totalQuantity: 0
  };
  
  return { ...mockCartState };
}

// Legacy export for backward compatibility
export const mockCart = mockCartState;
