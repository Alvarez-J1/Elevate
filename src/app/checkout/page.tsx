import { CheckoutExperience } from "@/components/checkout/checkout-experience";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Checkout | Elevate"
};

export default function CheckoutPage() {
  return (
    <div className="pb-24 pt-14">
      <Container>
        <div className="mb-10 max-w-3xl">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.28em] text-glacier">
            Checkout
          </p> */}
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
          Checkout
          </h1>
          <p className="mt-5 text-base leading-7 text-silver">
            Enter your shipping and payment details to review the checkout experience.
          </p>
        </div>
        <CheckoutExperience />
      </Container>
    </div>
  );
}
