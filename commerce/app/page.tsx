//import Grid from "components/grid";
//import ProductGridItems from "components/layout/product-grid-items";
import Footer from "components/layout/footer";
import { getProducts } from "lib/products";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";
import { ReactNode } from "react";
import { ScrollAnimations } from "components/scroll-animations";
//import AutoScrollCarousel from "components/auto-scroll-carousel";
//import { BestsellersCarousel } from "../components/bestsellers-carousel";
import type { Metadata } from "next";
import { BestsellersCarousel } from "../components/bestsellers-carousel";
import { CategoriesCarousel } from "../components/categories-carousel";
import { getCategories } from "../lib/categories";
import { HeroSlider } from "../components/hero-slider";

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
    <LinkComponent
      href={href}
      className={className}
      style={style}
      prefetch={false}
      {...props}
    >
      {children}
    </LinkComponent>
  );
};

export const metadata: Metadata = {
  title:
    "Sanimotion - Professionelle medizinische Ausrüstung & Gesundheitsprodukte",
  description:
    "Premium medizinische Ausrüstung und Gesundheitsprodukte - Professionelle medizinische Geräte und Medizin. Vertraut von Gesundheitsfachkräften weltweit.",
  openGraph: {
    type: "website",
    title:
      "Sanimotion - Professionelle medizinische Ausrüstung & Gesundheitsprodukte",
    description:
      "Premium medizinische Ausrüstung und Gesundheitsprodukte - Professionelle medizinische Geräte und Medizin.",
    url: "/",
  },
};

// Cache this page for 1 hour, revalidate in background
export const revalidate = 3600;

export default async function HomePage() {
  const products = await getProducts();

  // Fetch categories from database and filter out unwanted ones
  const allCategories = await getCategories();
  const categories = allCategories.filter(
    (cat) =>
      cat.title !== "Ersatzteile" && cat.title.toLowerCase() !== "miscellaneous"
  );

  // Get products with images and descriptions for bestsellers
  const bestsellersData = products
    .filter((product) => {
      const hasImage = product.featuredImage?.url || product.imageUrl;
      const hasDescription =
        product.description && product.description.trim().length > 0;
      return hasImage && hasDescription;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ScrollAnimations />

      {/* Hero Banner Section - Image Slider */}
      <HeroSlider products={products} />

      {/* Content wrapper */}
      <div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Bestsellers Section */}
          <div className="mb-16">
            <div className="text-left mb-12 scroll-reveal">
              <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                Meistverkaufte Produkte
              </h2>
            </div>

            <BestsellersCarousel products={bestsellersData} />
          </div>
        </div>

        {/* Shop by Category Section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
              Nach Kategorie einkaufen
            </h2>
          </div>

          {categories.length > 0 ? (
            <CategoriesCarousel categories={categories} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto stagger-reveal">
              {/* Weight Loss */}
              <div className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-100">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/healthy-lifestyle-weight-loss-concept_690064-9807.jpg?semt=ais_hybrid&w=400&q=80"
                    alt="Weight loss products"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">Gewichtsreduktion</p>
                </div>
              </div>

              {/* Allergy */}
              <div className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-200">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/allergy-medication-antihistamine-concept_690064-9808.jpg?semt=ais_hybrid&w=400&q=80"
                    alt="Allergy medications"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">Allergie</p>
                </div>
              </div>

              {/* Medical Devices */}
              <div className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-300">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/medical-devices-equipment-healthcare_690064-9809.jpg?semt=ais_hybrid&w=400&q=80"
                    alt="Medical devices"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">
                    Medizinische Geräte
                  </p>
                </div>
              </div>

              {/* Vitamins */}
              <div className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-400">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/vitamins-supplements-health-wellness_690064-9810.jpg?semt=ais_hybrid&w=400&q=80"
                    alt="Vitamins and supplements"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">Vitamine</p>
                </div>
              </div>

              {/* Women's Health */}
              <div className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-500">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/womens-health-wellness-medical-care_690064-9811.jpg?semt=ais_hybrid&w=400&q=80"
                    alt="Women's health products"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">Frauengesundheit</p>
                </div>
              </div>

              {/* Men's Health */}
              <div className="bg-white rounded-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-600">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/mens-health-wellness-medical-care_690064-9812.jpg?semt=ais_hybrid&w=400&q=80"
                    alt="Men's health products"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">Männergesundheit</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
