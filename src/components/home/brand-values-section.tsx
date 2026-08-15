import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ValueCardGrid } from "@/components/home/value-card-grid";

const values = [
  {
    title: "Designed for Everyday Use",
    description:
      "Thoughtfully selected products that balance performance, simplicity, and long-term usability.",
    icon: Sparkles
  },
  {
    title: "Curated Premium Quality",
    description:
      "Every item is chosen for durability, craftsmanship, and reliable everyday performance.",
    icon: ShieldCheck
  },
  {
    title: "Fast, Reliable Delivery",
    description:
      "Secure checkout, fast nationwide shipping, and hassle-free returns on every order.",
    icon: Truck
  },
  {
    title: "Built for everyday use",
    description:
      "Thoughtful details, dependable performance, and intuitive design make each product easy to use every day.",
    icon: CheckCircle2
  }
];

export function BrandValuesSection() {
  return (
    <section aria-labelledby="brand-values-heading" className="home-section">
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Our Philosophy"
            titleId="brand-values-heading"
            title="Technology chosen with purpose."
            description="Every product in the Elevate collection is carefully selected for exceptional design, lasting quality, and everyday usefulness."
            descriptionClassName="text-lg"
          />
        </FadeIn>

        <ValueCardGrid items={values} />
      </Container>
    </section>
  );
}
