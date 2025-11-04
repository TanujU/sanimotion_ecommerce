import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getProducts } from "lib/products";
import { getCategoryBySlug } from "lib/categories";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = await getCategoryBySlug(params.collection);

  if (!category) return notFound();

  return {
    title: category.name,
    description: category.description || `${category.name} Produkte`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const category = await getCategoryBySlug(params.collection);

  if (!category) return notFound();

  // Fetch products for this category using Produktbereich
  const products = await getProducts(undefined, category.name);

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>
      {products.length === 0 ? (
        <p className="py-3 text-lg text-gray-500">
          Keine Produkte in dieser Kategorie gefunden
        </p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
