"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, LogIn } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/components/store/cart-store";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { clearPendingCartAction, readPendingCartAction } from "@/lib/pending-cart-action";
import { sanitizeReturnTo, withReturnTo } from "@/lib/return-to";

export function LoginForm({ returnTo }: { returnTo?: string }) {
  const router = useRouter();
  const { login } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const safeReturnTo = sanitizeReturnTo(returnTo);
  // Only shown when we actually got here via a cart-related redirect (add
  // to cart, the cart page, or the cart icon) — a plain "Sign in" from the
  // navbar carries no returnTo, so this stays quiet there.
  const showCartHint = Boolean(returnTo);

  /**
   * After a successful sign-in (regular or demo), send the visitor back to
   * where they came from. If they were redirected here because of a
   * specific add-to-cart click, complete that action now so it doesn't
   * require them to re-select anything — but only when the pending action's
   * own returnTo still matches this page's returnTo, so a stale action left
   * over from an abandoned flow never silently reappears in a later cart.
   */
  function completeReturnAfterAuth() {
    const pending = readPendingCartAction();
    if (pending && sanitizeReturnTo(pending.returnTo) === safeReturnTo) {
      addItem(pending.product, pending.quantity, pending.color);
    }
    clearPendingCartAction();

    router.push(safeReturnTo);
    router.refresh();
  }

  async function handleDemoLogin() {
    if (isDemoSubmitting) {
      return;
    }

    setError(null);
    setIsDemoSubmitting(true);

    try {
      await login("demo@elevate.dev", "Password123!");
      completeReturnAfterAuth();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong opening the demo. Please try again."
      );
    } finally {
      setIsDemoSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await login(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
      completeReturnAfterAuth();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong signing in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      {showCartHint ? (
        <p className="mb-6 w-full max-w-[28rem] text-center text-sm text-silver">
          Sign in to add items to your cart.
        </p>
      ) : null}

      <section
        aria-labelledby="demo-login-heading"
        className="login-demo-enter mb-8 w-full max-w-[28rem] rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
          Demo access
        </p>
        <h2
          className="mt-eyebrow-heading text-lg font-semibold text-platinum"
          id="demo-login-heading"
        >
          Explore Elevate
        </h2>
        <p className="mt-3 text-sm leading-6 text-silver">
          Browse products, build a cart, and explore the account experience without
          creating an account.
        </p>
        <Button
          aria-busy={isDemoSubmitting}
          className="mt-6 w-full"
          disabled={isDemoSubmitting}
          onClick={handleDemoLogin}
          size="lg"
          type="button"
        >
          Enter demo store
          <ArrowRight aria-hidden="true" size={18} />
        </Button>
      </section>

      <div className="mb-8 flex w-full max-w-[28rem] items-center gap-4 text-xs uppercase tracking-[0.16em] text-muted">
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        <span>or sign in</span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
      </div>

      <form
        aria-label="Sign in form"
        className="w-full max-w-[28rem] rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft sm:p-8"
        onSubmit={handleSubmit}
      >
        {error ? (
          <div
            className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
            role="alert"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 flex-none" size={16} />
            <p>{error}</p>
          </div>
        ) : null}

        <div className="grid gap-5">
          <label className="block" htmlFor="login-email">
            <span className="mb-2 block text-sm text-silver">Email address</span>
            <input
              autoComplete="email"
              className="input-shell h-12 px-4"
              id="login-email"
              name="email"
              required
              type="email"
            />
          </label>

          <label className="block" htmlFor="login-password">
            <span className="mb-2 block text-sm text-silver">Password</span>
            <input
              autoComplete="current-password"
              className="input-shell h-12 px-4"
              id="login-password"
              name="password"
              required
              type="password"
            />
          </label>
        </div>

        <Button className="mt-7 w-full" disabled={isSubmitting} size="lg" type="submit">
          <LogIn aria-hidden="true" size={18} />
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <p className="mt-6 text-left text-sm text-silver">
          New to Elevate?{" "}
          <Link
            className="font-medium text-platinum hover:underline"
            href={withReturnTo("/register", returnTo)}
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
