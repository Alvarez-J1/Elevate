"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AlertCircle, Check, CreditCard, Lock, PackageCheck, ShoppingBag } from "lucide-react";

import { OrderSummary } from "@/components/cart/order-summary";
import { Button, buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { type CartItem, useCartStore } from "@/components/store/cart-store";
import {
  addServerCartItem,
  ApiError,
  checkout,
  resolveProductIdForApi,
  type ApiOrderItem
} from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/utils";

type Confirmation = {
  orderNumber: string;
  items: ApiOrderItem[];
  total: number;
};

type CheckoutLine = {
  productId: number;
  quantity: number;
  color?: string;
};

async function toCheckoutLine(item: CartItem): Promise<CheckoutLine> {
  try {
    const productId = await resolveProductIdForApi(item);
    return { productId, quantity: item.quantity, color: item.color };
  } catch {
    throw new ApiError(
      400,
      `${item.name} needs to be removed from the cart and added again before checkout.`
    );
  }
}

function formatCheckoutError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.fieldErrors?.length) {
      return error.fieldErrors.map((fieldError) => fieldError.message).join(" ");
    }
    return error.message;
  }

  return "Something went wrong placing your order. Please try again.";
}

export function CheckoutExperience() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const attachServerId = useCartStore((state) => state.attachServerId);
  const { token, user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0 || isProcessing) {
      return;
    }

    setError(null);
    setIsProcessing(true);

    const form = new FormData(event.currentTarget);
    const orderedItems = items;

    try {
      const checkoutItems = await Promise.all(orderedItems.map(toCheckoutLine));

      if (token) {
        for (const [index, item] of orderedItems.entries()) {
          if (item.serverItemId) {
            continue;
          }

          const cart = await addServerCartItem(token, checkoutItems[index]);
          const match = cart.items.find(
            (serverItem) =>
              serverItem.productId === checkoutItems[index].productId &&
              (serverItem.color ?? undefined) === item.color
          );

          if (match) {
            attachServerId(item.key, match.id);
          }
        }
      }

      const order = await checkout(
        {
          contactEmail: String(form.get("email") ?? "").trim() || undefined,
          shippingAddress: {
            firstName: String(form.get("firstName") ?? "").trim(),
            lastName: String(form.get("lastName") ?? "").trim(),
            addressLine1: String(form.get("addressLine1") ?? "").trim(),
            city: String(form.get("city") ?? "").trim(),
            postalCode: String(form.get("postalCode") ?? "").trim(),
            country: String(form.get("country") ?? "").trim()
          },
          items: checkoutItems
        },
        token
      );

      setConfirmation({
        orderNumber: order.orderNumber,
        items: order.items,
        total: order.total
      });
      clearCart();

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(formatCheckoutError(err));
    } finally {
      setIsProcessing(false);
    }
  }

  if (!hasHydrated) {
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
          <PackageCheck aria-hidden="true" size={28} />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-eyebrow">
          Order confirmed
        </p>
        <h1 className="mt-eyebrow-heading text-4xl font-semibold text-platinum">
          Your order is in.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-silver">
          Confirmation {confirmation.orderNumber} has been created for{" "}
          {formatCurrency(confirmation.total)}.
        </p>
        <div className="mt-8 grid gap-3 text-left">
          {confirmation.items.map((item, index) => (
            <div
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] p-4"
              key={`${item.productId ?? "item"}:${item.productName}:${item.color ?? "default"}:${index}`}
            >
              <div>
                <p className="font-medium text-platinum">{item.productName}</p>
                <p className="mt-1 text-sm text-muted">
                  Qty {item.quantity}
                  {item.color ? ` - ${item.color}` : ""}
                </p>
              </div>
              <p className="text-sm text-silver">
                {formatCurrency(item.lineTotal)}
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
        description="Your cart is empty. Add products first, then return to check out."
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
        aria-labelledby="checkout-heading"
        className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-soft sm:p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-glacier/12 text-glacier">
            <Lock aria-hidden="true" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-platinum" id="checkout-heading">
              Checkout
            </h2>
            <p className="mt-1 text-sm text-silver">
              {isAuthenticated
                ? "Placing this order under your account."
                : "Checking out as a guest. Create an account afterward to track orders."}
            </p>
          </div>
        </div>

        {error ? (
          <div
            className="mt-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
            role="alert"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 flex-none" size={16} />
            <p>{error}</p>
          </div>
        ) : null}

        <section className="mt-6">
          <h3 className="text-lg font-semibold text-platinum">Shipping</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="checkout-first-name">
              <span className="mb-2 block text-sm text-silver">First name</span>
              <input className="input-shell h-12 px-4" id="checkout-first-name" name="firstName" required />
            </label>
            <label className="block" htmlFor="checkout-last-name">
              <span className="mb-2 block text-sm text-silver">Last name</span>
              <input className="input-shell h-12 px-4" id="checkout-last-name" name="lastName" required />
            </label>
            <label className="block sm:col-span-2" htmlFor="checkout-email">
              <span className="mb-2 block text-sm text-silver">Email</span>
              <input
                className="input-shell h-12 px-4"
                defaultValue={user?.email}
                id="checkout-email"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="block sm:col-span-2" htmlFor="checkout-address-line-1">
              <span className="mb-2 block text-sm text-silver">Address</span>
              <input className="input-shell h-12 px-4" id="checkout-address-line-1" name="addressLine1" required />
            </label>
            <label className="block" htmlFor="checkout-city">
              <span className="mb-2 block text-sm text-silver">City</span>
              <input className="input-shell h-12 px-4" id="checkout-city" name="city" required />
            </label>
            <label className="block" htmlFor="checkout-postal-code">
              <span className="mb-2 block text-sm text-silver">Postal code</span>
              <input className="input-shell h-12 px-4" id="checkout-postal-code" name="postalCode" required />
            </label>
            <label className="block sm:col-span-2" htmlFor="checkout-country">
              <span className="mb-2 block text-sm text-silver">Country</span>
              <input
                className="input-shell h-12 px-4"
                defaultValue="United States"
                id="checkout-country"
                name="country"
                required
              />
            </label>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center gap-3">
            <CreditCard aria-hidden="true" className="text-glacier" size={20} />
            <h3 className="text-lg font-semibold text-platinum">Payment</h3>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-obsidian/40 p-4">
            <p className="mb-4 text-xs text-muted">
              Portfolio project - payment details below are never sent anywhere; the order is created directly.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2" htmlFor="checkout-card-number">
                <span className="mb-2 block text-sm text-silver">Card number</span>
                <input
                  className="input-shell h-12 px-4"
                  id="checkout-card-number"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </label>
              <label className="block" htmlFor="checkout-card-expiry">
                <span className="mb-2 block text-sm text-silver">Expiry</span>
                <input
                  className="input-shell h-12 px-4"
                  id="checkout-card-expiry"
                  placeholder="12 / 30"
                  required
                />
              </label>
              <label className="block" htmlFor="checkout-card-cvc">
                <span className="mb-2 block text-sm text-silver">CVC</span>
                <input
                  className="input-shell h-12 px-4"
                  id="checkout-card-cvc"
                  inputMode="numeric"
                  placeholder="123"
                  required
                />
              </label>
            </div>
          </div>
        </section>

        <Button
          aria-busy={isProcessing}
          className="mt-8 w-full"
          disabled={isProcessing}
          size="lg"
          type="submit"
        >
          {isProcessing ? <CreditCard aria-hidden="true" size={18} /> : <Check aria-hidden="true" size={18} />}
          {isProcessing ? "Processing" : "Place order"}
        </Button>
      </form>

      <div className="lg:sticky lg:top-24">
        <OrderSummary compact items={items} />
      </div>
    </div>
  );
}
