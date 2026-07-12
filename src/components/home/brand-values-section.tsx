import { ShieldCheck, Sparkles, Truck } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

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
  }
];

export function BrandValuesSection() {
  return (
    <section className="home-section">
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Our Philosophy"
            title="Technology chosen with purpose."
            description="Every product in the Elevate collection is carefully selected for exceptional design, lasting quality, and everyday usefulness."
            descriptionClassName="text-lg"
          />
        </FadeIn>

        <div className="home-section-content-gap grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 min-[1600px]:gap-7">
          {values.map((value, index) => (
            <FadeIn delay={index * 0.05} key={value.title}>
              <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] px-7 py-12 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:px-9 md:py-14">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/[0.16] bg-white/[0.012] text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                  <value.icon size={30} strokeWidth={1.55} />
                </div>

                <h3 className="mt-12 text-lg font-semibold leading-snug tracking-[-0.01em] text-platinum">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-silver">
                  {value.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
