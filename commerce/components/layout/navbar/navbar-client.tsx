"use client";

import LogoSquare from "components/logo-square";
import { Menu } from "lib/types";
import Link from "next/link";
import { Suspense, useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import OpenCart from "components/cart/open-cart";
import { EditItemQuantityButton } from "components/cart/edit-item-quantity-button";
import { DeleteItemButton } from "components/cart/delete-item-button";
import Price from "components/price";
import { useCart } from "components/cart/cart-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAuth } from "lib/auth-context";
import { useFavorites } from "lib/favorites-context";

// Type-safe icon components for React 19 compatibility
const SafeChevronDownIcon = (props: any) => {
  const IconComponent = ChevronDownIcon as any;
  return <IconComponent {...props} />;
};

const SafeBars3Icon = (props: any) => {
  const IconComponent = Bars3Icon as any;
  return <IconComponent {...props} />;
};

const SafeXMarkIcon = (props: any) => {
  const IconComponent = XMarkIcon as any;
  return <IconComponent {...props} />;
};

const SafeShoppingCartIcon = (props: any) => {
  const IconComponent = ShoppingCartIcon as any;
  return <IconComponent {...props} />;
};

const SafeHeartIcon = (props: any) => {
  const IconComponent = HeartIcon as any;
  return <IconComponent {...props} />;
};

const SafeUserIcon = (props: any) => {
  const IconComponent = UserIcon as any;
  return <IconComponent {...props} />;
};

// Custom Cart Modal Component
function CustomCartModal({
  isOpen,
  onClose,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { cart } = useCart();

  const modal = (
    <div className="fixed inset-0 z-[2147483647]">
      <div
        className="fixed inset-0 bg-black/30 z-[2147483600]"
        onClick={onClose}
      />
      <div className="fixed bottom-0 right-0 top-0 z-[2147483647] flex h-full w-full flex-col border border-neutral-200 bg-white p-6 text-black md:w-[390px]">
        <div className="flex items-center justify-between mt-5">
          <p className="text-lg font-semibold">Mein Warenkorb</p>
          <button aria-label="Warenkorb schließen" onClick={onClose}>
            <SafeXMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <SafeShoppingCartIcon className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">
              Ihr Warenkorb ist leer.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {cart.items?.map((item: any, i: number) => (
                <li
                  key={i}
                  className="flex w-full flex-col border-b border-neutral-300 py-4"
                >
                  <div className="flex w-full flex-col space-y-2">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-black">
                        {item.productName}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <EditItemQuantityButton
                          item={item}
                          type="minus"
                          optimisticUpdate={() => {}}
                        />
                        <span className="text-sm text-neutral-700">
                          {item.quantity}
                        </span>
                        <EditItemQuantityButton
                          item={item}
                          type="plus"
                          optimisticUpdate={() => {}}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Price
                          amount={String(item.totalPrice.toFixed(2))}
                          currencyCode="EUR"
                          className="text-sm font-medium text-black"
                        />
                        <DeleteItemButton
                          item={item}
                          optimisticUpdate={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-200 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <Price
                  amount={String((cart.totalPrice || 0).toFixed(2))}
                  currencyCode="EUR"
                />
              </div>
              <div className="mt-4">
                <button
                  className="w-full inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white text-sm hover:opacity-90"
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                >
                  Zur Kasse
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render inline (fixed overlay), no portal to avoid DOM container issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null as any;
  return isOpen ? (modal as any) : (null as any);
}

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

const SafeSuspense = ({
  children,
  fallback,
  ...props
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  [key: string]: any;
}) => {
  const SuspenseComponent = Suspense as any;
  return (
    <SuspenseComponent fallback={fallback} {...props}>
      {children}
    </SuspenseComponent>
  );
};
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import { MarqueeAnnouncement } from "components/marquee-announcement";
import { useRouter } from "next/navigation";

interface NavbarClientProps {
  menu: Menu[];
  siteName?: string;
}

export function NavbarClient({ menu, siteName }: NavbarClientProps) {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Shop dropdown items
  const shopItems = [
    { name: "All Products", href: "/products" },
    { name: "Injectable Fillers", href: "/search/injectable" },
    { name: "Skin Care", href: "/search/skincare" },
    { name: "Medical Devices", href: "/search/devices" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <MarqueeAnnouncement text="Premium Medical Equipment & Healthcare Supplies - Trusted by Professionals Worldwide" />

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 relative z-40 navbar-below-marquee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <SafeLink href="/" className="flex items-center">
                <LogoSquare />
              </SafeLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Home */}
                <SafeLink
                  href="/"
                  className="navbar-link text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </SafeLink>

                {/* Shop Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                    className="navbar-link text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center"
                  >
                    Shop
                    <SafeChevronDownIcon
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${isShopDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isShopDropdownOpen && (
                    <div className="navbar-dropdown absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {shopItems.map((item) => (
                        <SafeLink
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                          onClick={() => setIsShopDropdownOpen(false)}
                        >
                          {item.name}
                        </SafeLink>
                      ))}
                    </div>
                  )}
                </div>

                {/* About Us */}
                <SafeLink
                  href="/about"
                  className="navbar-link text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  About Us
                </SafeLink>
              </div>
            </div>

            {/* Right side - Search, Favorites, Profile, and Cart */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Search */}
              <div className="navbar-search-container w-64 mr-3">
                <SafeSuspense fallback={<SearchSkeleton />}>
                  <Search />
                </SafeSuspense>
              </div>

              {/* Favorites (require auth on click) */}
              <button
                onClick={() => {
                  if (!loading && !user) {
                    router.push(
                      `/login?redirectTo=${encodeURIComponent("/favorites")}`
                    );
                  } else {
                    router.push("/favorites");
                  }
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50"
                aria-label="Favorites"
              >
                <SafeHeartIcon className="h-4 w-4 text-red-500" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Profile */}
              <SafeLink
                href={user ? "/profile" : "/signup"}
                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50"
                aria-label={user ? "Profile" : "Sign Up"}
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                ) : (
                  <SafeUserIcon className="h-4 w-4 text-blue-500" />
                )}
              </SafeLink>

              {/* Cart */}
              <button aria-label="Warenkorb öffnen" onClick={openCart}>
                <OpenCart quantity={cart?.totalItems} />
              </button>
            </div>

            {/* Mobile menu button, favorites, profile, and cart */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Favorites Icon (require auth on click) */}
              <button
                onClick={() => {
                  if (!loading && !user) {
                    router.push(
                      `/login?redirectTo=${encodeURIComponent("/favorites")}`
                    );
                  } else {
                    router.push("/favorites");
                  }
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50"
                aria-label="Favorites"
              >
                <SafeHeartIcon className="h-4 w-4 text-red-500" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Mobile Profile Icon */}
              <SafeLink
                href={user ? "/profile" : "/signup"}
                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-black transition-colors hover:bg-neutral-50"
                aria-label={user ? "Profile" : "Sign Up"}
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                ) : (
                  <SafeUserIcon className="h-4 w-4" />
                )}
              </SafeLink>

              {/* Mobile Cart Icon */}
              <button aria-label="Warenkorb öffnen" onClick={openCart}>
                <OpenCart quantity={cart?.totalItems} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 hover:text-blue-600 p-2 flex-shrink-0"
              >
                {isMobileMenuOpen ? (
                  <SafeXMarkIcon className="h-6 w-6" />
                ) : (
                  <SafeBars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SafeLink
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </SafeLink>

              {/* Mobile Shop Dropdown */}
              <div className="px-3 py-2">
                <div className="text-base font-medium text-gray-900 mb-2">
                  Shop
                </div>
                <div className="pl-4 space-y-1">
                  {shopItems.map((item) => (
                    <SafeLink
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </SafeLink>
                  ))}
                </div>
              </div>

              <SafeLink
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </SafeLink>

              {/* Mobile Search */}
              <div className="px-3 py-2">
                <SafeSuspense fallback={<SearchSkeleton />}>
                  <Search />
                </SafeSuspense>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Custom Cart Modal */}
      <CustomCartModal
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={() => {
          router.push("/checkout");
        }}
      />
    </>
  );
}
