import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import Footer from "components/layout/footer";
import { getProducts } from "lib/shopify";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";
import { ReactNode } from "react";
import { ScrollAnimations } from "components/scroll-animations";
import AutoScrollCarousel from "components/auto-scroll-carousel";
import { HeroBanner } from "components/hero-banner";

// Type-safe Link wrapper for React 19 compatibility
const SafeLink = ({
  href,
  className,
  children,
  style,
  ...props
}: {
  href: string;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}) => {
  const LinkComponent = Link as any;
  return (
    <LinkComponent href={href} className={className} style={style} {...props}>
      {children}
    </LinkComponent>
  );
};

export const metadata = {
  title: "SaniMotion - Professional Medical Equipment & Healthcare Supplies",
  description:
    "Premium Medical Equipment and Healthcare Supplies - Professional Grade Medical Devices and Medicines. Trusted by healthcare professionals worldwide.",
  openGraph: {
    type: "website",
    title: "SaniMotion - Professional Medical Equipment & Healthcare Supplies",
    description:
      "Premium Medical Equipment and Healthcare Supplies - Professional Grade Medical Devices and Medicines.",
    url: "/",
  },
};

export default async function HomePage() {
  const products = await getProducts({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ScrollAnimations />

      {/* Hero Banner Section */}
      <HeroBanner
        title="SaniMotion"
        subtitle="Medical Excellence"
        description="Premium medical equipment and healthcare supplies trusted by professionals worldwide. Discover our comprehensive range of medical devices, equipment, and supplies for hospitals, clinics, and medical practices."
        imageUrl="https://img.freepik.com/premium-photo/medical-supplies-equipment-blue-background_690064-9800.jpg?semt=ais_hybrid&w=740&q=80"
        imageAlt="3D online pharmacy store with medical supplies and healthcare products"
        buttonText="Explore Medical Equipment"
        buttonLink="/search"
        className="scroll-reveal"
      />

      {/* Featured Products Section with Enhanced Animations */}
      <div className="mx-auto max-w-7xl px-4 py-16 pt-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Medical Equipment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            High-quality medical devices and equipment for professional use
          </p>
        </div>

        {/* Enhanced Product Grid with Advanced Hover Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-reveal">
          {/* First product - Large featured */}
          <div className="lg:col-span-1 lg:row-span-1 group hover-lift scroll-reveal-left">
            {products[0] && (
              <SafeLink
                href={`/product/${products[0].handle}`}
                className="block"
              >
                <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group-hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
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

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {products[0].title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                        {products[0].priceRange.maxVariantPrice.amount}{" "}
                        {products[0].priceRange.maxVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                  {/* Enhanced hover overlay effect */}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </div>
              </SafeLink>
            )}
          </div>

          {/* Second product */}
          <div className="lg:col-span-1 lg:row-span-1 group hover-lift scroll-reveal-scale">
            {products[1] && (
              <SafeLink
                href={`/product/${products[1].handle}`}
                className="block"
              >
                <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group-hover:-rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
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

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {products[1].title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                        {products[1].priceRange.maxVariantPrice.amount}{" "}
                        {products[1].priceRange.maxVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </div>
              </SafeLink>
            )}
          </div>

          {/* Third product */}
          <div className="lg:col-span-1 lg:row-span-1 group hover-lift scroll-reveal-right">
            {products[2] && (
              <SafeLink
                href={`/product/${products[2].handle}`}
                className="block"
              >
                <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group-hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
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

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {products[2].title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                        {products[2].priceRange.maxVariantPrice.amount}{" "}
                        {products[2].priceRange.maxVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </div>
              </SafeLink>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
