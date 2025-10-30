"use client";

import type {
  Cart,
  CartItem,
  ProductWithVariants as Product,
  ProductVariant,
} from "lib/types";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: Product };
    }
  | {
      type: "SET_CART";
      payload: Cart;
    };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
  setCart: (cart: Cart) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// removed legacy Shopify-style helpers; we use simplified cart shape below

function createEmptyCart(): Cart {
  return {
    id: "empty-cart",
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
}

function normalizeCart(input: unknown): Cart {
  // Defensive normalization for older/invalid shapes from localStorage
  try {
    const anyInput = input as any;
    const items = Array.isArray(anyInput?.items) ? anyInput.items : [];

    const safeItems = items
      .map((raw: any) => {
        if (!raw) return null;
        const price = Number(raw.price);
        const quantity = Number(raw.quantity);
        const id = String(raw.id ?? `cart-item-${Date.now()}`);
        const productId = String(raw.productId ?? raw.merchandise?.id ?? "");
        const productName = String(
          raw.productName ?? raw.merchandise?.product?.title ?? raw.title ?? ""
        );
        const productHandle = String(
          raw.productHandle ?? raw.merchandise?.product?.handle ?? ""
        );
        const productImageUrl =
          raw.productImageUrl ?? raw.merchandise?.product?.featuredImage?.url;

        if (!productId) return null;
        const safePrice = Number.isFinite(price) ? price : 0;
        const safeQty =
          Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
        return {
          id,
          productId,
          productName,
          productHandle,
          productImageUrl,
          price: safePrice,
          quantity: safeQty,
          totalPrice: safePrice * safeQty,
        } as CartItem;
      })
      .filter(Boolean) as CartItem[];

    const totalItems = safeItems.reduce((sum, it) => sum + it.quantity, 0);
    const totalPrice = safeItems.reduce((sum, it) => sum + it.totalPrice, 0);

    return {
      id: String(anyInput?.id ?? "normalized-cart"),
      items: safeItems,
      totalItems,
      totalPrice,
    };
  } catch {
    return createEmptyCart();
  }
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state ? normalizeCart(state) : createEmptyCart();
  const items = Array.isArray(currentCart.items) ? currentCart.items : [];

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updatedItems = items
        .map((item) =>
          item.productId === merchandiseId
            ? updateCartItemSimple(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      return {
        ...currentCart,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        ),
      };
    }
    case "ADD_ITEM": {
      const { variant, product } = action.payload;
      const existingItem = items.find((item) => item.productId === variant.id);

      if (existingItem) {
        const updatedItems = items.map((item) =>
          item.productId === variant.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price * (item.quantity + 1),
              }
            : item
        );
        return {
          ...currentCart,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          ),
        };
      } else {
        const newItem: CartItem = {
          id: `cart-item-${Date.now()}`,
          productId: variant.id,
          productName: product.title,
          productHandle: product.handle,
          productImageUrl: product.featuredImage?.url,
          price: parseFloat(variant.price.amount),
          quantity: 1,
          totalPrice: parseFloat(variant.price.amount),
        };
        const updatedItems = [...items, newItem];
        return {
          ...currentCart,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          ),
        };
      }
    }
    case "SET_CART": {
      return action.payload;
    }
    default:
      return currentCart;
  }
}

function updateCartItemSimple(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  return {
    ...item,
    quantity: newQuantity,
    totalPrice: item.price * newQuantity,
  };
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise?: Promise<Cart | undefined>;
}) {
  const [cart, setCartState] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    try {
      // Try to load cart from localStorage first
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartState(normalizeCart(parsedCart));
          return;
        } catch (error) {
          console.error("Error parsing saved cart:", error);
          // Clear invalid cart data
          try {
            localStorage.removeItem("cart");
          } catch (e) {
            console.warn("Error clearing invalid cart:", e);
          }
        }
      }

      // If no saved cart, load from provided value/promise if any
      if (cartPromise) {
        const maybeThen = (cartPromise as any).then;
        if (typeof maybeThen === "function") {
          (cartPromise as Promise<Cart | undefined>)
            .then((initialCart) => {
              try {
                const cartToSet = initialCart || createEmptyCart();
                setCartState(normalizeCart(cartToSet));
                try {
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(normalizeCart(cartToSet))
                  );
                } catch (error) {
                  console.warn("Error saving cart to localStorage:", error);
                }
              } catch (error) {
                console.error("Error setting initial cart:", error);
                setCartState(createEmptyCart());
              }
            })
            .catch((error) => {
              console.error("Error loading cart from promise:", error);
              setCartState(createEmptyCart());
            });
        } else {
          try {
            const initialCart = cartPromise as unknown as Cart | undefined;
            const cartToSet = initialCart || createEmptyCart();
            setCartState(normalizeCart(cartToSet));
          } catch (error) {
            console.error("Error using provided cart value:", error);
            setCartState(createEmptyCart());
          }
        }
      } else {
        // If no cartPromise provided, create empty cart
        setCartState(createEmptyCart());
      }
    } catch (error) {
      console.error("Error in cart initialization:", error);
      setCartState(createEmptyCart());
    }
  }, [cartPromise]);

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    setCartState((prevCart) => {
      if (!prevCart) return prevCart;
      const newCart = cartReducer(prevCart, {
        type: "UPDATE_ITEM",
        payload: { merchandiseId, updateType },
      });
      // Save to localStorage
      try {
        localStorage.setItem("cart", JSON.stringify(newCart));
      } catch (error) {
        console.warn("Error saving cart to localStorage:", error);
      }
      return newCart;
    });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    setCartState((prevCart) => {
      if (!prevCart) return prevCart;
      const newCart = cartReducer(prevCart, {
        type: "ADD_ITEM",
        payload: { variant, product },
      });
      // Save to localStorage
      try {
        localStorage.setItem("cart", JSON.stringify(newCart));
      } catch (error) {
        console.warn("Error saving cart to localStorage:", error);
      }
      return newCart;
    });
  };

  const setCart = (newCart: Cart) => {
    const normalized = normalizeCart(newCart);
    setCartState(normalized);
    // Save to localStorage
    try {
      localStorage.setItem("cart", JSON.stringify(normalized));
    } catch (error) {
      console.warn("Error saving cart to localStorage:", error);
    }
  };

  const value = useMemo(
    () => ({
      cart: cart || createEmptyCart(),
      updateCartItem,
      addCartItem,
      setCart,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
