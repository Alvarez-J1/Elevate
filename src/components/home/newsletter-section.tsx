"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="home-section">
      <Container className="min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              className="mx-auto"
              eyebrow="Stay Updated"
              title="Be first to discover every collection."
              descriptionClassName="text-lg"
              description="Exclusive product launches, limited editions, and thoughtfully curated recommendations—delivered occasionally, never spam."
            />

            <form
              className="home-section-content-gap mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                aria-describedby="newsletter-message"
                autoComplete="email"
                className="input-shell min-h-[50px] flex-1 px-4 text-base placeholder:text-muted focus:border-glacier/70 focus:outline-none sm:min-h-0 sm:h-12"
                id="newsletter-email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (submitted) setSubmitted(false);
                }}
                placeholder="Enter your email address"
                required
                type="email"
                value={email}
              />
              <Button className="h-[52px] px-6 sm:flex-none" type="submit">
                Subscribe
              </Button>
            </form>

            <div className="mt-4 min-h-11 text-lg leading-7" id="newsletter-message">
              {submitted ? (
                <div className="text-silver" role="status" aria-live="polite">
                  <p className="font-medium text-platinum">
                    &#10003; Thanks for subscribing.
                  </p>
                  <p className="mt-1 text-muted">
                    We&apos;ll keep you updated on new releases.
                  </p>
                </div>
              ) : (
                <p className="text-muted">No spam. Unsubscribe anytime.</p>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
