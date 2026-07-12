import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Sign In | Elevate"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { returnTo } = await searchParams;

  return (
    <div className="pb-16 pt-14 sm:pb-20">
      <Container>
        <div className="mx-auto max-w-[34rem]">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
              Account
            </p>
            <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
              Welcome back.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-silver">
              Sign in to sync your cart across devices and track your orders.
            </p>
          </div>
          <LoginForm returnTo={returnTo} />
        </div>
      </Container>
    </div>
  );
}
