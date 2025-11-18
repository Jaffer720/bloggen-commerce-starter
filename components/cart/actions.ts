'use server';

import { TAGS } from 'lib/constants';
import {
  SHOP_UNAVAILABLE_USER_MESSAGE,
  addToCart,
  createCart,
  getCart,
  isShopifyUnavailableError,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    updateTag(TAGS.cart);
  } catch (e) {
    if (isShopifyUnavailableError(e)) {
      return SHOP_UNAVAILABLE_USER_MESSAGE;
    }

    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    if (isShopifyUnavailableError(e)) {
      return SHOP_UNAVAILABLE_USER_MESSAGE;
    }

    return 'Error removing item from cart';
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
      return 'Error fetching cart';
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

    updateTag(TAGS.cart);
  } catch (e) {
    if (isShopifyUnavailableError(e)) {
      return SHOP_UNAVAILABLE_USER_MESSAGE;
    }

    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  try {
    const cart = await getCart();

    if (!cart?.checkoutUrl) {
      throw new Error('Missing checkout URL');
    }

    redirect(cart.checkoutUrl);
  } catch (error) {
    if (isShopifyUnavailableError(error)) {
      throw new Error(SHOP_UNAVAILABLE_USER_MESSAGE);
    }

    throw error;
  }
}

export async function createCartAndSetCookie() {
  try {
    const cart = await createCart();
    (await cookies()).set('cartId', cart.id!);
  } catch (error) {
    if (isShopifyUnavailableError(error)) {
      console.error('Unable to create cart due to unavailable shop.', error);
      return;
    }

    throw error;
  }
}
