"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { CartLineItem } from "@/components/cart/cart-line-item";
import { OrderSummary } from "@/components/cart/order-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonClassName } from "@/components/ui/button";
import { useCartStore } from "@/components/store/cart-store";

export function CartExperience() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={22} />}
        title="Your cart is empty"
        description="Browse the collection to add your selected products."
        action={
          <Link className={buttonClassName()} href="/shop">
            Browse collection
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-start">
      <div className="grid gap-4">
        {items.map((item) => (
          <CartLineItem item={item} key={item.key} />
        ))}
      </div>
      <div className="lg:sticky lg:top-24">
        <OrderSummary
          action={
            <Link className={buttonClassName({ className: "w-full" })} href="/checkout">
              Continue to checkout
            </Link>
          }
          items={items}
        />
      </div>
    </div>
  );
}
