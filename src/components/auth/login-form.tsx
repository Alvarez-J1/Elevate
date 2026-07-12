"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, LogIn } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      router.push("/");
      router.refresh();
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
    <form
      className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft sm:p-8"
      onSubmit={handleSubmit}
    >
      {error ? (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertCircle className="mt-0.5 flex-none" size={16} />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="grid gap-5">
        <label className="block" htmlFor="login-email">
          <span className="mb-2 block text-sm text-silver">Email Address</span>
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

      <p className="mt-6 text-center text-sm text-silver">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-platinum hover:underline" href="/register">
          Create one
        </Link>
      </p>

      <p className="mt-3 text-center text-xs text-muted">
        Demo account: demo@elevate.dev / Password123!
      </p>
    </form>
  );
}
