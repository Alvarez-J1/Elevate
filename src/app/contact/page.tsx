import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  Clock3,
  Headset,
  RotateCcw,
  ShoppingBag,
  ShoppingCart,
  Truck
} from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionDivider } from "@/components/home/section-divider";
import { buttonClassName } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card-title";
import { Container } from "@/components/ui/container";
import { PageTitle } from "@/components/ui/page-title";
import { SectionHeader, sectionTitleClassName } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Contact | Elevate",
  description:
    "Get in touch with the Elevate demo storefront. Learn about support, business hours, shipping, returns, and demo contact options."
};

const wideContainerClassName =
  "min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16";

const contactOptions = [
  {
    title: "Customer Support",
    icon: Headset,
    details: [
      "support@elevate-demo.com",
      "We typically respond within one business day."
    ]
  },
  {
    title: "Sales Inquiries",
    icon: Briefcase,
    details: [
      "sales@elevate-demo.com",
      "Get help choosing products or finding the right option for your needs."
    ]
  },
  {
    title: "Business Hours",
    icon: Clock3,
    details: [
      "Monday–Friday: 9:00 AM–6:00 PM ET",
      "Saturday: 10:00 AM–4:00 PM ET",
      "Sunday: Closed"
    ]
  }
];

const contactFaqs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "We typically respond within one business day."
  },
  {
    question: "Can I modify an existing order?",
    answer:
      "Changes may be possible before your order begins processing. Contact support as soon as possible with your order number."
  },
  {
    question: "How do returns work?",
    answer:
      "Eligible items can be returned within 30 days of delivery. Visit the Returns page for eligibility requirements and refund details."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Not at this time. We currently ship only within the contiguous United States."
  },
  {
    question: "Where can I track my order?",
    answer:
      "Once your order ships, you’ll find the tracking number in your account and shipping confirmation email."
  },
  {
    question: "Is Elevate a real store?",
    answer:
      "Elevate is a portfolio demo. Products, orders, payments, and submitted messages are for demonstration purposes only."
  }
];

const supportLinks = [
  {
    title: "Shipping Information",
    description: "View shipping options, delivery estimates, and tracking details.",
    icon: Truck,
    href: "/shipping"
  },
  {
    title: "Returns & Exchanges",
    description: "Review return eligibility, refund timing, and exchange options.",
    icon: RotateCcw,
    href: "/returns"
  },
  {
    title: "Browse Products",
    description: "Browse the latest products in the Elevate collection.",
    icon: ShoppingBag,
    href: "/shop"
  }
];

export default function ContactPage() {
  return (
    <>
      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-eyebrow">
                Contact
              </p>
              <PageTitle>We&apos;re here to help.</PageTitle>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-silver sm:text-xl">
                Have a question about a product, order, shipping, or return?
                Our team is here to help.
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
              eyebrow="Contact options"
              title="Get in touch."
              description="Choose the contact option that best fits your question."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-5 md:grid-cols-3 lg:gap-6">
            {contactOptions.map((option, index) => (
              <FadeIn delay={index * 0.05} key={option.title}>
                <article className="group h-full rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] md:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                    <option.icon aria-hidden="true" size={25} strokeWidth={1.7} />
                  </div>
                  <CardTitle>{option.title}</CardTitle>
                  <ul className="mt-5 grid gap-3 text-base leading-7 text-white/70">
                    {option.details.map((detail) => (
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
              eyebrow="Send a message"
              title="Send us a message."
              description="Fill out the form below and we’ll get back to you as soon as possible."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </Container>
      </section>

      <SectionDivider />

      <section className="home-section">
        <Container className={wideContainerClassName}>
          <FadeIn>
            <SectionHeader
              eyebrow="Contact FAQ"
              title="Common questions."
              description="Find quick answers before sending us a message."
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid max-w-4xl gap-3">
            {contactFaqs.map((faq, index) => (
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
            <SectionHeader
              eyebrow="More resources"
              title="Looking for more information?"
              descriptionClassName="text-lg"
            />
          </FadeIn>

          <div className="home-section-content-gap grid gap-4 md:grid-cols-3 lg:gap-5">
            {supportLinks.map((item, index) => (
              <FadeIn delay={index * 0.04} key={item.title}>
                <Link
                  className="group flex h-full items-start gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-7"
                  href={item.href}
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#a7e3ff] transition duration-300 ease-out group-hover:bg-glacier/18 group-hover:shadow-[0_0_28px_rgba(125,211,252,0.16)]">
                    <item.icon aria-hidden="true" size={21} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold text-platinum">
                        {item.title}
                      </h2>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="flex-none text-white/50 opacity-0 transition group-hover:opacity-100"
                        size={16}
                      />
                    </div>
                    <p className="mt-2 text-base leading-7 text-white/70">
                      {item.description}
                    </p>
                  </div>
                </Link>
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
                Explore technology for work, travel, creativity, and everyday
                use.
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
