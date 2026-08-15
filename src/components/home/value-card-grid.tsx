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
    <div
      className="home-section-content-gap mx-auto grid w-full max-w-none items-stretch gap-4 min-[377px]:grid-cols-2 sm:gap-6 lg:max-w-[calc(100%-7rem)] lg:grid-cols-4 lg:gap-8"
      role="list"
    >
      {items.map((item, index) => (
        <FadeIn className="h-full" delay={index * 0.05} key={item.title}>
          <article
            className="group touch-card touch-card-lift touch-card-border-25 touch-card-surface-6 flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] active:-translate-y-1 active:border-white/25 active:bg-white/[0.06] sm:p-5 md:p-6 lg:p-8"
            data-touch-card
            role="listitem"
          >
            <div className="touch-card-icon-glow flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)] group-active:bg-glacier/18 group-active:shadow-[0_0_28px_rgba(125,211,252,0.16)] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
              <item.icon aria-hidden="true" className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-platinum sm:text-lg lg:mt-7">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-silver lg:mt-3">
              {item.description}
            </p>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
