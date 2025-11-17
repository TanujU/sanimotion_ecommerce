"use client";

import { useState } from "react";
import Link from "next/link";

// Type-safe Link for React 19
const SafeLink = Link as any;
import ImageNotAvailable from "./icons/image-not-available";
import { FavoriteButton } from "./favorite-button";
import Price from "./price";
import { AddToCart } from "./cart/add-to-cart";

import { ProductWithVariants } from "lib/types";

interface BestsellersCarouselProps {
  products: ProductWithVariants[];
}

export function BestsellersCarousel({ products }: BestsellersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= products.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - 1
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  // If no products, show a message
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Derzeit sind keine Produkte verfügbar.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {visibleProducts.map((product, index) => {
          const amount = (product.priceRange?.maxVariantPrice?.amount ||
            product.variants?.[0]?.price?.amount ||
            (typeof (product as any).price === "number"
              ? (product as any).price.toFixed(2)
              : (product as any).price || "0.00")) as string;
          const currency = (product.priceRange?.maxVariantPrice?.currencyCode ||
            product.variants?.[0]?.price?.currencyCode ||
            "EUR") as string;
          return (
            <SafeLink
              key={product.id}
              href={`/product/${product.handle}`}
              className="block group relative"
              prefetch={false}
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
                {/* Bestseller Badge */}
                <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Meistverkauft
                </div>

                {/* Favorite Button */}
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton
                    product={{
                      id: product.id,
                      title: product.title,
                      price: `€${String(amount).replace(".", ",")}`,
                      sizes: product.dosage ? [product.dosage] : [],
                      image: product.featuredImage?.url || "",
                      alt: product.title,
                      handle: product.handle,
                    }}
                    size="md"
                  />
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                  {product.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImageNotAvailable className="group" size={180} />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col p-4 bg-white border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
                    {product.title}
                  </h3>

                  {product.dosage && (
                    <p className="text-xs text-gray-500 mb-3">
                      {product.dosage}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <Price
                      amount={amount}
                      currencyCode={currency}
                      className="text-lg font-bold text-blue-600"
                    />
                  </div>
                </div>

                {/* Add to Cart Button - bottom right corner */}
                <div
                  className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddToCart product={product} compact />
                </div>
              </div>
            </SafeLink>
          );
        })}
      </div>
    </div>
  );
}
