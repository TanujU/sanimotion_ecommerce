"use client";

import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useFavorites } from "lib/favorites-context";
import ImageNotAvailable from "components/icons/image-not-available";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageNotAvailable size={120} />
                )}
              </div>
              <div className="absolute top-3 right-3">
                <HeartIcon className="h-6 w-6 text-red-500 fill-current" />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                {product.title}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-gray-900">
                  {product.price}
                </span>
                {product.sizes.length > 0 && (
                  <div className="flex items-center space-x-1">
                    {product.sizes.map((size, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          index === 0
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={`/product/${product.id}`}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center block"
              >
                Produkt ansehen
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
