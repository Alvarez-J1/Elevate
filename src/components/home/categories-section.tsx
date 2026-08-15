import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section
      aria-labelledby="categories-heading"
      className="home-section bg-white/[0.025]"
    >
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Categories"
            titleId="categories-heading"
            title="Explore collections built for work, travel, and everyday use."
            description="Explore premium technology designed for work, travel, entertainment, and everyday use."
          />
        </FadeIn>
        <div
          className="home-section-content-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-5 min-[1600px]:gap-5 min-[1920px]:gap-6"
          role="list"
        >
          {categories.map((category, index) => {
            const isTravelCategory = category.slug === "travel";

            return (
              <FadeIn delay={index * 0.05} key={category.slug} role="listitem">
                <Link
                  className="group touch-card block overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]"
                  data-touch-card
                  href={`/shop?category=${category.slug}`}
                >
                  <div
                    className={cn(
                      "relative h-[360px] overflow-hidden min-[480px]:h-[430px] sm:h-[360px] lg:aspect-[4/5] lg:h-auto",
                      isTravelCategory && "sm:!h-[430px] lg:!h-auto"
                    )}
                  >
                    {isTravelCategory ? (
                      <Image
                        alt={category.name}
                        className="touch-card-image-zoom h-full w-full object-cover object-[50%_28%] transition duration-700 group-hover:scale-105 group-active:scale-105 lg:object-center"
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
                        src={category.image}
                      />
                    ) : (
                      <Image
                        alt={category.name}
                        className="touch-card-image-zoom h-full w-full object-cover transition duration-700 group-hover:scale-105 group-active:scale-105"
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
                        src={category.image}
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-obsidian/92 via-obsidian/26 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-platinum">
                          {category.name}
                        </h3>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="touch-card-reveal text-white opacity-0 transition group-hover:opacity-100 group-active:opacity-100"
                          size={18}
                        />
                      </div>
                      <p className="mt-2 text-sm leading-5 text-silver">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
