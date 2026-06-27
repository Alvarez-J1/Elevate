import { ShopExperience } from "@/components/shop/shop-experience";
import { Container } from "@/components/ui/container";
import { products } from "@/lib/products";
import type { ProductCategory } from "@/types/product";

export const metadata = {
  title: "Shop | Elevate"
};

const categoryNames = Array.from(
  new Set(products.map((product) => product.category))
) as ProductCategory[];

export default function ShopPage() {
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
        <ShopExperience categories={categoryNames} products={products} />
      </Container>
    </div>
  );
}
