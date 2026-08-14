"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { QuantitySelector } from "@/components/product/quantity-selector";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/components/store/cart-store";
import { useCartStore } from "@/components/store/cart-store";
import { removeServerCartItem, updateServerCartItem } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/utils";

export function CartLineItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const { token } = useAuth();
  const titleId = `cart-item-title-${item.key}`;

  function handleQuantityChange(quantity: number) {
    updateQuantity(item.key, quantity);

    if (token && item.serverItemId) {
      updateServerCartItem(token, item.serverItemId, quantity).catch(() => undefined);
    }
  }

  function handleRemove() {
    removeItem(item.key);

    if (token && item.serverItemId) {
      removeServerCartItem(token, item.serverItemId).catch(() => undefined);
    }
  }

  return (
    <article
      aria-labelledby={titleId}
      className="grid grid-cols-[5.5rem_1fr] gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 sm:grid-cols-[7rem_1fr_auto]"
    >
      <Link
        className="relative aspect-square self-start overflow-hidden rounded-lg bg-carbon"
        href={`/product/${item.slug}`}
      >
        <Image
          alt={item.name}
          className="object-cover"
          fill
          sizes="(min-width: 640px) 112px, 88px"
          src={item.image}
        />
      </Link>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.22em] text-eyebrow">
          {item.category}
        </p>
        <Link href={`/product/${item.slug}`}>
          <h2
            className="mt-eyebrow-heading text-lg font-semibold text-platinum transition hover:text-white"
            id={titleId}
          >
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

      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end">
        <QuantitySelector
          compact
          onChange={handleQuantityChange}
          value={item.quantity}
        />
        <Button
          aria-label={`Remove ${item.name}`}
          onClick={handleRemove}
          size="icon"
          variant="ghost"
        >
          <Trash2 aria-hidden="true" size={17} />
        </Button>
      </div>
    </article>
  );
}
