"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { Button, type ButtonSize } from "@/components/ui/button";
import { useCartStore } from "@/components/store/cart-store";
import { addServerCartItem } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Product } from "@/types/product";

export function AddToCartButton({
  product,
  quantity = 1,
  color,
  label = "Add to cart",
  size = "md",
  className
}: {
  product: Product;
  quantity?: number;
  color?: string;
  label?: string;
  size?: ButtonSize;
  className?: string;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const attachServerId = useCartStore((state) => state.attachServerId);
  const { token, isAuthenticated } = useAuth();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [added]);

  function handleAdd() {
    addItem(product, quantity, color);
    setAdded(true);

    // Best-effort background sync to the signed-in user's server-side cart;
    // the local store above is already the source of truth for the UI, so a
    // failed/slow sync here never blocks the shopping experience.
    if (isAuthenticated && token) {
      const key = `${product.id}:${color ?? "default"}`;
      const productId = Number(product.id);

      addServerCartItem(token, { productId, quantity, color })
        .then((cart) => {
          const match = cart.items.find(
            (item) => item.productId === productId && (item.color ?? undefined) === color
          );
          if (match) {
            attachServerId(key, match.id);
          }
        })
        .catch(() => undefined);
    }
  }

  return (
    <Button className={className} onClick={handleAdd} size={size} type="button">
      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
      {added ? "Added" : label}
    </Button>
  );
}
