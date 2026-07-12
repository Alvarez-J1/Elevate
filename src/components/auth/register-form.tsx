"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/components/store/cart-store";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { clearPendingCartAction, readPendingCartAction } from "@/lib/pending-cart-action";
import { sanitizeReturnTo, withReturnTo } from "@/lib/return-to";

export function RegisterForm({ returnTo }: { returnTo?: string }) {
  const router = useRouter();
  const { register } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const safeReturnTo = sanitizeReturnTo(returnTo);
  const showCartHint = Boolean(returnTo);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await register({
        firstName: String(form.get("firstName") ?? ""),
        lastName: String(form.get("lastName") ?? ""),
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? "")
      });

      // Same "complete the pending add-to-cart, then return" behavior as
      // regular sign-in — see LoginForm.completeReturnAfterAuth for why the
      // returnTo values are compared before auto-adding.
      const pending = readPendingCartAction();
      if (pending && sanitizeReturnTo(pending.returnTo) === safeReturnTo) {
        addItem(pending.product, pending.quantity, pending.color);
      }
      clearPendingCartAction();

      router.push(safeReturnTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong creating your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="mx-auto w-full max-w-[28rem] rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft sm:p-8"
      onSubmit={handleSubmit}
    >
      {showCartHint ? (
        <p className="mb-5 text-center text-sm text-silver">
          Create an account to add items to your cart.
        </p>
      ) : null}

      {error ? (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertCircle className="mt-0.5 flex-none" size={16} />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" htmlFor="register-first-name">
          <span className="mb-2 block text-sm text-silver">First name</span>
          <input
            autoComplete="given-name"
            className="input-shell h-12 px-4"
            id="register-first-name"
            name="firstName"
            required
          />
        </label>

        <label className="block" htmlFor="register-last-name">
          <span className="mb-2 block text-sm text-silver">Last name</span>
          <input
            autoComplete="family-name"
            className="input-shell h-12 px-4"
            id="register-last-name"
            name="lastName"
            required
          />
        </label>

        <label className="block sm:col-span-2" htmlFor="register-email">
          <span className="mb-2 block text-sm text-silver">Email Address</span>
          <input
            autoComplete="email"
            className="input-shell h-12 px-4"
            id="register-email"
            name="email"
            required
            type="email"
          />
        </label>

        <label className="block sm:col-span-2" htmlFor="register-password">
          <span className="mb-2 block text-sm text-silver">Password</span>
          <input
            autoComplete="new-password"
            className="input-shell h-12 px-4"
            id="register-password"
            minLength={8}
            name="password"
            required
            type="password"
          />
          <span className="mt-2 block text-xs text-muted">At least 8 characters.</span>
        </label>
      </div>

      <Button className="mt-7 w-full" disabled={isSubmitting} size="lg" type="submit">
        <UserPlus aria-hidden="true" size={18} />
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="mt-6 text-left text-sm text-silver">
        Already have an account?{" "}
        <Link
          className="font-medium text-platinum hover:underline"
          href={withReturnTo("/login", returnTo)}
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
