import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "../components/home/featured-products";
import { HeroSection } from "../components/home/hero-section"
import { getFeaturedProducts, categories } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts products={getFeaturedProducts()} />
      <CategoriesSection categories={categories} />
    
    </>
  );
}
