import { AccountExperience } from "@/components/auth/account-experience";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Your Account | Elevate"
};

export default function AccountPage() {
  return (
    <div className="pb-24 pt-14">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
            Account
          </p>
          <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
            Your account.
          </h1>
        </div>
        <AccountExperience />
      </Container>
    </div>
  );
}
