"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useCartStore } from "@/components/store/cart-store";
import { useAuth } from "@/lib/auth-context";
import { storePendingCartAction } from "@/lib/pending-cart-action";
import { sanitizeReturnTo } from "@/lib/return-to";
import type { Product } from "@/types/product";

export type GuardedAddResult = "added" | "redirected";

/**
 * Single source of truth for the "must be signed in to add to cart" rule.
 * Every add-to-cart entry point (product cards, product detail, featured
 * sections, related products, quick-add, ...) renders through
 * AddToCartButton, and AddToCartButton calls this hook — so the auth check
 * and redirect/preservation logic live in exactly one place instead of
 * being duplicated per component.
 */
export function useGuardedAddToCart() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const addItem = useCartStore((state) => state.addItem);

  return useCallback(
    (product: Product, quantity = 1, color?: string): GuardedAddResult => {
      if (isAuthenticated) {
        addItem(product, quantity, color);
        return "added";
      }

      // Signed out: don't touch the cart. Remember exactly what they meant
      // to add (product, quantity, color/variant) plus the page they were
      // on, then send them to sign in.
      const currentPath =
        typeof window === "undefined"
          ? "/"
          : `${window.location.pathname}${window.location.search}`;
      const returnTo = sanitizeReturnTo(currentPath);

      storePendingCartAction({ product, quantity, color, returnTo });
      router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
      return "redirected";
    },
    [addItem, isAuthenticated, router]
  );
}
