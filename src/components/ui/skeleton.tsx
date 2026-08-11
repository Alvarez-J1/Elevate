import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-white/[0.06] via-white/[0.1] to-white/[0.06]",
        className
      )}
    />
  );
}
