"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  addServerCartItem,
  ApiError,
  fetchServerCart,
  login as apiLogin,
  registerAccount as apiRegister,
  type ApiUser
} from "@/lib/api";
import { useCartStore } from "@/components/store/cart-store";

const STORAGE_KEY = "elevate-auth";

type StoredAuth = {
  token: string;
  user: ApiUser;
};

type AuthContextValue = {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredAuth(): StoredAuth | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredAuth | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedAuth = readStoredAuth();
    setState(storedAuth);
    setIsReady(true);

    if (storedAuth?.token) {
      fetchServerCart(storedAuth.token)
        .then((cart) => useCartStore.getState().replaceWithServerCart(cart.items))
        .catch((error) => {
          if (error instanceof ApiError && error.status === 401) {
            window.localStorage.removeItem(STORAGE_KEY);
            setState(null);
            useCartStore.getState().clearCart();
          }
        });
    }
  }, []);

  const persist = useCallback((next: StoredAuth | null) => {
    setState(next);
    if (typeof window === "undefined") {
      return;
    }
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /**
   * Merges whatever the visitor already had in their local (guest) cart into
   * their account's server-side cart, then replaces the local cart with the
   * merged server state so it stays the single source of truth going forward.
   */
  const syncCartOnAuth = useCallback(async (token: string) => {
    try {
      const localItems = useCartStore
        .getState()
        .items.filter((item) => !item.serverItemId);

      for (const item of localItems) {
        const productId = Number(item.id);
        if (!Number.isInteger(productId)) {
          throw new Error("Guest cart item does not map to a server product id");
        }

        const cart = await addServerCartItem(token, {
          productId,
          quantity: item.quantity,
          color: item.color
        });
        const match = cart.items.find(
          (serverItem) =>
            serverItem.productId === productId &&
            (serverItem.color ?? undefined) === item.color
        );
        if (match) {
          useCartStore.getState().attachServerId(item.key, match.id);
        }
      }

      const serverCart = await fetchServerCart(token);
      useCartStore.getState().replaceWithServerCart(serverCart.items);
    } catch {
      // Best-effort sync only — a logged-in visitor should never be blocked
      // from shopping just because the cart merge failed.
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await apiLogin({ email, password });
      persist({ token: response.accessToken, user: response.user });
      await syncCartOnAuth(response.accessToken);
    },
    [persist, syncCartOnAuth]
  );

  const register = useCallback(
    async (input: { firstName: string; lastName: string; email: string; password: string }) => {
      const response = await apiRegister(input);
      persist({ token: response.accessToken, user: response.user });
      await syncCartOnAuth(response.accessToken);
    },
    [persist, syncCartOnAuth]
  );

  const logout = useCallback(() => {
    persist(null);
    useCartStore.getState().clearCart();
  }, [persist]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state?.user ?? null,
      token: state?.token ?? null,
      isAuthenticated: Boolean(state?.token),
      isReady,
      login,
      register,
      logout
    }),
    [state, isReady, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
