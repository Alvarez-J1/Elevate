"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { Button, type ButtonSize } from "@/components/ui/button";
import { useCartStore } from "@/components/store/cart-store";
import { addServerCartItem, resolveProductIdForApi } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useGuardedAddToCart } from "@/lib/use-guarded-add-to-cart";
import type { Product } from "@/types/product";

export function AddToCartButton({
  product,
  quantity = 1,
  color,
  ariaLabel,
  label = "Add to cart",
  size = "md",
  className
}: {
  product: Product;
  quantity?: number;
  color?: string;
  ariaLabel?: string;
  label?: string;
  size?: ButtonSize;
  className?: string;
}) {
  const attachServerId = useCartStore((state) => state.attachServerId);
  const { token, isAuthenticated } = useAuth();
  const guardedAddToCart = useGuardedAddToCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [added]);

  function handleAdd() {
    // Signed-out visitors never reach the cart here: useGuardedAddToCart
    // stores the intended product/quantity/color and redirects to
    // /login?returnTo=... instead. No item is added and no "Added" state
    // is shown until they've authenticated.
    const result = guardedAddToCart(product, quantity, color);
    if (result === "redirected") {
      return;
    }

    setAdded(true);

    // Best-effort background sync to the signed-in user's server-side cart;
    // the local store above is already the source of truth for the UI, so a
    // failed/slow sync here never blocks the shopping experience.
    if (isAuthenticated && token) {
      const key = `${product.id}:${color ?? "default"}`;

      void (async () => {
        const productId = await resolveProductIdForApi(product);
        const cart = await addServerCartItem(token, { productId, quantity, color });

        const match = cart.items.find(
          (item) => item.productId === productId && (item.color ?? undefined) === color
        );
        if (match) {
          attachServerId(key, match.id);
        }
      })().catch(() => undefined);
    }
  }

  const accessibleLabel = added ? `${product.name} added to cart` : ariaLabel;

  return (
    <Button
      aria-label={accessibleLabel}
      className={className}
      onClick={handleAdd}
      size={size}
      type="button"
    >
      {added ? (
        <Check aria-hidden="true" size={18} />
      ) : (
        <ShoppingBag aria-hidden="true" size={18} />
      )}
      {added ? "Added" : label}
    </Button>
  );
}
