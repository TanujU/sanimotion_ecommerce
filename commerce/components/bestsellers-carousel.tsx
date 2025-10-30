"use client";

import { useState } from "react";
import Link from "next/link";
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
          No products available at the moment.
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
            <div
              key={product.id}
              className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer relative h-96"
            >
              <div className="absolute top-3 left-3 z-10">
                <span className="text-gray-600 text-xs font-semibold px-2 py-1">
                  Bestseller
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton
                  product={{
                    id: product.id,
                    title: product.title,
                    price: `€${String(amount).replace(".", ",")}`,
                    sizes: product.dosage ? [product.dosage] : [],
                    image: product.featuredImage?.url || "",
                    alt: product.title,
                  }}
                />
              </div>
              <div className="h-56 overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center p-4">
                {product.featuredImage?.url ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageNotAvailable className="group" size={180} />
                )}
              </div>
              <div className="p-4 flex flex-col h-40 relative z-20">
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {product.title}
                  </h3>
                </div>
                <div className="mt-auto relative z-30">
                  <div className="border-t border-gray-200 mb-3"></div>
                  <div className="flex items-center justify-between mb-2">
                    <Price
                      amount={amount}
                      currencyCode={currency}
                      className="text-1xl font-semibold-light text-gray-900"
                    />
                    {product.dosage && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">
                          {product.dosage}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Add to Cart Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <AddToCart product={product} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
