"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../lib/auth-context";
import { useCart } from "./cart/cart-context";

// Type-safe components for React 19 compatibility
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

// Search Icon Component - Exportable
export function SearchIcon() {
  return (
    <SafeLink
      href="/search"
      className="text-black hover:text-gray-600 transition-all duration-300 hover:scale-105 p-2"
      aria-label="Search"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </SafeLink>
  );
}

// Hamburger Menu Icon Component - Exportable
export function HamburgerIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { title: "Diagnostic Equipment", path: "/search/diagnostic-equipment" },
    { title: "Surgical Instruments", path: "/search/surgical-instruments" },
    { title: "Patient Care", path: "/search/patient-care" },
    { title: "Laboratory Equipment", path: "/search/laboratory-equipment" },
    { title: "Emergency & Trauma", path: "/search/emergency-trauma" },
    { title: "Rehabilitation", path: "/search/rehabilitation" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-black hover:text-gray-600 transition-all duration-300 hover:scale-105 p-2"
        aria-label="Menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 z-20">
            <div className="py-2">
              {categories.map((category) => (
                <SafeLink
                  key={category.title}
                  href={category.path}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {category.title}
                </SafeLink>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Cart Icon Component - Exportable
export function CartIcon() {
  const { cart } = useCart();
  const cartQuantity = cart?.totalQuantity || 0;

  return (
    <button
      onClick={() => {
        // Trigger the existing cart modal
        const cartButton = document.querySelector("[data-cart-trigger]");
        if (cartButton) {
          (cartButton as HTMLElement).click();
        }
      }}
      className="text-black hover:text-gray-600 transition-all duration-300 hover:scale-105 p-2"
      aria-label="Shopping cart"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM18.75 20.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        />
      </svg>
    </button>
  );
}

// Profile Icon Component - Exportable
export function ProfileIcon() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-black p-2">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (user) {
    return (
      <SafeLink
        href="/profile"
        className="text-black hover:text-gray-600 transition-all duration-300 hover:scale-105 p-2"
        aria-label="Profile"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </SafeLink>
    );
  }

  return (
    <SafeLink
      href="/login"
      className="text-black hover:text-gray-600 transition-all duration-300 hover:scale-105 p-2"
      aria-label="Login"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </SafeLink>
  );
}

// Sign In Icon Component - Exportable
export function SignInIcon() {
  return (
    <SafeLink
      href="/login"
      className="text-black hover:text-blue-600 transition-all duration-300 hover:scale-105 p-2"
      aria-label="Sign In"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    </SafeLink>
  );
}

// Logout Icon Component - Exportable
export function LogoutIcon() {
  const { user, loading, signOut } = useAuth();

  if (loading || !user) {
    return null; // Don't show logout icon if not logged in
  }

  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="text-black hover:text-red-600 transition-all duration-300 hover:scale-105 p-2"
      aria-label="Logout"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
}

// Conditional Auth Icons Component
function AuthIcons() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-11 w-11">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (user) {
    // User is logged in - show Profile and Logout icons
    return (
      <>
        <div className="transition-all duration-300 hover:scale-105">
          <ProfileIcon />
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <LogoutIcon />
        </div>
      </>
    );
  } else {
    // User is not logged in - show only Sign In icon
    return (
      <div className="transition-all duration-300 hover:scale-105">
        <SignInIcon />
      </div>
    );
  }
}

interface ScrollNavProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
}

export function ScrollNav({ heroRef }: ScrollNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [translateX, setTranslateX] = useState(-100);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroHeight = heroRef.current.offsetHeight;
      const scrollY = window.scrollY;

      // Start the transition earlier for smoother effect
      const startTransition = heroHeight * 0.3; // Start at 30% of hero height
      const endTransition = heroHeight * 0.7; // Fully visible at 70% of hero height

      // Calculate progress (0 to 1)
      const progress = Math.min(
        Math.max(
          (scrollY - startTransition) / (endTransition - startTransition),
          0
        ),
        1
      );

      const shouldBeScrolled = scrollY > heroHeight * 0.8;
      const shouldBeVisible = scrollY > startTransition;

      setIsScrolled(shouldBeScrolled);
      setIsVisible(shouldBeVisible);

      // Smooth opacity and transform transitions
      setOpacity(progress);
      setTranslateX(-100 + progress * 100); // Slide in from left
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef]);

  // Don't render on mobile devices
  const [isMobile, setIsMobile] = useState(false);

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

  // Don't render on mobile
  if (isMobile) return null;

  // Always render but with conditional visibility on desktop
  return (
    <div
      ref={navRef}
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] w-20 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        opacity: opacity,
        transform: `translateX(${translateX}%)`,
      }}
    >
      <div className="flex flex-col h-full">
        {/* Brand Logo */}
        <div className="px-4 py-4">
          <SafeLink
            href="/"
            className="font-bold text-black tracking-wider transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 text-lg"
          >
            FREYARU
          </SafeLink>
        </div>

        {/* Vertical Navigation Icons */}
        <div className="flex-1 flex flex-col items-center justify-start space-y-4 pt-4">
          <div className="transition-all duration-300 hover:scale-105">
            <SearchIcon />
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <HamburgerIcon />
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <CartIcon />
          </div>

          {/* Conditional Auth Icons */}
          <AuthIcons />
        </div>
      </div>
    </div>
  );
}
