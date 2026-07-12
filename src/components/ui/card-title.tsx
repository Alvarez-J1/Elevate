import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared typography for "premium card" titles used inside highlight/benefit
 * cards across marketing and support pages (shipping benefits, return
 * highlights, refund/exchange blocks, contact options, etc).
 *
 * 30px / semibold, within the project's 28-32px card-title spec, preserving
 * the existing mt-7 spacing token used above these headings.
 */
export function cardTitleClassName(className?: string): string {
  return cn("mt-7 text-3xl font-semibold text-platinum", className);
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h2 className={cardTitleClassName(className)} {...props}>
      {children}
    </h2>
  );
}
