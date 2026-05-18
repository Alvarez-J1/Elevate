import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in"; //FadeIn is a component from the components/motion/fade-in.tsx file.
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { Category } from "@/types/product";


// This first categories is the actual prop being pulled out of the props object. This is called destructuring.
//The second categories is the TypeScript type for the props object.
//Category[] means “that prop must be an array of Category objects.”



export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Categories"
            title="Explore collections built for work, travel, and everyday use."
            description="Explore premium technology designed for work, travel, entertainment, and everyday use."
          />
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (  
            <FadeIn delay={index * 0.05} key={category.slug}>
              <Link
                className="group block overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]"
                href="/shop"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
                    src={category.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/86 via-obsidian/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-platinum">
                        {category.name}
                      </h3>
                      <ArrowUpRight
                        className="text-glacier opacity-0 transition group-hover:opacity-100"
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
          ))}
        </div>
      </Container>
    </section>
  );
}
