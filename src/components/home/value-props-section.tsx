import { RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

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
    <section className="home-section">
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Why Elevate"
            title="Why shop Elevate?"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="home-section-content-gap text-lg leading-7 text-muted">
            <p className="font-semibold text-platinum">
              <span className="text-[#F7C85B]">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </span>{" "}
              Trusted by tech enthusiasts
            </p>
            <p className="mt-2">
              Fast shipping &bull; Secure checkout &bull; 30-day returns
            </p>
          </div>
        </FadeIn>

        <div className="home-section-content-gap mx-auto grid max-w-[calc(100%-7rem)] gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {valueProps.map((item, index) => (
            <FadeIn delay={index * 0.05} key={item.title}>
              <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                  <item.icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-platinum md:mt-7">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-silver md:mt-3">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
