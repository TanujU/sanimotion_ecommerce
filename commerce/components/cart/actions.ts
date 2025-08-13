'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { clearMockCart } from 'lib/mock-data';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Fehler beim Hinzufügen zum Warenkorb';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
    return null;
  } catch (e) {
    console.error('Error adding item to cart:', e);
    return 'Fehler beim Hinzufügen zum Warenkorb';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Fehler beim Laden des Warenkorbs';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
      return null;
    } else {
      return 'Artikel nicht im Warenkorb gefunden';
    }
  } catch (e) {
    console.error('Error removing item from cart:', e);
    return 'Fehler beim Entfernen aus dem Warenkorb';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Fehler beim Laden des Warenkorbs';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
    return null;
  } catch (e) {
    console.error('Error updating item quantity:', e);
    return 'Fehler beim Aktualisieren der Menge';
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  
  // For mock environment, clear the cart and show success page
  if (cart?.checkoutUrl === '#') {
    // Clear the cart for mock environment
    clearMockCart();
    revalidateTag(TAGS.cart);
    // In a real implementation, this would redirect to Shopify checkout
    // For now, we'll redirect to a success page
    redirect('/checkout-success');
  }
  
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}
