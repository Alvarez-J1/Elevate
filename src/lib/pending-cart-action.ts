"use client";

import type { Product } from "@/types/product";

const STORAGE_KEY = "elevate-pending-cart-action";

export type PendingCartAction = {
  product: Product;
  quantity: number;
  color?: string;
  returnTo: string;
};

/**
 * Remembers the add-to-cart a visitor tried to perform while signed out, so
 * it can be completed automatically once they authenticate. Uses
 * sessionStorage (not localStorage) so a stale action never survives past
 * the current browser tab/session and can't resurface in an unrelated
 * later sign-in.
 */
export function storePendingCartAction(action: PendingCartAction): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(action));
  } catch {
    // Storage can fail (private browsing, quota) — the redirect to /login
    // still happens, it just won't auto-complete the cart action.
  }
}

export function readPendingCartAction(): PendingCartAction | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PendingCartAction) : null;
  } catch {
    return null;
  }
}

export function clearPendingCartAction(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(STORAGE_KEY);
}
