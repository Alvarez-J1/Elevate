"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ApiError, submitContactMessage } from "@/lib/api";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Array<{ field: string; message: string }>>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setError(null);
    setFieldErrors([]);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await submitContactMessage({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        subject: String(form.get("subject") ?? ""),
        message: String(form.get("message") ?? "")
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong sending your message. Please try again."
      );
      setFieldErrors(err instanceof ApiError ? err.fieldErrors ?? [] : []);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div
        aria-live="polite"
        className="rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center shadow-soft sm:p-10"
        role="status"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-glacier/15 text-glacier">
          <CheckCircle2 aria-hidden="true" size={28} />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-platinum">
          Message sent.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-silver">
          Thank you for your message. We&apos;ll get back to you soon.
        </p>
        <Button
          className="mt-7"
          onClick={() => setIsSubmitted(false)}
          type="button"
          variant="secondary"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      aria-label="Contact form"
      className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft sm:p-8"
      noValidate={false}
      onSubmit={handleSubmit}
    >
      {error ? (
        <div
          className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
          role="alert"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 flex-none" size={16} />
          <div>
            <p>{error}</p>
            {fieldErrors.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {fieldErrors.map((fieldError) => (
                  <li key={`${fieldError.field}:${fieldError.message}`}>
                    {fieldError.message}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" htmlFor="contact-name">
          <span className="mb-2 block text-sm text-silver">Name</span>
          <input
            autoComplete="name"
            className="input-shell h-12 px-4"
            id="contact-name"
            name="name"
            required
            type="text"
          />
        </label>

        <label className="block" htmlFor="contact-email">
          <span className="mb-2 block text-sm text-silver">Email Address</span>
          <input
            autoComplete="email"
            className="input-shell h-12 px-4"
            id="contact-email"
            name="email"
            required
            type="email"
          />
        </label>

        <label className="block sm:col-span-2" htmlFor="contact-subject">
          <span className="mb-2 block text-sm text-silver">Subject</span>
          <input
            className="input-shell h-12 px-4"
            id="contact-subject"
            name="subject"
            required
            type="text"
          />
        </label>

        <label className="block sm:col-span-2" htmlFor="contact-message">
          <span className="mb-2 block text-sm text-silver">Message</span>
          <textarea
            className="input-shell min-h-40 px-4 py-3"
            id="contact-message"
            name="message"
            required
            rows={6}
          />
        </label>
      </div>

      <Button className="mt-7 w-full sm:w-auto" disabled={isSubmitting} size="lg" type="submit">
        <Send aria-hidden="true" size={18} />
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
