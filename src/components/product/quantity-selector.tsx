"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  compact = false
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}) {
  return (
    <div
      className="inline-flex h-11 items-center rounded-lg border border-white/10 bg-white/[0.055]"
      aria-label="Quantity selector"
    >
      <Button
        aria-label="Decrease quantity"
        className="h-10 w-10"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        size="icon"
        variant="ghost"
      >
        <Minus size={16} />
      </Button>
      <span
        className={
          compact
            ? "w-9 text-center text-sm font-medium text-platinum"
            : "w-12 text-center text-sm font-medium text-platinum"
        }
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        aria-label="Increase quantity"
        className="h-10 w-10"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        size="icon"
        variant="ghost"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
