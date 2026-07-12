import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
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
    "Learn about Elevate’s demo return window, refund process, exchanges, and return eligibility."
};

const wideContainerClassName =
  "min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16";

const returnHighlights = [
  {
    title: "30-Day Return Window",
    icon: RotateCcw,
    details: ["Demo purchases may be returned within 30 days of the delivery date."]
  },
  {
    title: "Easy Return Process",
    icon: ClipboardList,
    details: [
      "Customers would start a return from their account or by contacting support."
    ]
  },
  {
    title: "Refund Tracking",
    icon: PackageSearch,
    details: [
      "Return status and refund progress would appear in the customer account."
    ]
  }
];

const eligibilityInformation = [
  {
    title: "Eligible items",
    icon: CheckCircle2,
    description:
      "Products must be unused, undamaged, and returned with their original packaging and included accessories."
  },
  {
    title: "Non-returnable items",
    icon: XCircle,
    description:
      "Personalized products, digital goods, and final-sale items would not be eligible."
  },
  {
    title: "Return shipping",
    icon: Truck,
    description:
      "For this demo policy, prepaid return labels would be available for eligible domestic returns."
  },
  {
    title: "Original shipping charges",
    icon: Banknote,
    description: "Original express shipping fees would not be refundable."
  }
];

const refundExchangeBlocks = [
  {
    title: "Refunds",
    icon: Banknote,
    details: [
      "Refunds would be issued to the original payment method.",
      "Processing would begin after the returned item is inspected.",
      "Estimated refund timeline: 5–10 business days after approval."
    ]
  },
  {
    title: "Exchanges",
    icon: Repeat,
    details: [
      "Eligible products could be exchanged for another finish or model, subject to availability.",
      "Price differences would be calculated during the exchange process."
    ]
  }
];

const returnSteps = [
  {
    step: "1",
    title: "Start a return",
    description: "Open the order in the customer account and select the item."
  },
  {
    step: "2",
    title: "Receive instructions",
    description:
      "A return label and packaging instructions would be provided."
  },
  {
    step: "3",
    title: "Send the item",
    description: "Drop the package off with the listed carrier."
  },
  {
    step: "4",
    title: "Track the resolution",
    description:
      "View inspection, refund, or exchange status from the account page."
  }
];

const returnFaqs = [
  {
    question: "How long do I have to return an item?",
    answer:
      "In this demo experience, items may be returned within 30 days of the delivery date shown on the order."
  },
  {
    question: "What condition must the product be in?",
    answer:
      "Items must be unused, undamaged, and returned with their original packaging and any included accessories to be considered eligible."
  },
  {
    question: "Are return shipping costs covered?",
    answer:
      "For this demo policy, prepaid return labels would be available for eligible domestic returns. Original express shipping fees would not be refundable."
  },
  {
    question: "How long do refunds take?",
    answer:
      "Refunds would be issued to the original payment method after the returned item is inspected, with an estimated timeline of 5–10 business days after approval."
  },
  {
    question: "Can I exchange an item instead of returning it?",
    answer:
      "Eligible products could be exchanged for another finish or model, subject to availability. Any price difference would be calculated during the exchange process."
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "A production storefront would offer an expedited resolution path for damaged deliveries. This demo does not process real shipments or claims."
  },
  {
    question: "Can I return a gift?",
    answer:
      "A gift return would typically be looked up using the order or gift receipt and could result in store credit rather than a refund to the original purchaser."
  },
  {
    question: "Do you accept international returns?",
    answer:
      "For demonstration purposes, this policy covers domestic returns only. International return handling would vary by region in a production experience."
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
                Elevate is a portfolio demonstration store. The return policy
                below illustrates how a production ecommerce experience could
                explain eligibility, refund timing, and exchanges.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/60">
                <CircleAlert aria-hidden="true" size={16} strokeWidth={1.7} />
                <span>Demo policy — no real returns or refunds are processed.</span>
              </div>
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
              title="Returns presented with clarity."
              description="Illustrative timelines and steps show how customers could manage a return before it reaches your door twice."
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
              description="A concise overview of the eligibility and shipping policies represented in this portfolio storefront."
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
              title="How resolutions are handled."
              description="Refund timing and exchange terms are shown the way a production storefront could present them to customers."
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
              title="Four steps from request to resolution."
              description="A simple flow illustrates how a return could move from the customer account to a completed refund or exchange."
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
              description="These answers demonstrate the policy language a production storefront could provide."
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
                Explore the collection or contact the demo support team for
                policy questions.
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
                  Continue shopping
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
