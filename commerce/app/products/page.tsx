import { getProducts } from "lib/products";
import ProductGridItems from "components/layout/product-grid-items";
import Grid from "components/grid";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Alle Produkte",
  description:
    "Durchsuchen Sie unser vollständiges Sortiment an medizinischen Produkten und Ausrüstung.",
};

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Alle Produkte
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {products.length} Produkte verfügbar
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductGridItems products={products} />
          </Grid>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Derzeit sind keine Produkte verfügbar.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}


