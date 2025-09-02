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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Professional</span>
              <span className="block text-blue-200">Medical Equipment</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              Trusted by healthcare professionals worldwide. Premium medical
              devices, equipment, and supplies for hospitals, clinics, and
              medical practices.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/search"
                className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
              >
                Browse Equipment
              </Link>
              <Link
                href="/search"
                className="rounded-full border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10"></div>
      </div>

      {/* Featured Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Medical Equipment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            High-quality medical devices and equipment for professional use
          </p>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* First product - Large featured */}
          <div className="lg:col-span-1 lg:row-span-1 group">
            {products[0] && (
              <Link href={`/product/${products[0].handle}`} className="block">
                <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {products[0].title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl">
                        {products[0].priceRange.maxVariantPrice.amount}{" "}
                        {products[0].priceRange.maxVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Second product */}
          <div className="lg:col-span-1 lg:row-span-1 group">
            {products[1] && (
              <Link href={`/product/${products[1].handle}`} className="block">
                <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {products[1].title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl">
                        {products[1].priceRange.maxVariantPrice.amount}{" "}
                        {products[1].priceRange.maxVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Third product */}
          <div className="lg:col-span-1 lg:row-span-1 group">
            {products[2] && (
              <Link href={`/product/${products[2].handle}`} className="block">
                <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {products[2].title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl">
                        {products[2].priceRange.maxVariantPrice.amount}{" "}
                        {products[2].priceRange.maxVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Auto-scrolling carousel section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete Medical Catalog
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our comprehensive range of medical equipment and supplies
            </p>
          </div>
          <AutoScrollCarousel products={products.slice(3)} />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Equip Your Medical Practice Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
            Trusted by healthcare professionals worldwide. Quality equipment for
            better patient care and outcomes.
          </p>
          <div className="mt-8">
            <Link
              href="/search"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
            >
              Browse Medical Equipment
              <svg
                className="ml-2 h-5 w-5"
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
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
