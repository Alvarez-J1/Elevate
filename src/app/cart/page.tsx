import { CartExperience } from "@/components/cart/cart-experience";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Cart | Elevate"
};

export default function CartPage() {
  return (
    <div className="pb-24 pt-14">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="#A7C7E7 text-sm font-semibold uppercase tracking-[0.28em]">
            Cart
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
            Review your selected pieces.
          </h1>
          <p className="mt-5 text-base leading-7 text-silver">
          Update quantities, remove items, and review your order before checkout.
          </p>
        </div>
        <CartExperience />
      </Container>
    </div>
  );
}
