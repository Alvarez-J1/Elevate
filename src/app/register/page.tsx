import { RegisterForm } from "@/components/auth/register-form";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Create Account | Elevate"
};

export default async function RegisterPage({
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
              Create your account.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-silver">
              Save your cart across devices and keep a history of your orders.
            </p>
          </div>
          <RegisterForm returnTo={returnTo} />
        </div>
      </Container>
    </div>
  );
}
