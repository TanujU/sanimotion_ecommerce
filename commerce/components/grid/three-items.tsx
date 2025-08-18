import { GridTileImage } from 'components/grid/tile';
import { getProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  priority,
  isFirst = false
}: {
  item: Product;
  priority?: boolean;
  isFirst?: boolean;
}) {
  return (
    <div className={isFirst ? 'md:col-span-1 md:row-span-1' : 'md:col-span-2 md:row-span-1'}>
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          sizes={isFirst ? "(min-width: 768px) 16vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          priority={priority}
          alt={item.title}
          label={{
            position: 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Get the first 3 products for the homepage grid
  const homepageItems = await getProducts({});

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-5 md:grid-rows-1 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem item={firstProduct} priority={true} isFirst={true} />
      <ThreeItemGridItem item={secondProduct} priority={true} />
      <ThreeItemGridItem item={thirdProduct} />
    </section>
  );
}
