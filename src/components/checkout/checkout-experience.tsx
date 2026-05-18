"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, CreditCard, Lock, PackageCheck, ShoppingBag } from "lucide-react";

import {
  calculateOrderTotals,
  OrderSummary
} from "@/components/cart/order-summary";
import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import type { CartItem } from "@/store/cart-store";
import { useCartStore } from "../store/cart-store";
import { formatCurrency } from "@/lib/utils";

type Confirmation = {
  id: string;
  items: CartItem[];
  total: number;
};

export function CheckoutExperience() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [mounted, setMounted] = useState(false);
  const totals = useMemo(() => calculateOrderTotals(items), [items]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0 || isProcessing) {
      return;
    }

    setIsProcessing(true);

    window.setTimeout(() => {
      setConfirmation({
        id: `ELEVATE-${Math.floor(100000 + Math.random() * 900000)}`,
        items,
        total: totals.total
      });
      clearCart();
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  }

  if (!mounted) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
        <Skeleton className="h-[36rem]" />
        <Skeleton className="h-80" />
      </div>
    );
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-glacier/15 text-glacier">
          <PackageCheck size={28} />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-glacier">
          Order confirmed
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-platinum">
          Your sandbox order is in.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-silver">
          Confirmation {confirmation.id} has been created for{" "}
          {formatCurrency(confirmation.total)}. No real payment was processed.
        </p>
        <div className="mt-8 grid gap-3 text-left">
          {confirmation.items.map((item) => (
            <div
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] p-4"
              key={item.key}
            >
              <div>
                <p className="font-medium text-platinum">{item.name}</p>
                <p className="mt-1 text-sm text-muted">Qty {item.quantity}</p>
              </div>
              <p className="text-sm text-silver">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <Link className={buttonClassName({ className: "mt-8" })} href="/shop">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={22} />}
        title="Checkout is waiting for items"
        description="Your cart is empty. Add products first, then return for the sandbox checkout flow."
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
      <form
        className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-soft sm:p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-glacier/12 text-glacier">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-platinum">
              Sandbox checkout
            </h2>
            <p className="mt-1 text-sm text-silver">
            Demo checkout only. No real payment will be processed.
            </p>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="text-lg font-semibold text-platinum">Shipping</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-silver">First name</span>
              <input className="input-shell h-12 px-4" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-silver">Last name</span>
              <input className="input-shell h-12 px-4" required />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm text-silver">Address</span>
              <input className="input-shell h-12 px-4" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-silver">City</span>
              <input className="input-shell h-12 px-4" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-silver">Postal code</span>
              <input className="input-shell h-12 px-4" required />
            </label>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center gap-3">
            <CreditCard className="text-glacier" size={20} />
            <h3 className="text-lg font-semibold text-platinum">Payment</h3>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-obsidian/40 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-silver">Card number</span>
                <input
                  className="input-shell h-12 px-4"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-silver">Expiry</span>
                <input
                  className="input-shell h-12 px-4"
                  placeholder="12 / 30"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-silver">CVC</span>
                <input
                  className="input-shell h-12 px-4"
                  inputMode="numeric"
                  placeholder="123"
                  required
                />
              </label>
            </div>
          </div>
        </section>

        <Button className="mt-8 w-full" disabled={isProcessing} size="lg" type="submit">
          {isProcessing ? <CreditCard size={18} /> : <Check size={18} />}
          {isProcessing ? "Processing" : "Place order"}
        </Button>
      </form>

      <div className="lg:sticky lg:top-24">
        <OrderSummary compact items={items} />
      </div>
    </div>
  );
}
