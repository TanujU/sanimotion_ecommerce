"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import type { CategoryWithPath } from "../lib/categories";

// Category image mapping
const categoryImages: { [key: string]: string } = {
  // Use the same images as homepage fallback categories
  "Hüfte": "https://img.freepik.com/premium-photo/healthy-lifestyle-weight-loss-concept_690064-9807.jpg?semt=ais_hybrid&w=400&q=80",
  "Knie": "https://img.freepik.com/premium-photo/allergy-medication-antihistamine-concept_690064-9808.jpg?semt=ais_hybrid&w=400&q=80",
  "Daumen": "https://img.freepik.com/premium-photo/medical-devices-equipment-healthcare_690064-9809.jpg?semt=ais_hybrid&w=400&q=80",
  "Ellbogen": "https://img.freepik.com/premium-photo/vitamins-supplements-health-wellness_690064-9810.jpg?semt=ais_hybrid&w=400&q=80",
  "Brustkorb": "https://img.freepik.com/premium-photo/womens-health-wellness-medical-care_690064-9811.jpg?semt=ais_hybrid&w=400&q=80",
  "Handgelenk": "https://img.freepik.com/premium-photo/mens-health-wellness-medical-care_690064-9812.jpg?semt=ais_hybrid&w=400&q=80",
  "Fuss": "https://img.freepik.com/premium-photo/healthy-lifestyle-weight-loss-concept_690064-9807.jpg?semt=ais_hybrid&w=400&q=80",
  "Schulter": "https://img.freepik.com/premium-photo/allergy-medication-antihistamine-concept_690064-9808.jpg?semt=ais_hybrid&w=400&q=80",
  "Sprunggelenk": "https://img.freepik.com/premium-photo/medical-devices-equipment-healthcare_690064-9809.jpg?semt=ais_hybrid&w=400&q=80",
  "Ersatzteile": "https://img.freepik.com/premium-photo/vitamins-supplements-health-wellness_690064-9810.jpg?semt=ais_hybrid&w=400&q=80",
  
  // Default
  "default": "https://img.freepik.com/premium-photo/healthy-lifestyle-weight-loss-concept_690064-9807.jpg?semt=ais_hybrid&w=400&q=80"
};

interface CategoriesCarouselProps {
  categories: CategoryWithPath[];
}

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate how many items to show based on screen size
  const [itemsPerView, setItemsPerView] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setItemsPerView(3);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4);
      } else {
        setItemsPerView(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const getImageForCategory = (categoryName: string): string => {
    return categoryImages[categoryName] || categoryImages["default"];
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Previous categories"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={carouselRef}>
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.path}
              className="flex-shrink-0 bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              style={{
                width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)`,
              }}
            >
              <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                <img
                  src={getImageForCategory(category.title)}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">{category.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {currentIndex < maxIndex && (
        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Next categories"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

