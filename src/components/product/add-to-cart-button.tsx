

"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { Button, type ButtonSize } from "@/components/ui/button";
import { useCartStore } from "../store/cart-store";
import type { Product } from "@/types/product";

export function AddToCartButton({
  product,
  quantity = 1,
  color,
  label = "Add to cart",
  size = "md", //size = "md" means the size of the button is medium.
  className
}: {
  product: Product; //product: Product means the product prop is a Product object.
  quantity?: number;
  color?: string;
  label?: string;
  size?: ButtonSize;
  className?: string;
}) {
  //useCartStore is a hook that returns the addItem action from the cart store.
  //state.addItem is the addItem action from the cart store.
  const addItem = useCartStore((state) => state.addItem);  
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) {
      return; //if the added state is false, return.
    }

    const timeout = window.setTimeout(() => setAdded(false), 1400); //1400ms means 1.4 seconds.
    return () => window.clearTimeout(timeout); //clearTimeout is a function that clears the timeout.
  }, [added]); //[added] means the effect will run when the added state changes.

  return (
    <Button
      className={className}
      onClick={() => {
        // Add this product to the cart, then briefly show the "Added" state.
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
