import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import Footer from 'components/layout/footer';
import { getProducts } from 'lib/shopify';
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
                <div className="relative aspect-square h-full w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
                  <img
                    src={products[0].featuredImage?.url}
                    alt={products[0].title}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center rounded-full border bg-white/90 p-1 text-xs font-semibold text-black backdrop-blur-md shadow-sm">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{products[0].title}</h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">€{products[0].priceRange.maxVariantPrice.amount}<span className="ml-1 hidden @[275px]/label:inline">EUR</span></p>
                  </div>
                </div>
              </Link>
            )}
          </div>
          
          {/* Right column products */}
          <div className="space-y-4">
            {products.slice(1, 3).map((product) => (
              <Link key={product.handle} href={`/product/${product.handle}`} className="block">
                <div className="relative aspect-square w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
                  <img
                    src={product.featuredImage?.url}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center rounded-full border bg-white/90 p-1 text-xs font-semibold text-black backdrop-blur-md shadow-sm">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.title}</h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">€{product.priceRange.maxVariantPrice.amount}<span className="ml-1 hidden @[275px]/label:inline">EUR</span></p>
                  </div>
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
                  <img
                    src={product.featuredImage?.url}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center rounded-full border bg-white/90 p-1 text-xs font-semibold text-black backdrop-blur-md shadow-sm">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.title}</h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">€{product.priceRange.maxVariantPrice.amount}<span className="ml-1 hidden @[275px]/label:inline">EUR</span></p>
                  </div>
                </div>
              </Link>
            ))}
            {/* Duplicate set for seamless loop */}
            {products.slice(3).map((product, index) => (
              <Link key={`duplicate-${product.handle}-${index}`} href={`/product/${product.handle}`} className="block">
                <div className="relative aspect-square w-64 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-600 transition-colors cursor-pointer">
                  <img
                    src={product.featuredImage?.url}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center rounded-full border bg-white/90 p-1 text-xs font-semibold text-black backdrop-blur-md shadow-sm">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.title}</h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">€{product.priceRange.maxVariantPrice.amount}<span className="ml-1 hidden @[275px]/label:inline">EUR</span></p>
                  </div>
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
