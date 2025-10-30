import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/products";

export const metadata = {
  title: "Suchen",
  description: "Suchen Sie nach Produkten im Shop.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts(searchValue);
  const resultsText = products.length > 1 ? "Ergebnisse" : "Ergebnis";

  return (
    <>
      {searchValue ? (
        <p className="mb-4 text-sm md:text-base">
          {products.length === 0
            ? "Es gibt keine Produkte, die zu "
            : `${products.length} ${resultsText} für `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
