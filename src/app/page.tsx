import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "../components/home/featured-products";
import { HeroSection } from "../components/home/hero-section";
// import { NewsletterSignup } from "@/components/home/newsletter-signup";
// import { PromoBanner } from "@/components/home/promo-banner";
// import { Testimonials } from "@/components/home/testimonials";
import { getFeaturedProducts, categories } from "@/lib/products";

export default function HomePage() {
  return ( 
    <>
      <HeroSection />
      {/* //getFeaturedProducts is a function that returns an array of Product objects. */}
      <FeaturedProducts products={getFeaturedProducts()} /> 
      <CategoriesSection categories={categories} /> 
      {/* categories is an array of Category objects. */}
      {/* <PromoBanner />
      <Testimonials />
      <NewsletterSignup />  */}
      
    </>
  );
}
