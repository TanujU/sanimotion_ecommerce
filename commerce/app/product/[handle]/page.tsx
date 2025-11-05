import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductProvider } from "components/product/product-context";
import { ProductDescription } from "components/product/product-description";
import Prose from "components/prose";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/products";
import Link from "next/link";
import { Suspense } from "react";

// Cache product pages for 1 hour
export const revalidate = 3600;

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = true; // All products are indexable

  return {
    title: product.title,
    description: product.description || product.title,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();
  
  // Debug logging
  console.log('Product handle:', params.handle);
  console.log('Product images:', product.images);
  console.log('Product featuredImage:', product.featuredImage);
  console.log('Product imageUrl:', product.imageUrl);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 lg:pl-24">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-12">
          {/* Left Column: Image + Description */}
          <div className="h-full w-full basis-full lg:basis-2/3">
            {/* Product Image Section */}
            <div className="mb-8">
              <Suspense
                fallback={
                  <div className="relative aspect-square h-full max-h-[500px] w-full overflow-hidden" />
                }
              >
                <Gallery
                  images={
                    product.images && product.images.length > 0
                      ? product.images.slice(0, 5).map((image) => ({
                          src: image.url,
                          altText: image.altText,
                        }))
                      : product.featuredImage?.url
                        ? [
                            {
                              src: product.featuredImage.url,
                              altText: product.featuredImage.altText || product.title,
                            },
                          ]
                        : product.imageUrl
                          ? [
                              {
                                src: product.imageUrl,
                                altText: product.title,
                              },
                            ]
                          : []
                  }
                />
              </Suspense>
            </div>

            {/* Product Information Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Produktinformationen
              </h2>
              <h1 className="text-3xl font-medium text-black mb-4">
                {product.title}
              </h1>
              {product.description ? (
                <Prose
                  className="text-sm leading-relaxed text-gray-700 max-w-none text-justify"
                  html={product.description}
                />
              ) : null}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="basis-full lg:basis-1/3">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Ähnliche Produkte</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
