import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Sign In | Elevate"
};

export default function LoginPage() {
  return (
    <div className="pb-24 pt-14">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
            Account
          </p>
          <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-5 text-base leading-7 text-silver">
            Sign in to sync your cart across devices and track your orders.
          </p>
        </div>
        <LoginForm />
      </Container>
    </div>
  );
}
