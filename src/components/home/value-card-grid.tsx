import type { LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";

export type ValueCardData = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/**
 * Shared grid + card layout used by both the "Why Elevate" and "Our
 * Philosophy" homepage sections. Keeping this in one place is what keeps
 * the two sections pixel-identical (column count, card width/height,
 * padding, gap, hover treatment, and responsive breakpoints) instead of
 * each section hardcoding its own sizing classes that can drift apart.
 */
export function ValueCardGrid({ items }: { items: ValueCardData[] }) {
  return (
    <div className="home-section-content-gap mx-auto grid max-w-[calc(100%-7rem)] items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {items.map((item, index) => (
        <FadeIn className="h-full" delay={index * 0.05} key={item.title}>
          <article className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
              <item.icon size={24} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-platinum md:mt-7">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-silver md:mt-3">
              {item.description}
            </p>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
