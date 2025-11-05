"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductWithVariants } from "lib/types";

interface HeroSliderProps {
  products: ProductWithVariants[];
}

export function HeroSlider({ products }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Memoize slides to prevent recreation on every render
  const slides = useMemo(() => {
    return products.slice(0, 4).map((product) => {
      const fullDescription =
        product.description ||
        `Premium ${product.title} - Hochwertige medizinische Qualität für professionelle Anwendungen.`;
      // Truncate description to 150 characters
      const shortDescription =
        fullDescription.length > 150
          ? fullDescription.substring(0, 150) + "..."
          : fullDescription;

      return {
        title: product.title,
        description: shortDescription,
        image:
          product.featuredImage?.url ||
          product.imageUrl ||
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
        price: product.priceRange?.maxVariantPrice?.amount,
        currency: product.priceRange?.maxVariantPrice?.currencyCode || "EUR",
      };
    });
  }, [products]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!mounted || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [mounted, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Prevent hydration issues by not rendering controls until mounted
  if (!mounted || slides.length === 0) {
    return (
      <div className="relative w-full bg-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[350px]">
              <div className="p-6 lg:p-8">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
              <div className="relative h-[300px] lg:h-[350px] bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[350px] transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              {/* Text Content */}
              <div className="p-6 lg:p-8 order-2 lg:order-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {slide.title}
                </h1>
                <p className="text-gray-600 text-base leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[300px] lg:h-[350px] order-1 lg:order-2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain p-4 bg-gray-50"
                />
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 lg:p-3 shadow-md transition-all duration-200 z-20"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 lg:p-3 shadow-md transition-all duration-200 z-20"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-600 w-8"
                    : "bg-gray-400 w-2 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
