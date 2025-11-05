import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { ProductWithVariants } from "lib/types";
import Link from "next/link";
import { FavoriteButton } from "components/favorite-button";
import { AddToCart } from "components/cart/add-to-cart";

// Type-safe Link component for React 19 compatibility
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
    <LinkComponent
      href={href}
      className={className}
      prefetch={false}
      {...props}
    >
      {children}
    </LinkComponent>
  );
};

export default function ProductGridItems({
  products,
}: {
  products: ProductWithVariants[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn relative group">
          <SafeLink
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
          >
            {(() => {
              const amount = (product.priceRange?.maxVariantPrice?.amount ||
                product.variants?.[0]?.price?.amount ||
                (typeof (product as any).price === "number"
                  ? (product as any).price.toFixed(2)
                  : (product as any).price || "0.00")) as string;
              const currency = (product.priceRange?.maxVariantPrice
                ?.currencyCode ||
                product.variants?.[0]?.price?.currencyCode ||
                "EUR") as string;
              return (
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount,
                    currencyCode: currency,
                    dosage: product.dosage,
                  }}
                  src={product.featuredImage?.url}
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              );
            })()}
          </SafeLink>
          {/* Favorite Button - Top Right, always visible */}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton
              product={{
                id: product.id,
                title: product.title,
                price: `€${String(
                  product.priceRange?.maxVariantPrice?.amount ||
                    product.variants?.[0]?.price?.amount ||
                    (typeof (product as any).price === "number"
                      ? (product as any).price.toFixed(2)
                      : (product as any).price || "0.00")
                ).replace(".", ",")}`,
                sizes: product.dosage ? [product.dosage] : [],
                image: product.featuredImage?.url || "",
                alt: product.title,
                handle: product.handle,
              }}
              size="md"
            />
          </div>

          {/* Add to Cart Button - bottom right corner */}
          <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <AddToCart product={product} compact />
          </div>
        </Grid.Item>
      ))}
    </>
  );
}
