import { AccountExperience } from "@/components/auth/account-experience";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Your Account | Elevate"
};

export default function AccountPage() {
  return (
    <div className="pb-16 pt-12 sm:pb-20 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-[70rem]">
          <div className="mb-6 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
              Account
            </p>
            <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum">
              Your account.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-silver">
              Manage your profile, orders, reviews, and recent activity.
            </p>
          </div>
          <AccountExperience />
        </div>
      </Container>
    </div>
  );
}
