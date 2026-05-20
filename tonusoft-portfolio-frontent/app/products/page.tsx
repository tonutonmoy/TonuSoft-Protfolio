import { ProductsClient } from "../../src/components/sections/products-client";
import { fetchFromApi } from "../../src/lib/serverApi";
import { createMetadata } from "../../src/lib/seo";

export const metadata = createMetadata({
  title: "TonuSoft Products",
  description: "Explore TonuSoft flagship product suite for business operations and digital experience.",
  path: "/products",
  keywords: ["TonuSoft products", "business software products", "SaaS products"],
});

export default async function ProductsPage() {
  const productsData = await fetchFromApi<any[]>("/content/products");
  const categoriesData = await fetchFromApi<any[]>("/content/categories");

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
        <ProductsClient products={productsData ?? []} categories={categoriesData ?? []} />
      </div>
    </div>
  );
}
