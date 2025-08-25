import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import Footer from "components/layout/footer";
import { getProducts } from "lib/shopify";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

export const metadata = {
  description:
    "Hochleistungs-E-Commerce-Shop gebaut mit Next.js, Vercel und Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const products = await getProducts({});

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* First product */}
          <div className="lg:col-span-1 lg:row-span-1">
            {products[0] && (
              <Link href={`/product/${products[0].handle}`} className="block">
                <div
                  className="relative h-full w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer dark:bg-neutral-800 dark:border-neutral-700"
                  style={{ aspectRatio: "1/1" }}
                >
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
                </div>
              </Link>
            )}
          </div>

          {/* Second product */}
          <div className="lg:col-span-1 lg:row-span-1">
            {products[1] && (
              <Link href={`/product/${products[1].handle}`} className="block">
                <div
                  className="relative h-full w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer dark:bg-neutral-800 dark:border-neutral-700"
                  style={{ aspectRatio: "1/1" }}
                >
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
                </div>
              </Link>
            )}
          </div>

          {/* Third product */}
          <div className="lg:col-span-1 lg:row-span-1">
            {products[2] && (
              <Link href={`/product/${products[2].handle}`} className="block">
                <div
                  className="relative h-full w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer dark:bg-neutral-800 dark:border-neutral-700"
                  style={{ aspectRatio: "1/1" }}
                >
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
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Auto-scrolling horizontal carousel */}
        <div className="mt-4 overflow-hidden">
          <div className="flex gap-3 animate-scroll">
            {/* First set of products */}
            {products.slice(3).map((product) => (
              <Link
                key={product.handle}
                href={`/product/${product.handle}`}
                className="block"
              >
                <div className="relative aspect-square w-48 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer dark:bg-neutral-800 dark:border-neutral-700">
                  <GridTileImage
                    src={product.featuredImage?.url}
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode:
                        product.priceRange.maxVariantPrice.currencyCode,
                    }}
                  />
                </div>
              </Link>
            ))}
            {/* Duplicate set for seamless loop */}
            {products.slice(3).map((product, index) => (
              <Link
                key={`duplicate-${product.handle}-${index}`}
                href={`/product/${product.handle}`}
                className="block"
              >
                <div className="relative aspect-square w-48 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer dark:bg-neutral-800 dark:border-neutral-700">
                  <GridTileImage
                    src={product.featuredImage?.url}
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode:
                        product.priceRange.maxVariantPrice.currencyCode,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
