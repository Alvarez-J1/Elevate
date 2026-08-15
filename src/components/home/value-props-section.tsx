import { RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ValueCardGrid } from "@/components/home/value-card-grid";

const valueProps = [
  {
    title: "Fast Shipping",
    description: "Fast nationwide shipping with tracking on every order.",
    icon: Truck
  },
  {
    title: "30-Day Returns",
    description: "Shop confidently with hassle-free 30-day returns.",
    icon: RotateCcw
  },
  {
    title: "Secure Checkout",
    description: "Encrypted checkout powered by secure payment processing.",
    icon: ShieldCheck
  },
  {
    title: "Curated Premium Tech",
    description:
      "Carefully selected premium technology built for work, creativity, and everyday life.",
    icon: Sparkles
  }
];

export function ValuePropsSection() {
  return (
    <section aria-labelledby="value-props-heading" className="home-section">
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Why Elevate"
            titleId="value-props-heading"
            title="Why shop Elevate?"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="home-section-content-gap text-lg leading-7 text-muted">
            <p className="font-semibold text-platinum">
              <span className="sr-only">Five-star rated. </span>
              <span aria-hidden="true" className="text-[#F7C85B]">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </span>{" "}
              Trusted by tech enthusiasts
            </p>
            <p className="mt-2">
              Fast shipping &bull; Secure checkout &bull; 30-day returns
            </p>
          </div>
        </FadeIn>

        <ValueCardGrid items={valueProps} />
      </Container>
    </section>
  );
}
