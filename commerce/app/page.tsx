//import Grid from "components/grid";
//import ProductGridItems from "components/layout/product-grid-items";
import Footer from "components/layout/footer";
import { getProducts } from "lib/shopify";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";
import { ReactNode } from "react";
import { ScrollAnimations } from "components/scroll-animations";
//import AutoScrollCarousel from "components/auto-scroll-carousel";
import { HeroBanner } from "components/hero-banner";
//import { BestsellersCarousel } from "../components/bestsellers-carousel";
import type { Metadata } from "next";
import { BestsellersCarousel } from "../components/bestsellers-carousel";
import { WelcomePopup } from "../components/welcome-popup";

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

export const metadata: Metadata = {
  title: "Sanimotion - Professional Medical Equipment & Healthcare Supplies",
  description:
    "Premium Medical Equipment and Healthcare Supplies - Professional Grade Medical Devices and Medicines. Trusted by healthcare professionals worldwide.",
  openGraph: {
    type: "website",
    title: "Sanimotion - Professional Medical Equipment & Healthcare Supplies",
    description:
      "Premium Medical Equipment and Healthcare Supplies - Professional Grade Medical Devices and Medicines.",
    url: "/",
  },
};

export default async function HomePage() {
  const products = await getProducts({});

  // Bestsellers data with 5 products
  const bestsellersData = [
    {
      id: "1",
      title: "Aqualyx",
      price: "$89.99",
      sizes: ["5ml", "10ml"],
      image: "/images/aqualyx.jpg",
      alt: "Aqualyx - Fat Dissolving Treatment"
    },
    {
      id: "2", 
      title: "Juvederm",
      price: "$299.99",
      sizes: ["0.5ml", "1ml"],
      image: "/images/juvederm.jpg",
      alt: "Juvederm - Dermal Filler"
    },
    {
      id: "3",
      title: "Profhilo", 
      price: "$199.99",
      sizes: ["2ml", "4ml"],
      image: "/images/profhilo.jpg",
      alt: "Profhilo - Skin Booster"
    },
    {
      id: "4",
      title: "Restylane",
      price: "$249.99", 
      sizes: ["0.5ml", "1ml"],
      image: "/images/restylane.jpg",
      alt: "Restylane - Hyaluronic Acid Filler"
    },
    {
      id: "5",
      title: "Belotero",
      price: "$179.99",
      sizes: ["0.5ml", "1ml"], 
      image: "/images/belotero.jpg",
      alt: "Belotero - Dermal Filler"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ScrollAnimations />

      {/* Hero Banner Section */}
      <HeroBanner
        title="Sanimotion"
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
          <h2 className="text-3xl font-weight-light tracking-tight text-gray-900 sm:text-4xl">
            What are you looking for today?
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {/* Card 1 - Order Prescription */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src="https://img.freepik.com/premium-photo/medical-prescription-delivery-box-with-medicine_690064-9803.jpg?semt=ais_hybrid&w=400&q=80"
                alt="Medical prescription delivery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <p className="text-gray-800 font-medium text-center">
                Order your medical prescription, with free delivery
              </p>
            </div>
          </div>

          {/* Card 2 - Check Stock */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src="https://img.freepik.com/premium-photo/medical-pills-blister-packs-medicine-stock_690064-9804.jpg?semt=ais_hybrid&w=400&q=80"
                alt="Medical pills and medicine stock"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <p className="text-gray-800 font-medium text-center">
                Check your medicine is in stock
              </p>
            </div>
          </div>

          {/* Card 3 - Online Doctor */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src="https://img.freepik.com/premium-photo/medical-professional-with-stethoscope-white-coat_690064-9805.jpg?semt=ais_hybrid&w=400&q=80"
                alt="Medical professional consultation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <p className="text-gray-800 font-medium text-center">
                Explore Online Doctor support
              </p>
            </div>
          </div>

          {/* Card 4 - Health Essentials */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src="https://img.freepik.com/premium-photo/health-wellness-products-medical-supplies_690064-9806.jpg?semt=ais_hybrid&w=400&q=80"
                alt="Health and wellness products"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <p className="text-gray-800 font-medium text-center">
                Shop health and wellness essentials
              </p>
            </div>
          </div>
        </div>

        {/* Bestsellers Section */}
        <div className="mb-16">
          <div className="text-left mb-12 scroll-reveal">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
              Bestsellers
            </h2>
          </div>
          
          <BestsellersCarousel products={bestsellersData} />
              </div>

        {/* Shop by Category Section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
              </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto stagger-reveal">
            {/* Weight Loss */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-100">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src="https://img.freepik.com/premium-photo/healthy-lifestyle-weight-loss-concept_690064-9807.jpg?semt=ais_hybrid&w=400&q=80"
                  alt="Weight loss products"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">Weight Loss</p>
              </div>
            </div>

            {/* Allergy */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-200">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src="https://img.freepik.com/premium-photo/allergy-medication-antihistamine-concept_690064-9808.jpg?semt=ais_hybrid&w=400&q=80"
                  alt="Allergy medications"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">Allergy</p>
              </div>
            </div>

            {/* Medical Devices */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-300">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src="https://img.freepik.com/premium-photo/medical-devices-equipment-healthcare_690064-9809.jpg?semt=ais_hybrid&w=400&q=80"
                  alt="Medical devices"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">Medical Devices</p>
              </div>
            </div>

            {/* Vitamins */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-400">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src="https://img.freepik.com/premium-photo/vitamins-supplements-health-wellness_690064-9810.jpg?semt=ais_hybrid&w=400&q=80"
                  alt="Vitamins and supplements"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">Vitamins</p>
              </div>
            </div>

            {/* Women's Health */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-500">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src="https://img.freepik.com/premium-photo/womens-health-wellness-medical-care_690064-9811.jpg?semt=ais_hybrid&w=400&q=80"
                  alt="Women's health products"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">Women's Health</p>
              </div>
            </div>

            {/* Men's Health */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer scroll-reveal animate-delay-600">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src="https://img.freepik.com/premium-photo/mens-health-wellness-medical-care_690064-9812.jpg?semt=ais_hybrid&w=400&q=80"
                  alt="Men's health products"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-800 font-medium">Men's Health</p>
              </div>
            </div>
          </div>
        </div>

        {/* Find Your Formulation Section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left Column - Text Content (2/3 width) */}
            <div className="lg:col-span-3 scroll-reveal">
              <div className="relative">
                <div className="absolute -top-20 left-0 w-full h-px bg-gray-400"></div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
                  Find Your Products
                </h2>
              </div>
              <p className="text-lg text-gray-500 leading-relaxed">
                Filter our medical products based on your concerns, you'd like to address most.
              </p>
            </div>

            {/* Right Column - Form (1/3 width) */}
            <div className="lg:col-span-2 scroll-reveal">
              <div className="bg-gray-100/50 p-20 rounded-lg border border-gray-200/50">
                <form className="space-y-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-4">
                      I am looking for
                    </label>
                    
                    {/* Product Type Dropdown */}
                    <div className="relative mb-2">
                      <select className="w-full bg-transparent border-0 border-b border-gray-400 py-3 pr-8 text-gray-600 focus:outline-none focus:border-gray-600 focus:ring-0 appearance-none cursor-pointer text-base" defaultValue="">
                        <option value="" disabled>product type</option>
                        <option value="dermal-filler">Dermal Filler</option>
                        <option value="skin-booster">Skin Booster</option>
                        <option value="fat-dissolving">Fat Dissolving</option>
                        <option value="wrinkle-treatment">Wrinkle Treatment</option>
                        <option value="lip-enhancement">Lip Enhancement</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-2">to target</div>
                    
                    {/* Concern Dropdown */}
                    <div className="relative">
                      <select className="w-full bg-transparent border-0 border-b border-gray-400 py-3 pr-8 text-gray-600 focus:outline-none focus:border-gray-600 focus:ring-0 appearance-none cursor-pointer text-base" defaultValue="">
                        <option value="" disabled>concern</option>
                        <option value="fine-lines">Fine Lines</option>
                        <option value="volume-loss">Volume Loss</option>
                        <option value="skin-texture">Skin Texture</option>
                        <option value="hydration">Hydration</option>
                        <option value="fat-reduction">Fat Reduction</option>
                        <option value="lip-volume">Lip Volume</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-transparent border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-full hover:border-gray-400 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-base font-medium"
                  >
                    Get My Products
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
      
      {/* Welcome Popup */}
      <WelcomePopup />
    </div>
  );
}
