"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoriteProduct {
  id: string;
  title: string;
  price: string;
  sizes: string[];
  image: string;
  alt: string;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  addToFavorites: (product: FavoriteProduct) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: FavoriteProduct) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: FavoriteProduct) => {
    setFavorites((prev) => {
      // Check if product is already in favorites
      if (prev.some((fav) => fav.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const toggleFavorite = (product: FavoriteProduct) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    // Fail-safe: return a no-op implementation instead of throwing
    if (typeof window !== "undefined") {
      console.warn(
        "useFavorites called outside FavoritesProvider. Rendering with no-op favorites."
      );
    }
    return {
      favorites: [],
      addToFavorites: () => {},
      removeFromFavorites: () => {},
      isFavorite: () => false,
      toggleFavorite: () => {},
    } as FavoritesContextType;
  }
  return context;
}
