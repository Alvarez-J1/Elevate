import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/product/product-details";
import { ProductReviews } from "@/components/product/product-reviews";
import { detailToProduct, fetchProductBySlug, fetchRelatedProducts, summaryToProduct } from "@/lib/api";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import type { Product } from "@/types/product";

// This page reads live data from the Elevate backend, so it can't be frozen
// at build time the way a purely static page can.
export const dynamic = "force-dynamic";

async function loadProduct(slug: string): Promise<Product | undefined> {
  try {
    const detail = await fetchProductBySlug(slug);
    return detailToProduct(detail);
  } catch {
    // Backend not reachable, or the product genuinely doesn't exist there —
    // fall back to the bundled catalog before giving up.
    return getProductBySlug(slug);
  }
}

async function loadRelatedProducts(slug: string, fallback: Product): Promise<Product[]> {
  try {
    const related = await fetchRelatedProducts(slug);
    return related.map(summaryToProduct);
  } catch {
    return getRelatedProducts(fallback);
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product) {
    return {
      title: "Product not found | Elevate"
    };
  }

  return {
    title: `${product.name} | Elevate`,
    description: product.tagline
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product) {
    notFound();
  }

  const related = await loadRelatedProducts(slug, product);

  return (
    <>
      <ProductDetails product={product} related={related} />
      <ProductReviews slug={product.slug} />
    </>
  );
}
