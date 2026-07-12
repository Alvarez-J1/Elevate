"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ApiCartItem } from "@/lib/api";
import type { Product } from "@/types/product";
import { clamp } from "@/lib/utils";

const FALLBACK_ACCENT = "#7dd3fc";

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
  /**
   * Set once this line item is confirmed to exist in the signed-in user's
   * server-side cart (see /backend CartController). Guests, and items added
   * just before a background sync call resolves, won't have this yet.
   */
  serverItemId?: number;
};

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
  addItem: (product: Product, quantity?: number, color?: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  setHasHydrated: (value: boolean) => void;
  attachServerId: (key: string, serverItemId: number) => void;
  replaceWithServerCart: (serverItems: ApiCartItem[]) => void;
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

function serverItemToCartItem(item: ApiCartItem): CartItem {
  return {
    key: createCartKey(String(item.productId), item.color ?? undefined),
    id: String(item.productId),
    slug: item.productSlug,
    name: item.productName,
    category: "",
    image: item.productImage ?? "",
    price: item.unitPrice,
    quantity: item.quantity,
    color: item.color ?? undefined,
    accent: FALLBACK_ACCENT,
    serverItemId: item.id
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
      setHasHydrated: (value) => set({ hasHydrated: value }),
      attachServerId: (key, serverItemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, serverItemId } : item
          )
        }));
      },
      replaceWithServerCart: (serverItems) => {
        set({ items: serverItems.map(serverItemToCartItem) });
      }
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
