"use client";

import { useState } from "react";
import Link from "next/link";

interface BestsellersCarouselProps {
  products: Array<{
    id: string;
    title: string;
    price: string;
    sizes: string[];
    image: string;
    alt: string;
  }>;
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

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-lg z-10"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-lg z-10"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {visibleProducts.map((product, index) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer relative h-96">
            <div className="absolute top-3 left-3 z-10">
              <span className="text-gray-600 text-xs font-semibold px-2 py-1">
                Bestseller
              </span>
            </div>
            <div className="absolute top-3 right-3 z-10">
              <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="h-56 overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col h-40 relative z-20">
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.title}</h3>
              </div>
              <div className="mt-auto relative z-30">
                <div className="border-t border-gray-200 mb-3"></div>
                <div className="flex items-center justify-between">
                  <span className="text-1xl font-semibold-light text-gray-900">{product.price}</span>
                <div className="flex items-center space-x-2">
                  {product.sizes.map((size, sizeIndex) => (
                    <span 
                      key={sizeIndex}
                      className={`text-xs ${
                        sizeIndex === 1 
                          ? 'text-gray-900 font-bold' 
                          : 'text-gray-600'
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
