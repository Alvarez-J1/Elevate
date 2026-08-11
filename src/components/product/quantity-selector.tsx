"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  compact = false,
  className,
  buttonClassName,
  valueClassName
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
  className?: string;
  buttonClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div
      aria-label="Quantity selector"
      className={cn(
        "inline-flex h-11 items-center rounded-lg border border-white/10 bg-white/[0.055]",
        className
      )}
      role="group"
    >
      <Button
        aria-label="Decrease quantity"
        className={cn("h-10 w-10", buttonClassName)}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        size="icon"
        variant="ghost"
      >
        <Minus aria-hidden="true" size={16} />
      </Button>
      <span
        className={cn(
          compact ? "w-9" : "w-12",
          "text-center text-sm font-medium text-platinum",
          valueClassName
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        aria-label="Increase quantity"
        className={cn("h-10 w-10", buttonClassName)}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        size="icon"
        variant="ghost"
      >
        <Plus aria-hidden="true" size={16} />
      </Button>
    </div>
  );
}
