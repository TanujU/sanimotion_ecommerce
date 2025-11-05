"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import type { CategoryWithPath } from "../lib/categories";

// Type-safe wrappers for React 19 compatibility
const SafeLink = Link as any;
const SafeChevronLeftIcon = ChevronLeftIcon as any;
const SafeChevronRightIcon = ChevronRightIcon as any;

// Category image mapping - Orthopedic body part specific images
const categoryImages: { [key: string]: string } = {
  // Body parts with appropriate orthopedic/medical support images
  Hüfte:
    "https://tse4.mm.bing.net/th/id/OIP.sYRThy5scHKXffuvFXLq7AHaHa?pid=Api&P=0&h=180", // Hip anatomy
  Knie: "https://tse1.mm.bing.net/th/id/OIP.JP356DBDANBk806hxROa6QHaFj?pid=Api&P=0&h=180", // Knee anatomy
  Daumen:
    "https://tse1.mm.bing.net/th/id/OIP.f3nKBiDb8zI6Fkm-6y8PiQHaHa?pid=Api&P=0&h=180", // Thumb anatomy
  Ellbogen:
    "https://tse1.mm.bing.net/th/id/OIP.KXo1_Gs2W975sDnkrZsBGgHaEK?pid=Api&P=0&h=180", // Elbow anatomy
  Brustkorb:
    "https://tse3.mm.bing.net/th/id/OIP.XQu-gdKN2AXRWBotu_2KOQHaFj?pid=Api&P=0&h=180", // Chest anatomy
  Rücken:
    "https://tse1.mm.bing.net/th/id/OIP.Jarg1nyCjTLCdyi8dyGvlgHaEK?pid=Api&P=0&h=180", // Back anatomy
  Cervical:
    "https://tse3.mm.bing.net/th/id/OIP.G4D2GXfBGkY7j4QKxrPqnAHaDa?pid=Api&P=0&h=180", // Cervical/neck anatomy
  Handgelenk:
    "https://tse2.mm.bing.net/th/id/OIP.oQVkIS6Iyq5de5UL8UVEBgHaHA?pid=Api&P=0&h=180", // Wrist anatomy
  Fuss: "https://tse3.mm.bing.net/th/id/OIP.Khqkm8hW4US7SeSHplShSAHaHa?pid=Api&P=0&h=180", // Foot anatomy
  Schulter:
    "https://tse2.mm.bing.net/th/id/OIP.vP5BsoWtZhZ79lzZihNxOwHaHa?pid=Api&P=0&h=180", // Shoulder anatomy
  Sprunggelenk:
    "https://tse1.mm.bing.net/th/id/OIP.L4XR4UC_MCWSFp-rtYhPvwAAAA?pid=Api&P=0&h=180", // Ankle anatomy

  // Default orthopedic equipment image
  default:
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
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
    return (
      categoryImages[categoryName] ||
      categoryImages.default ||
      "https://cdn.pixabay.com/photo/2016/11/08/05/29/surgery-1807543_960_720.jpg"
    );
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
          <SafeChevronLeftIcon className="w-6 h-6 text-gray-800" />
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
            <SafeLink
              key={category.id}
              href={category.path}
              className="flex-shrink-0 bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              style={{
                width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 24) / itemsPerView}px)`,
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
            </SafeLink>
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
          <SafeChevronRightIcon className="w-6 h-6 text-gray-800" />
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
