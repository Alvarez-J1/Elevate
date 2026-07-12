import { ShopExperience } from "@/components/shop/shop-experience";
import { Container } from "@/components/ui/container";
import { fetchProducts, summaryToProduct } from "@/lib/api";
import { products as staticProducts } from "@/lib/products";
import type { Product, ProductCategory } from "@/types/product";

export const metadata = {
  title: "Shop | Elevate"
};

// This page reads live data from the Elevate backend, so it can't be frozen
// at build time the way a purely static page can.
export const dynamic = "force-dynamic";

async function loadProducts(): Promise<Product[]> {
  try {
    const page = await fetchProducts({ size: 100 });
    return page.content.map(summaryToProduct);
  } catch {
    // Backend not reachable (e.g. not started yet) — fall back to the
    // bundled catalog so the shop page still renders something useful.
    return staticProducts;
  }
}

function resolveCategory(
  categoryNames: ProductCategory[],
  raw?: string
): ProductCategory | "All" {
  if (!raw) return "All";
  const match = categoryNames.find(
    (name) => name.toLowerCase() === raw.toLowerCase()
  );
  return match ?? "All";
}

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, products] = await Promise.all([searchParams, loadProducts()]);

  const categoryNames = Array.from(
    new Set(products.map((product) => product.category))
  ) as ProductCategory[];
  const initialCategory = resolveCategory(categoryNames, category);

  return (
    <div className="pb-24 pt-14">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
            Shop
          </p>
          <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
          Explore premium technology designed for everyday use.
          </h1>
          <p className="mt-5 text-base leading-7 text-silver">
          Browse the catalog, compare categories, and sort products by price or rating.
          </p>
        </div>
        <ShopExperience
          categories={categoryNames}
          initialCategory={initialCategory}
          key={initialCategory}
          products={products}
        />
      </Container>
    </div>
  );
}
