"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/types/product";
import { clamp } from "@/lib/utils";

export type CartItem = {
  key: string;
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  accent: string;
};

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
  addItem: (product: Product, quantity?: number, color?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  setHasHydrated: (value: boolean) => void;
};

function createCartKey(productId: string, color?: string): string {
  return `${productId}:${color ?? "default"}`;
}

function productToCartItem(
  product: Product,
  quantity: number,
  color?: string
): CartItem {
  return {
    key: createCartKey(product.id, color),
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.images[0],
    price: product.price,
    quantity,
    color,
    accent: product.accent
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      addItem: (product, quantity = 1, color) => {
        const key = createCartKey(product.id, color);

        set((state) => {
          const existing = state.items.find((item) => item.key === key);

          if (!existing) {
            return {
              items: [
                ...state.items,
                productToCartItem(product, clamp(quantity, 1, 99), color)
              ]
            };
          }

          return {
            items: state.items.map((item) =>
              item.key === key
                ? {
                    ...item,
                    quantity: clamp(item.quantity + quantity, 1, 99)
                  }
                : item
            )
          };
        });
      },
      updateQuantity: (key, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: clamp(quantity, 1, 99) }
              : item
          )
        }));
      },
      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((item) => item.key !== key)
        }));
      },
      clearCart: () => set({ items: [] }),
      setHasHydrated: (value) => set({ hasHydrated: value })
    }),
    {
      name: "premium-ecommerce-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
