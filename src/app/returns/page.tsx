import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Headset,
  PackageSearch,
  Repeat,
  RotateCcw,
  ShoppingCart,
  Truck,
  XCircle
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionDivider } from "@/components/home/section-divider";
import { buttonClassName } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card-title";
import { Container } from "@/components/ui/container";
import { PageTitle } from "@/components/ui/page-title";
import { SectionHeader, sectionTitleClassName } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Returns | Elevate",
  description:
    "Review Elevate’s return policy, refund timelines, exchange options, and return eligibility."
};

const wideContainerClassName =
  "min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16";

const returnHighlights = [
  {
    title: "30-Day Return Window",
    icon: RotateCcw,
    details: ["Eligible items can be returned within 30 days of delivery."]
  },
  {
    title: "Easy Return Process",
    icon: ClipboardList,
    details: [
      "Start a return from your account or contact our support team."
    ]
  },
  {
    title: "Refund Tracking",
    icon: PackageSearch,
    details: [
      "Check your return status and refund progress from your account."
    ]
  }
];

const eligibilityInformation = [
  {
    title: "Eligible items",
    icon: CheckCircle2,
    description:
      "Items must be unused, undamaged, and returned with their original packaging and accessories."
  },
  {
    title: "Non-returnable items",
    icon: XCircle,
    description:
      "Personalized products, digital goods, and final-sale items cannot be returned."
  },
  {
    title: "Return shipping",
    icon: Truck,
    description:
      "Prepaid return labels are available for eligible domestic returns."
  },
  {
    title: "Original shipping charges",
    icon: Banknote,
    description: "Original express shipping fees are nonrefundable."
  }
];

const refundExchangeBlocks = [
  {
    title: "Refunds",
    icon: Banknote,
    details: [
      "Refunds are issued to the original payment method.",
      "Refund processing begins after the returned item is inspected.",
      "Refunds typically appear within 5–10 business days after approval."
    ]
  },
  {
    title: "Exchanges",
    icon: Repeat,
    details: [
      "Eligible items may be exchanged for another color or model, subject to availability.",
      "Any price difference will be calculated during the exchange."
    ]
  }
];

const returnSteps = [
  {
    step: "1",
    title: "Start a return",
    description: "Open the order in your account and select the item you want to return."
  },
  {
    step: "2",
    title: "Receive instructions",
    description:
      "We’ll provide a return label and packing instructions."
  },
  {
    step: "3",
    title: "Send the item",
    description: "Drop off the package with the listed carrier."
  },
  {
    step: "4",
    title: "Track the resolution",
    description:
      "Track your inspection, refund, or exchange from your account."
  }
];

const returnFaqs = [
  {
    question: "How long do I have to return an item?",
    answer:
      "Eligible items can be returned within 30 days of delivery."
  },
  {
    question: "What condition must the product be in?",
    answer:
      "Items must be unused, undamaged, and returned with their original packaging and included accessories."
  },
  {
    question: "Are return shipping costs covered?",
    answer:
      "Prepaid return labels are available for eligible domestic returns. Original express shipping fees are nonrefundable."
  },
  {
    question: "How long do refunds take?",
    answer:
      "After your return is inspected and approved, the refund will be issued to your original payment method within 5–10 business days."
  },
  {
    question: "Can I exchange an item instead of returning it?",
    answer:
      "Yes. Eligible items may be exchanged for another color or model, subject to availability. Any price difference will be applied during the exchange."
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "Contact support as soon as possible and include photos of the damaged item and packaging. We’ll help you find the best resolution."
  },
  {
    question: "Can I return a gift?",
    answer:
      "Yes. Gift returns may be located using the order number or gift receipt and are generally refunded as store credit."
  },
  {
    question: "Do you accept international returns?",
    answer:
      "This return policy currently applies only to orders shipped within the contiguous United States."
  }
];

export default function ReturnsPage() {
  return (
    <>
      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
                Returns
              </p>
              <PageTitle>Simple returns, handled with care.</PageTitle>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-silver sm:text-xl">
                Review our return policy, refund timelines, and exchange
                options.
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
              eyebrow="Return highlights"
              title="Returns made simple."
              description="Find clear timelines, eligibility requirements, and step-by-step return instructions."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-5 md:grid-cols-3 lg:gap-6">
            {returnHighlights.map((highlight, index) => (
              <FadeIn delay={index * 0.05} key={highlight.title}>
                <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                    <highlight.icon aria-hidden="true" size={25} strokeWidth={1.7} />
                  </div>
                  <CardTitle>{highlight.title}</CardTitle>
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-white/70">
                    {highlight.details.map((detail) => (
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
              eyebrow="Return eligibility"
              title="What qualifies for a return."
              description="Review the basic requirements for returning an item."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-4 md:grid-cols-2 lg:gap-5">
            {eligibilityInformation.map((item, index) => (
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
              eyebrow="Refunds & exchanges"
              title="Refunds and exchanges."
              description="Learn how refunds are issued and when exchanges are available."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-5 md:grid-cols-2 lg:gap-6">
            {refundExchangeBlocks.map((block, index) => (
              <FadeIn delay={index * 0.05} key={block.title}>
                <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                    <block.icon aria-hidden="true" size={25} strokeWidth={1.7} />
                  </div>
                  <CardTitle>{block.title}</CardTitle>
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-white/70">
                    {block.details.map((detail) => (
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
              eyebrow="Return process"
              title="Return an item in four steps."
              description="Follow these steps to complete your return or exchange."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <ol className="home-section-content-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {returnSteps.map((item, index) => (
              <FadeIn delay={index * 0.05} key={item.step}>
                <li className="group relative h-full rounded-lg border border-white/10 bg-white/[0.03] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-7">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-base font-semibold text-platinum transition duration-300 ease-out group-hover:border-white/25 group-hover:bg-white/[0.1]"
                  >
                    {item.step}
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-platinum">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-base leading-7 text-white/70">
                    {item.description}
                  </p>
                  {index < returnSteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-11 hidden h-px w-4 translate-x-full bg-white/15 lg:block"
                    />
                  ) : null}
                </li>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      <SectionDivider />

      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Returns FAQ"
              title="Common return questions."
              description="Find answers to common questions about returns, refunds, and exchanges."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid max-w-4xl gap-3">
            {returnFaqs.map((faq, index) => (
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
                Need help with a return?
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Contact our support team for help with a return or refund.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link className={buttonClassName({ size: "lg" })} href="/contact">
                  <Headset aria-hidden="true" size={18} />
                  Contact support
                </Link>
                <Link
                  className={buttonClassName({ variant: "secondary", size: "lg" })}
                  href="/shop"
                >
                  <ShoppingCart aria-hidden="true" size={18} />
                  Shop products
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
