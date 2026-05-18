import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({
  // children is the content placed between <Container> and </Container>.
  children,
  className 
}: {
  // ReactNode can be JSX, text, numbers, or other renderable React content.
  children: ReactNode;
  className?: string;
}) {
  return (
    // The className at the end adds optional extra styles from the parent.
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {/* This is where the wrapped content appears. */}
      {children}
    </div>
  );
}
