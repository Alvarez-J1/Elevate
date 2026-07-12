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
    "Learn about Elevate’s demo shipping options, delivery estimates, and order tracking experience."
};

const wideContainerClassName =
  "min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16";

const shippingBenefits = [
  {
    title: "Free Standard Shipping",
    icon: Truck,
    details: [
      "Free shipping on orders over $100",
      "Estimated delivery: 3–5 business days"
    ]
  },
  {
    title: "Express Shipping",
    icon: Zap,
    details: [
      "Flat rate: $18",
      "Estimated delivery: 1–2 business days"
    ]
  },
  {
    title: "Order Tracking",
    icon: PackageCheck,
    details: [
      "Track your order from your account or confirmation email."
    ]
  }
];

const deliveryInformation = [
  {
    title: "Processing time",
    icon: Clock3,
    description:
      "Demo orders are shown as processing within 24 hours on business days."
  },
  {
    title: "Delivery estimates",
    icon: CalendarDays,
    description:
      "Estimates begin after processing and exclude weekends and holidays."
  },
  {
    title: "Shipping regions",
    icon: MapPin,
    description:
      "For demonstration purposes, delivery is shown within the contiguous United States only."
  },
  {
    title: "Address changes",
    icon: PencilLine,
    description:
      "Address updates would be allowed before an order enters fulfillment."
  }
];

const shippingFaqs = [
  {
    question: "When will my order ship?",
    answer:
      "In this demo experience, orders placed on business days are shown as entering processing within 24 hours. No physical order is created or shipped."
  },
  {
    question: "How can I track my order?",
    answer:
      "A production storefront would add a tracking number to the customer account and confirmation email after fulfillment. This demo does not generate live tracking events."
  },
  {
    question: "Do you offer expedited shipping?",
    answer:
      "The demo presents an Express Shipping option at a flat $18 rate with an estimated 1–2 business-day delivery window after processing."
  },
  {
    question: "Can I change my shipping address?",
    answer:
      "A customer could request an address update before an order enters fulfillment. Once fulfillment begins, changes would depend on the carrier workflow."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "No. For demonstration purposes, the storefront shows delivery within the contiguous United States only."
  },
  {
    question: "What happens if a package is delayed?",
    answer:
      "A production experience would surface the latest carrier estimate and provide a support path for prolonged delays. Elevate does not dispatch real packages."
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
              <PageTitle>Fast, reliable delivery for every order.</PageTitle>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-silver sm:text-xl">
                Learn about shipping options, delivery estimates, and order
                tracking.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider />

      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Shipping benefits"
              title="Choose the shipping option that fits you."
              description="View shipping options, estimated delivery times, and tracking information before placing your order."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-5 md:grid-cols-3 lg:gap-6">
            {shippingBenefits.map((benefit, index) => (
              <FadeIn delay={index * 0.05} key={benefit.title}>
                <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
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
              title="The details customers need before ordering."
              description="A concise overview of the processing and delivery policies represented in this portfolio storefront."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-4 md:grid-cols-2 lg:gap-5">
            {deliveryInformation.map((item, index) => (
              <FadeIn delay={index * 0.04} key={item.title}>
                <article className="group flex h-full gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-7">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
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

      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Shipping FAQ"
              title="Common delivery questions."
              description="These answers demonstrate the policy language a production storefront could provide."
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
                Ready to explore the collection?
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Browse the demo catalog or review the current cart experience.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link className={buttonClassName({ size: "lg" })} href="/shop">
                  Shop products
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
