import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import Footer from "components/layout/footer";
import { getProducts } from "lib/shopify";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

import AutoScrollCarousel from "components/auto-scroll-carousel";

export const metadata = {
  description:
    "Premium Medical Equipment and Healthcare Supplies - Professional Grade Medical Devices and Medicines.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const products = await getProducts({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section with Enhanced Animations */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-700 animate-gradient-shift">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Enhanced Animated background elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 animate-float"></div>
        <div
          className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 animate-float-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-white/5 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Medical cross symbol animation */}
        <div className="absolute top-20 right-1/3 text-white/20 animate-rotate-slow">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Enhanced Main Headline with Gradient Text */}
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up">
              <span
                className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent animate-slide-in-left"
                style={{ animationDelay: "0.2s" }}
              >
                Professional
              </span>
              <span
                className="block bg-gradient-to-r from-blue-200 via-cyan-300 to-emerald-200 bg-clip-text text-transparent animate-slide-in-right"
                style={{ animationDelay: "0.4s" }}
              >
                Medical Equipment & Medicines
              </span>
            </h1>

            {/* Enhanced Subtitle with Better Typography */}
            <p
              className="mx-auto mt-8 max-w-3xl text-xl font-medium text-blue-100 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="text-2xl font-semibold text-white">
                Trusted by healthcare professionals worldwide.
              </span>
              <br />
              <span className="text-lg">
                Premium medical devices, equipment, and supplies for hospitals,
                clinics, and medical practices.
              </span>
            </p>

            {/* Enhanced CTA Buttons */}
            <div
              className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <Link
                href="/search"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-white to-blue-50 px-10 py-4 text-lg font-bold text-blue-600 transition-all duration-500 hover:bg-blue-50 hover:scale-110 transform hover:-translate-y-2 animate-bounce-subtle hover-glow"
              >
                <span className="relative z-10">Browse Equipment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/search"
                className="group relative overflow-hidden rounded-full border-3 border-white px-10 py-4 text-lg font-bold text-white transition-all duration-500 hover:bg-white hover:text-blue-600 hover:scale-110 transform hover:-translate-y-2 animate-bounce-subtle backdrop-blur-sm"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="relative z-10">View Catalog</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section with Enhanced Animations */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div
          className="text-center mb-20 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-6 animate-pulse-glow">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl animate-slide-in-up bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Featured Medical Equipment
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mt-6 rounded-full animate-pulse"></div>
          <p
            className="mt-6 text-xl text-gray-600 font-medium animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.5s" }}
          >
            High-quality medical devices and equipment for professional use
          </p>
        </div>

        {/* Enhanced Product Grid with Advanced Hover Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* First product - Large featured */}
          <div
            className="lg:col-span-1 lg:row-span-1 group animate-fade-in-up hover-lift"
            style={{ animationDelay: "0.7s" }}
          >
            {products[0] && (
              <Link href={`/product/${products[0].handle}`} className="block">
                <div className="relative h-full w-full bg-white  overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group-hover:rotate-1">
                  <div className="absolute  transition-opacity duration-300 group-hover:opacity-80"></div>
                  <GridTileImage
                    src={products[0].featuredImage?.url}
                    alt={products[0].title}
                    label={{
                      title: products[0].title,
                      amount: products[0].priceRange.maxVariantPrice.amount,
                      currencyCode:
                        products[0].priceRange.maxVariantPrice.currencyCode,
                    }}
                  />
                  {/* Enhanced hover overlay effect */}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </div>
              </Link>
            )}
          </div>

          {/* Second product */}

          <div
            className="lg:col-span-1 lg:row-span-1 group animate-fade-in-up hover-lift"
            style={{ animationDelay: "0.9s" }}
          >
            {products[1] && (
              <Link href={`/product/${products[1].handle}`} className="block">
                <div className="relative h-full w-full bg-white  overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group-hover:-rotate-1">
                  <div className="absolute  duration-300 group-hover:opacity-80"></div>
                  <GridTileImage
                    src={products[1].featuredImage?.url}
                    alt={products[1].title}
                    label={{
                      title: products[1].title,
                      amount: products[1].priceRange.maxVariantPrice.amount,
                      currencyCode:
                        products[1].priceRange.maxVariantPrice.currencyCode,
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </div>
              </Link>
            )}
          </div>

          {/* Third product */}

          <div
            className="lg:col-span-1 lg:row-span-1 group animate-fade-in-up hover-lift"
            style={{ animationDelay: "1.1s" }}
          >
            {products[2] && (
              <Link href={`/product/${products[2].handle}`} className="block">
                <div className="relative h-full w-full bg-white  overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group-hover:rotate-1">
                  <div className="absolute transition-opacity duration-300 group-hover:opacity-80"></div>
                  <GridTileImage
                    src={products[2].featuredImage?.url}
                    alt={products[2].title}
                    label={{
                      title: products[2].title,
                      amount: products[2].priceRange.maxVariantPrice.amount,
                      currencyCode:
                        products[2].priceRange.maxVariantPrice.currencyCode,
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Auto-scrolling carousel section with enhanced animations */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <div
            className="text-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6 animate-pulse-glow">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl animate-slide-in-up bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Complete Medical Catalog
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mt-6 rounded-full animate-pulse"></div>
            <p
              className="mt-6 text-xl text-gray-600 font-medium animate-fade-in-up leading-relaxed"
              style={{ animationDelay: "0.5s" }}
            >
              Explore our comprehensive range of medical equipment and supplies
            </p>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            <AutoScrollCarousel products={products.slice(3)} />
          </div>
        </div>
      </div>

      {/* Call to Action Section with Enhanced Animations */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 py-20 relative overflow-hidden animate-gradient-shift">
        {/* Enhanced Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
          <div
            className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-12 h-12 bg-white/5 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating medical icons */}
          <div className="absolute top-1/4 right-1/4 text-white/20 animate-float">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced CTA Header */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-pulse-glow">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <h2
            className="text-4xl font-black tracking-tight text-white sm:text-5xl animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Equip Your Medical Practice Today
          </h2>
          <p
            className="mx-auto mt-6 max-w-3xl text-xl text-blue-100 font-medium animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="text-2xl font-semibold text-white">
              Trusted by healthcare professionals worldwide.
            </span>
            <br />
            <span className="text-lg">
              Quality equipment for better patient care and outcomes.
            </span>
          </p>
          <div
            className="mt-10 animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              href="/search"
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-white to-blue-50 px-12 py-5 text-xl font-black text-blue-600 transition-all duration-500 hover:bg-blue-50 hover:scale-110 transform hover:-translate-y-2 animate-bounce-subtle hover-glow medical-breathe"
            >
              <span className="relative z-10">Browse Medical Equipment</span>
              <svg
                className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
