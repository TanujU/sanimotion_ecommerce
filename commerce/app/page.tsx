import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import Footer from 'components/layout/footer';
import { getProducts } from 'lib/shopify';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

export const metadata = {
  description:
    'Hochleistungs-E-Commerce-Shop gebaut mit Next.js, Vercel und Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getProducts({});

  return (
    <div className="min-h-screen bg-white">
      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main large product display */}
          <div className="lg:col-span-2 lg:row-span-2">
            {products[0] && (
              <Link href={`/product/${products[0].handle}`} className="block">
                <div className="relative h-full w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer" style={{ aspectRatio: '995/600' }}>
                  <GridTileImage
                    src={products[0].featuredImage?.url}
                    alt={products[0].title}
                    label={{
                      title: products[0].title,
                      amount: products[0].priceRange.maxVariantPrice.amount,
                      currencyCode: products[0].priceRange.maxVariantPrice.currencyCode
                    }}
                  />
                </div>
              </Link>
            )}
          </div>
          
          {/* Right column products */}
          <div className="space-y-4">
            {products.slice(1, 3).map((product) => (
              <Link key={product.handle} href={`/product/${product.handle}`} className="block">
                <div className="relative w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer" style={{ aspectRatio: '995/590' }}>
                  <GridTileImage
                    src={product.featuredImage?.url}
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode: product.priceRange.maxVariantPrice.currencyCode
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Auto-scrolling horizontal carousel */}
        <div className="mt-4 overflow-hidden">
          <div className="flex gap-4 animate-scroll">
            {/* First set of products */}
            {products.slice(3).map((product) => (
              <Link key={product.handle} href={`/product/${product.handle}`} className="block">
                <div className="relative aspect-square w-64 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
                  <GridTileImage
                    src={product.featuredImage?.url}
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode: product.priceRange.maxVariantPrice.currencyCode
                    }}
                  />
                </div>
              </Link>
            ))}
            {/* Duplicate set for seamless loop */}
            {products.slice(3).map((product, index) => (
              <Link key={`duplicate-${product.handle}-${index}`} href={`/product/${product.handle}`} className="block">
                <div className="relative aspect-square w-64 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
                  <GridTileImage
                    src={product.featuredImage?.url}
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode: product.priceRange.maxVariantPrice.currencyCode
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
