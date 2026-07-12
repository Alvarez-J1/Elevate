import { BrandValuesSection } from "@/components/home/brand-values-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { SectionDivider } from "@/components/home/section-divider";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ValuePropsSection } from "@/components/home/value-props-section";
import { FeaturedProducts } from "../components/home/featured-products";
import { HeroSection } from "../components/home/hero-section";
import { categoryToDisplay, fetchCategories, fetchFeaturedProducts, summaryToProduct } from "@/lib/api";
import { getFeaturedProducts, categories as staticCategories } from "@/lib/products";
import type { Category, Product } from "@/types/product";

// This page reads live data from the Elevate backend, so it can't be frozen
// at build time the way a purely static page can.
export const dynamic = "force-dynamic";

async function loadFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await fetchFeaturedProducts();
    return products.map(summaryToProduct);
  } catch {
    // Backend not reachable (e.g. not started yet) — fall back to the
    // bundled catalog so the homepage still renders something useful.
    return getFeaturedProducts();
  }
}

async function loadCategories(): Promise<Category[]> {
  try {
    const categories = await fetchCategories();
    return categories.map(categoryToDisplay);
  } catch {
    return staticCategories;
  }
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    loadFeaturedProducts(),
    loadCategories()
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <SectionDivider />
      <ValuePropsSection />
      <SectionDivider />
      <BrandValuesSection />
      <SectionDivider />
      <TestimonialsSection />
      <CategoriesSection categories={categories} />
      <SectionDivider />
      <NewsletterSection />
      <SectionDivider />
    </>
  );
}
