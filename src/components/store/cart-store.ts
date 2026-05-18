// This file creates a global shopping cart store using Zustand.

//  Features:
// - stores cart items
// - adds/removes/updates items
// - saves cart to localStorage
// - handles product variants like color
// - calculates subtotal and total item count

// 1. create<CartState>()
// create<CartState>()
// // Creates a global cart store.
// // Components can access/update cart state from anywhere.

// 2. persist
// persist(...)
// Saves cart data to localStorage
// so the cart remains after page refresh.


// 3. createCartKey
// return `${productId}:${color ?? "default"}`;
// Creates unique keys for product variants.
// Example:
// same product + different colors = different cart items.



// 4. addItem
// Checks if item already exists.
// If not → adds item.
// If yes → increases quantity.


// 5. updateQuantity/removeItem
// updateQuantity changes item quantity.
// removeItem removes item from cart.

// 6. reduce functions
// // reduce calculates:
// - cart subtotal
// - total item count



"use client";

import { create } from "zustand"; //zustand is a library that provides a way to manage state in a React application.
import { createJSONStorage, persist } from "zustand/middleware"; //createJSONStorage is a function that creates a JSON storage for the cart store. persist is a function that persists the cart store to the browser's local storage.

import type { Product } from "@/types/product";
import { clamp } from "@/lib/utils"; //clamp is a function that clamps a value between a minimum and maximum value.

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
  hasHydrated: boolean; //hasHydrated is a boolean that indicates if the cart store has been hydrated (loaded from the browser's local storage).
  addItem: (product: Product, quantity?: number, color?: string) => void; //void means the function does not return a value.
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  setHasHydrated: (value: boolean) => void;
};

// createCartKey generates a unique identifier for each cart item.
  // Useful for tracking items in React lists or distinguishing
  // products with different variants (size/color/etc).
  
function createCartKey(productId: string, color?: string): string { 
  // Creates a unique cart item key using the product ID and color.
// Example: "123:black"

// ?? is the nullish coalescing operator.
// If color is null or undefined, use "default" instead.
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
