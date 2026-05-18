"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { QuantitySelector } from "@/components/product/quantity-selector";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/components/store/cart-store";
import { useCartStore } from "@/components/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export function CartLineItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 sm:grid-cols-[7rem_1fr_auto]">
      <Link
        className="relative aspect-square overflow-hidden rounded-lg bg-carbon"
        href={`/product/${item.slug}`}
      >
        <Image
          alt={item.name}
          className="object-cover"
          fill
          sizes="112px"
          src={item.image}
        />
      </Link>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">
          {item.category}
        </p>
        <Link href={`/product/${item.slug}`}>
          <h2 className="mt-2 text-lg font-semibold text-platinum transition hover:text-white">
            {item.name}
          </h2>
        </Link>
        {item.color ? (
          <p className="mt-2 text-sm text-silver">Finish: {item.color}</p>
        ) : null}
        <p className="mt-3 text-base font-semibold text-platinum">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <QuantitySelector
          compact
          onChange={(quantity) => updateQuantity(item.key, quantity)}
          value={item.quantity}
        />
        <Button
          aria-label={`Remove ${item.name}`}
          onClick={() => removeItem(item.key)}
          size="icon"
          variant="ghost"
        >
          <Trash2 size={17} />
        </Button>
      </div>
    </article>
  );
}
