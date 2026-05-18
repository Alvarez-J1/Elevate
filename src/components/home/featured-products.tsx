import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "../../components/motion/fade-in";
import { ProductCard } from "../product/product-card";
// @/ means the path starts from the src folder.
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { buttonClassName } from "@/components/ui/button";
import type { Product } from "@/types/product";

// { products } destructures the products prop from the props object.
// Product[] means products must be an array of Product objects.
export function FeaturedProducts({ products }: { products: Product[] }) { 
  return (
    // py-24 adds vertical padding to the section.
    <section className="py-1 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* FadeIn is a component from the framer-motion library that animates the text. */}
          <FadeIn>
            <SectionHeader
              eyebrow="Featured"
              title="High-quality tech for productivity and enjoyment"
              description="A collection of headphones, watches, cameras, and workspace accessories."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            {/* variant: "secondary" uses the secondary button style. */}
            <Link
              className={buttonClassName({ variant: "secondary" })}
              href="/shop"
            >
              View all
              <ArrowRight size={17} />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <FadeIn delay={index * 0.05} key={product.id}>
              {/* delay staggers the animation for each product card. */}
              {/* ProductCard is a component from the components/product/product-card.tsx file. */}
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
