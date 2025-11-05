"use client";

import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useFavorites } from "lib/favorites-context";
import { useAuth } from "lib/auth-context";
import ImageNotAvailable from "components/icons/image-not-available";
import { useEffect } from "react";
import { useGlobalToast } from "lib/global-toast";

// Helper to create URL-friendly handle from product title
function createHandle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { user, loading } = useAuth();
  const { showSuccess, showInfo } = useGlobalToast();

  // Check for pending favorite after login
  useEffect(() => {
    if (!loading && user) {
      const pendingFavorite = localStorage.getItem("pendingFavorite");
      if (pendingFavorite) {
        try {
          const product = JSON.parse(pendingFavorite);
          // Add the product to favorites
          toggleFavorite(product);
          showSuccess("Zu Favoriten hinzugefügt", product.title, 3000);
          // Clear the pending favorite
          localStorage.removeItem("pendingFavorite");
        } catch (error) {
          console.error("Error adding pending favorite:", error);
          localStorage.removeItem("pendingFavorite");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (favorites.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Ihre Favoriten
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Behalten Sie Produkte im Auge, die Sie lieben
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center py-12">
          <HeartIcon className="h-24 w-24 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Noch keine Favoriten
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Beginnen Sie mit dem Durchsuchen unserer Produkte und fügen Sie Ihre Favoriten hinzu, indem Sie auf das Herzsymbol klicken. Ihre Lieblingsartikel werden hier angezeigt.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Produkte durchsuchen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Ihre Favoriten
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {favorites.length} {favorites.length === 1 ? "Produkt" : "Produkte"}{" "}
          in Ihren Favoriten
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.map((product) => {
          const productHandle = product.handle || createHandle(product.title);
          return (
          <div
            key={product.id}
            className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
          >
            <Link href={`/product/${productHandle}`} className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageNotAvailable size={80} />
                )}
              </div>
              
              {/* Favorite Button - Toggle */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(product);
                  showInfo("Aus Favoriten entfernt", product.title, 3000);
                }}
                className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md z-10"
                aria-label="Remove from favorites"
              >
                <HeartIcon className="h-4 w-4 text-red-500 fill-current" />
              </button>
            </Link>

            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
                {product.title}
              </h3>

              {product.sizes.length > 0 && (
                <p className="text-xs text-gray-500 mb-2">{product.sizes[0]}</p>
              )}

              <div className="mt-auto">
                <p className="text-base font-bold text-blue-600 mb-2">
                  {product.price}
                </p>

                <Link
                  href={`/product/${productHandle}`}
                  className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center block text-xs font-medium"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
