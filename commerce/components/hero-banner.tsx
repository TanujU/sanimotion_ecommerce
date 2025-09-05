"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "./cart/cart-context";
import CartModal from "./cart/modal";

// Type-safe components for React 19 compatibility
const SafeImage = ({
  src,
  alt,
  fill,
  className,
  priority,
  sizes,
  ...props
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  [key: string]: any;
}) => {
  const ImageComponent = Image as any;
  return (
    <ImageComponent
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      {...props}
    />
  );
};

const SafeLink = ({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const LinkComponent = Link as any;
  return (
    <LinkComponent href={href} className={className} {...props}>
      {children}
    </LinkComponent>
  );
};

// Cart Link Component
function CartLink() {
  const { cart } = useCart();
  const cartQuantity = cart?.totalQuantity || 0;

  return (
    <>
      <button
        onClick={() => {
          // Trigger the existing cart modal
          const cartButton = document.querySelector("[data-cart-trigger]");
          if (cartButton) {
            (cartButton as HTMLElement).click();
          }
        }}
        className="text-black hover:text-gray-600 transition-colors duration-300 text-sm font-medium tracking-wider uppercase cursor-pointer"
      ></button>

      {/* Use existing CartModal component */}
      <CartModal />
    </>
  );
}

interface HeroBannerProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export function HeroBanner({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  buttonText,
  buttonLink,
  className = "",
}: HeroBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initial loading animation sequence
  useEffect(() => {
    // First: Load the navigation (but keep it hidden)
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Second: After navigation is loaded, start the slide animation
    const slideTimer = setTimeout(() => {
      setIsInitialAnimation(false);
    }, 800); // Delay to let navigation load first

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(slideTimer);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;

      // Check if we're in the hero section (with some buffer)
      const isInHeroSection = currentScrollY < heroHeight - 100;

      console.log("Scroll Debug:", {
        currentScrollY,
        heroHeight,
        isInHeroSection,
        lastScrollY,
        isMinimized,
        isMobile,
      });

      // Only apply scroll animation on desktop
      if (!isMobile) {
        if (isInHeroSection) {
          // In hero section - always show full sidebar
          setIsMinimized(false);
        } else {
          // Outside hero section - minimize on scroll down, expand on scroll up
          if (
            currentScrollY > lastScrollY &&
            currentScrollY > heroHeight - 100
          ) {
            // Scrolling down - minimize
            setIsMinimized(true);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up - expand
            setIsMinimized(false);
          }
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMobile]);

  return (
    <div
      ref={heroRef}
      className={`relative min-h-[100vh] flex items-center overflow-hidden mt-0 pt-0 ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-banner-overlay"></div>
      </div>

      {/* Mobile Menu Button - Always visible on mobile */}
      {isMobile && (
        <button
          className={`fixed z-30 lg:hidden bg-white/95 backdrop-blur-md p-4 rounded-full shadow-2xl border border-white/30 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 active:scale-95 ${
            isMobileMenuOpen ? "top-16 left-64 rotate-180" : "top-20 left-4 rotate-0"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="flex flex-col space-y-1.5">
            <div
              className={`w-6 h-0.5 bg-gray-800 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : "rotate-0 translate-y-0"
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "rotate-0 translate-y-0"
              }`}
            ></div>
          </div>
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-10 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen 
              ? "bg-black/40 backdrop-blur-sm opacity-100 pointer-events-auto" 
              : "bg-transparent backdrop-blur-none opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Left Sidebar Navigation */}
      <div
        className={`absolute left-0 top-10 h-full flex flex-col transform-gpu will-change-[width,transform,opacity] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobile
            ? `w-80 ${isMobileMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"} bg-white/95 backdrop-blur-xl border-r border-white/40 shadow-2xl z-20`
            : `hidden lg:flex ${
                !isLoaded 
                  ? "w-0 opacity-0 -translate-x-full" 
                  : isInitialAnimation 
                    ? "w-0 opacity-0 -translate-x-full" 
                    : isMinimized 
                      ? "w-20 opacity-100 translate-x-0" 
                      : "w-80 opacity-100 translate-x-0"
              } bg-white/50 backdrop-blur-xl border-r border-white/30 shadow-xl z-20`
        }`}
      >
        {/* Brand Logo */}
        <div
          className={`px-8 py-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
            isMobile
              ? "opacity-100 border-b border-gray-100/50 transform translate-y-0"
              : !isLoaded || isInitialAnimation
                ? "opacity-0 transform -translate-y-4"
                : isMinimized
                  ? "opacity-0 transform -translate-y-4"
                  : "opacity-100 transform translate-y-0"
          }`}
        >
          <h1
            className={`font-bold text-black tracking-wider transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 ${
              isMobile ? "text-2xl" : "text-3xl"
            }`}
          >
            FREYARU
          </h1>
        </div>

        {/* Desktop: no hamburger icon */}

        {/* Navigation Links */}
        <nav
          className={`px-6 flex-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
            isMobile 
              ? "opacity-100 transform translate-y-0" 
              : !isLoaded || isInitialAnimation
                ? "opacity-0 transform -translate-y-4"
                : isMinimized 
                  ? "opacity-0 transform -translate-y-4" 
                  : "opacity-100 transform translate-y-0"
          }`}
        >
          <ul className={`${isMobile ? "space-y-1" : "space-y-6"}`}>
            <li className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2" style={{ animationDelay: '0.1s' }}>
              <SafeLink
                href="/search"
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
                  isMobile
                    ? "flex items-center px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium hover:shadow-lg hover:scale-105"
                    : "text-black hover:text-blue-600 text-sm font-medium tracking-wider uppercase hover:scale-105"
                }`}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                {isMobile && (
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
                SEARCH
              </SafeLink>
            </li>
            {!isMobile && (
              <li className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2" style={{ animationDelay: '0.2s' }}>
                <SafeLink
                  href="/search"
                  className="text-black hover:text-blue-600 text-sm font-medium tracking-wider uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                >
                  CATEGORIES
                </SafeLink>
              </li>
            )}
            {isMobile && (
              <li className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2" style={{ animationDelay: '0.2s' }}>
                <SafeLink
                  href="/search"
                  className="flex items-center px-6 py-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-lg hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 12h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
                    />
                  </svg>
                  CATEGORIES
                </SafeLink>
              </li>
            )}
            <li className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2" style={{ animationDelay: '0.3s' }}>
              <SafeLink
                href="/login"
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
                  isMobile
                    ? "flex items-center px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium hover:shadow-lg hover:scale-105"
                    : "text-black hover:text-blue-600 text-sm font-medium tracking-wider uppercase hover:scale-105"
                }`}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                {isMobile && (
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
                LOGIN/SIGNUP
              </SafeLink>
            </li>
            <li className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2" style={{ animationDelay: '0.4s' }}>
              {isMobile ? (
                <div className="flex items-center px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl text-base font-medium cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-lg hover:scale-105">
                  <CartLink />
                </div>
              ) : (
                <div className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105">
                  <CartLink />
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full transform-gpu will-change-[margin] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobile 
            ? "ml-0" 
            : isInitialAnimation 
              ? "lg:ml-0" 
              : isMinimized 
                ? "lg:ml-20" 
                : "lg:ml-80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight hero-text-shadow">
                  {title}
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-200 hero-text-shadow">
                  {subtitle}
                </h2>
              </div>

              <p className="text-lg sm:text-xl text-gray-100 max-w-lg leading-relaxed hero-text-shadow">
                {description}
              </p>

              <div className="pt-4">
                <SafeLink
                  href={buttonLink}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium text-black bg-white hover:bg-gray-100 hero-button-hover shadow-lg"
                >
                  {buttonText}
                  <svg
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </SafeLink>
              </div>
            </div>

            {/* Image Content - Medical equipment showcase */}
          </div>
        </div>
      </div>
    </div>
  );
}
