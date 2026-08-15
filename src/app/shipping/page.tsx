import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  PackageCheck,
  PencilLine,
  ShoppingCart,
  Truck,
  Zap
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionDivider } from "@/components/home/section-divider";
import { buttonClassName } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card-title";
import { Container } from "@/components/ui/container";
import { PageTitle } from "@/components/ui/page-title";
import { SectionHeader, sectionTitleClassName } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Shipping | Elevate",
  description:
    "Find Elevate shipping options, estimated delivery times, and tracking information."
};

const wideContainerClassName =
  "min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16";

const shippingBenefits = [
  {
    title: "Free Standard Shipping",
    icon: Truck,
    details: [
      "Free on orders over $100",
      "Estimated delivery: 3–5 business days"
    ]
  },
  {
    title: "Express Shipping",
    icon: Zap,
    details: [
      "$18 flat-rate shipping",
      "Estimated delivery: 1–2 business days"
    ]
  },
  {
    title: "Order Tracking",
    icon: PackageCheck,
    details: [
      "Track your order from your account or shipping confirmation email."
    ]
  }
];

const deliveryInformation = [
  {
    title: "Processing time",
    icon: Clock3,
    description:
      "Orders are typically processed within one business day."
  },
  {
    title: "Delivery estimates",
    icon: CalendarDays,
    description:
      "Delivery estimates begin after your order is processed and do not include weekends or holidays."
  },
  {
    title: "Shipping regions",
    icon: MapPin,
    description:
      "We currently ship within the contiguous United States."
  },
  {
    title: "Address changes",
    icon: PencilLine,
    description:
      "You can request an address change before your order begins processing."
  }
];

const shippingFaqs = [
  {
    question: "When will my order ship?",
    answer:
      "Orders placed on business days are typically processed within 24 hours. You’ll receive a confirmation when your order is on its way."
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you’ll find the tracking number in your account and shipping confirmation email."
  },
  {
    question: "Do you offer expedited shipping?",
    answer:
      "Yes. Express Shipping costs $18 and usually arrives within 1–2 business days after processing."
  },
  {
    question: "Can I change my shipping address?",
    answer:
      "You can request an address change before your order begins processing. After that, changes may not be possible."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Not at this time. We currently ship only within the contiguous United States."
  },
  {
    question: "What happens if a package is delayed?",
    answer:
      "Check your tracking information for the latest delivery estimate. Contact support if your package has not arrived after the expected date."
  }
];

export default function ShippingPage() {
  return (
    <>
      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
                Shipping
              </p>
              <PageTitle>Fast, reliable shipping.</PageTitle>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-silver sm:text-xl">
                Find shipping options, estimated delivery times, and tracking
                information.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider />

      <section aria-labelledby="shipping-benefits-heading" className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Shipping benefits"
              titleId="shipping-benefits-heading"
              title="Choose the shipping option that fits you."
              description="Compare delivery options and estimated arrival times before checkout."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-5 md:grid-cols-3 lg:gap-6">
            {shippingBenefits.map((benefit, index) => (
              <FadeIn delay={index * 0.05} key={benefit.title}>
                <article
                  className="group touch-card touch-card-lift touch-card-border-25 touch-card-surface-6 h-full rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] active:-translate-y-1 active:border-white/25 active:bg-white/[0.06] md:p-8"
                  data-touch-card
                >
                  <div className="touch-card-icon-glow flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)] group-active:bg-glacier/18 group-active:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                    <benefit.icon aria-hidden="true" size={25} strokeWidth={1.7} />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-white/70">
                    {benefit.details.map((detail) => (
                      <li className="flex gap-3" key={detail}>
                        <span
                          aria-hidden="true"
                          className="mt-[0.7rem] h-1 w-1 flex-none rounded-full bg-white/35"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Delivery information"
              title="Important delivery information."
              description="Here’s what to know about processing, delivery, and address changes."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-4 md:grid-cols-2 lg:gap-5">
            {deliveryInformation.map((item, index) => (
              <FadeIn delay={index * 0.04} key={item.title}>
                <article
                  className="group touch-card touch-card-lift touch-card-border-20 touch-card-surface-5 flex h-full gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] active:-translate-y-1 active:border-white/20 active:bg-white/[0.05] sm:p-7"
                  data-touch-card
                >
                  <div className="touch-card-icon-glow flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)] group-active:bg-glacier/18 group-active:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                    <item.icon aria-hidden="true" size={21} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-platinum">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-base leading-7 text-white/70">
                      {item.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section aria-labelledby="shipping-faq-heading" className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Shipping FAQ"
              titleId="shipping-faq-heading"
              title="Common delivery questions."
              description="Find answers to common questions about shipping and delivery."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid max-w-4xl gap-3">
            {shippingFaqs.map((faq, index) => (
              <FadeIn delay={index * 0.035} key={faq.question}>
                <details className="group rounded-lg border border-white/10 bg-white/[0.035] transition-colors duration-200 open:bg-white/[0.05]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left text-lg font-semibold text-platinum outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-glacier/70 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className="flex-none text-white/50 transition-transform duration-200 group-open:rotate-180"
                      size={20}
                    />
                  </summary>
                  <p className="px-5 pb-5 pr-14 text-base leading-7 text-white/70 sm:px-6 sm:pb-6 sm:pr-16">
                    {faq.answer}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className={sectionTitleClassName()}>
                Ready to shop?
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Browse the latest products or return to your cart.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link className={buttonClassName({ size: "lg" })} href="/shop">
                  Shop now
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link
                  className={buttonClassName({ variant: "secondary", size: "lg" })}
                  href="/cart"
                >
                  <ShoppingCart aria-hidden="true" size={18} />
                  View cart
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider />
    </>
  );
}
