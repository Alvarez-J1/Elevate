import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared typography for every top-level page hero H1.
 *
 * Source of truth: the homepage hero heading ("Elevate" in
 * components/home/hero-section.tsx). 72px / semibold (600) /
 * leading-[1.02] on desktop, with the same responsive scale and
 * eyebrow-to-heading spacing on every page that uses it.
 */
export function pageTitleClassName(className?: string): string {
  return cn(
    "mt-eyebrow-heading text-5xl font-semibold leading-[1.02] text-platinum sm:text-6xl lg:text-7xl min-[1600px]:text-[5.75rem] min-[1920px]:text-[6.5rem]",
    className
  );
}

export function PageTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h1 className={pageTitleClassName(className)} {...props}>
      {children}
    </h1>
  );
}
