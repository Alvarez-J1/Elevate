import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const testimonials = [
  {
    quote:
      "The build quality exceeded my expectations. Everything arrived quickly and feels genuinely premium.",
    name: "Sarah K.",
    occupation: "Photographer"
  },
  {
    quote:
      "The headphones became my daily work setup. Excellent comfort for long sessions and outstanding sound quality.",
    name: "Michael T.",
    occupation: "Product Designer"
  },
  {
    quote:
      "The travel accessories made organizing my gear effortless. Everything feels thoughtfully designed.",
    name: "Daniel R.",
    occupation: "Remote Consultant"
  }
];

const stars = ["1", "2", "3", "4", "5"];

function StarRow({
  className = "gap-2 text-[0.95rem]"
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center ${className}`}
    >
      {stars.map((star) => (
        <span className="leading-none text-[#F7C85B]" key={star}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section className="home-section">
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <SectionHeader
            eyebrow="Customer Reviews"
            title="Trusted by creators, professionals, and travelers."
            description="Designed for creators, professionals, and travelers who appreciate premium technology that lasts."
            descriptionClassName="text-lg"
          />
        </FadeIn>

        <FadeIn delay={0.04}>
          <div className="home-section-content-gap max-w-3xl text-lg leading-7 text-silver">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <StarRow className="gap-2 text-lg" />
              <p className="font-medium text-silver">
                <span className="sr-only">Five out of five stars. </span>
                4.8 average rating
              </p>
            </div>
            <p className="mt-1.5 text-muted">
              Based on 12,000+ verified purchases
            </p>
          </div>
        </FadeIn>

        <div className="home-section-content-gap grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 min-[1600px]:gap-7">
          {testimonials.map((testimonial, index) => (
            <FadeIn delay={index * 0.05} key={testimonial.name}>
              <article
                className="group touch-card touch-card-lift-subtle touch-card-border-25 touch-card-surface-6 touch-card-shadow-strong relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] px-8 py-10 shadow-soft transition-[transform,border-color,background-color,box-shadow] duration-[240ms] ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_26px_86px_rgba(0,0,0,0.38)] active:-translate-y-0.5 active:border-white/25 active:bg-white/[0.06] active:shadow-[0_26px_86px_rgba(0,0,0,0.38)] md:px-10 md:py-12"
                data-touch-card
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-4 font-serif text-[6rem] font-semibold leading-none text-white/[0.1]"
                >
                  &ldquo;
                </span>

                <div
                  aria-label="Five out of five stars"
                  className="relative z-10"
                >
                  <StarRow />
                </div>

                <blockquote className="relative z-10 mt-9 flex-1 text-lg leading-10 text-platinum">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="relative z-10 mt-11 border-t border-white/10 pt-7">
                  <p className="font-semibold text-platinum">
                    {testimonial.name}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-5 text-silver/75">
                    {testimonial.occupation}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
