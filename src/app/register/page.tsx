import { RegisterForm } from "@/components/auth/register-form";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Create Account | Elevate"
};

export default function RegisterPage() {
  return (
    <div className="pb-24 pt-14">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
            Account
          </p>
          <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
            Create your account.
          </h1>
          <p className="mt-5 text-base leading-7 text-silver">
            Save your cart across devices and keep a history of your orders.
          </p>
        </div>
        <RegisterForm />
      </Container>
    </div>
  );
}
