'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  sku?: string;
  active: boolean;
}

type CartItemInput = Omit<CartItem, "_id" | "active"> & {
  id?: string | number;
  _id?: string | number;
  active?: boolean;
};

const normalizeCartItem = (
  item: CartItemInput,
  activeOverride?: boolean,
): CartItem | null => {
  const id = item._id ?? item.id;
  if (id === undefined || id === null || String(id).length === 0) {
    console.error("Cannot add cart item without an id:", item);
    return null;
  }
  if (/^\d{13}$/.test(String(id))) {
    console.error("Cannot use a generated timestamp as a product id:", item);
    return null;
  }

  return {
    _id: String(id),
    image: item.image,
    title: item.title,
    price: Number(item.price) || 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    ...(item.sku ? { sku: item.sku } : {}),
    active: activeOverride ?? item.active ?? true,
  };
};

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItemInput) => void;
  addToWishlist: (item: CartItemInput) => void;
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  isCartLoaded: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const storedItems = JSON.parse(storedCart) as CartItemInput[];
        setCartItems(storedItems
          .map((item) => normalizeCartItem(item))
          .filter((item): item is CartItem => item !== null));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = (item: CartItemInput) => {
    const normalizedItem = normalizeCartItem(item, true);
    if (!normalizedItem) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === normalizedItem._id && i.active);
      if (existing) {
        return prev.map((i) =>
          i._id === normalizedItem._id && i.active
            ? { ...i, quantity: i.quantity + normalizedItem.quantity }
            : i
        );
      }
      return [...prev, normalizedItem];
    });
  };

  const addToWishlist = (item: CartItemInput) => {
    const normalizedItem = normalizeCartItem(item, false);
    if (!normalizedItem) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === normalizedItem._id && !i.active);
      if (existing) {
        return prev.map((i) =>
          i._id === normalizedItem._id && !i.active
            ? { ...i, quantity: i.quantity + normalizedItem.quantity }
            : i
        );
      }
      return [...prev, normalizedItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToWishlist,
        removeFromCart,
        updateItemQuantity,
        isCartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
