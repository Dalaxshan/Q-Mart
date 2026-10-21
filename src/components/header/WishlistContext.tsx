'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WishlistItem {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  sku?: string;
}

interface WishlistContextProps {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  isWishlistLoaded: boolean;
}

const isObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const useWishlist = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  // Load from localStorage on first mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        const storedItems = JSON.parse(storedWishlist) as WishlistItem[];
        setWishlistItems(storedItems.filter((item) => isObjectId(item._id)));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        localStorage.removeItem('wishlist');
      }
    }
    setIsWishlistLoaded(true);
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isWishlistLoaded) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isWishlistLoaded]);

  // Add to wishlist (no duplicates)
  const addToWishlist = (item: WishlistItem) => {
    if (!isObjectId(item._id)) {
      console.error("Cannot add wishlist item without a MongoDB ObjectId:", item);
      return;
    }

    setWishlistItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) return prev;
      return [...prev, item];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Update quantity
  const updateItemQuantity = (id: string, quantity: number) => {
    setWishlistItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        updateItemQuantity,
        isWishlistLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
