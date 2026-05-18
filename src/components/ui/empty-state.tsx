import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-80 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-14 text-center",
        className
      )}
    >
      {icon ? (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-glacier">
          {icon}
        </div>
      ) : null}
      <h2 className="text-xl font-semibold text-platinum">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-silver">{description}</p>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}
