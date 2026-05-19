"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { Button, type ButtonSize } from "@/components/ui/button";
import { useCartStore } from "@/components/store/cart-store";
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
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [added]);

  return (
    <Button
      className={className}
      onClick={() => {
        addItem(product, quantity, color);
        setAdded(true);
      }}
      size={size}
      type="button"
    >
      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
      {added ? "Added" : label}
    </Button>
  );
}
