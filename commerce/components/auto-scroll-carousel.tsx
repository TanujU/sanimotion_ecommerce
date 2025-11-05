"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

interface Product {
  handle: string;
  title: string;
  featuredImage?: {
    url: string;
  };
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface AutoScrollCarouselProps {
  products: Product[];
}

export default function AutoScrollCarousel({
  products,
}: AutoScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset scroll position when we've scrolled the width of one set of products
      const containerWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= containerWidth) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="mt-4">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-hidden pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* First set of products */}
        {products.map((product) => (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            className="block"
            prefetch={false}
          >
            <div className="relative aspect-square w-48 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
              <GridTileImage
                src={product.featuredImage?.url}
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
              />
            </div>
          </Link>
        ))}

        {/* Duplicate set for seamless loop */}
        {products.map((product, index) => (
          <Link
            key={`duplicate-${product.handle}-${index}`}
            href={`/product/${product.handle}`}
            className="block"
            prefetch={false}
          >
            <div className="relative aspect-square w-48 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
              <GridTileImage
                src={product.featuredImage?.url}
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
