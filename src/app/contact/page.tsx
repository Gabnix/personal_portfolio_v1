"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

type FormState = "idle" | "loading" | "success" | "error";

const FIELD_BASE =
  "w-full bg-transparent border-b border-foreground/10 py-3 min-h-[44px] text-foreground " +
  "placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 " +
  "transition-colors font-sans";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formRef.current) return;

      const form = formRef.current;
      const name = (form.elements.namedItem("from_name") as HTMLInputElement).value.trim();
      const email = (form.elements.namedItem("from_email") as HTMLInputElement).value.trim();
      const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

      // Client-side validation
      if (!name || !email || !message) {
        setFormState("error");
        setErrorMsg("All fields are required.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setFormState("error");
        setErrorMsg("Please enter a valid email address.");
        return;
      }
      if (message.length > 5000) {
        setFormState("error");
        setErrorMsg("Message is too long (max 5000 characters).");
        return;
      }

      setFormState("loading");
      setErrorMsg("");

      try {
        let recaptchaToken: string | undefined;
        if (executeRecaptcha) {
          recaptchaToken = await executeRecaptcha("contact_form");
        }

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from_name: name, from_email: email, message, recaptchaToken }),
        });

        if (!res.ok) {
          const data = (await res.json()) as { error?: string };
          throw new Error(data.error ?? "Something went wrong.");
        }

        setFormState("success");
      } catch (err) {
        setFormState("error");
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again or email me directly."
        );
      }
    },
    [executeRecaptcha]
  );

  /* ── Success state ──────────────────────────────────────────────── */
  if (formState === "success") {
    return (
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <AnimatedWrapper variant={fadeInUp}>
        <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
          Message Sent
        </p>
        <h1
          className="font-display font-light text-foreground leading-[0.92]"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          I&apos;ll be in touch.
        </h1>
        <p
          className="mt-6 text-muted-foreground leading-relaxed max-w-sm"
          style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
        >
          Thanks for reaching out. I typically respond within 24–48 hours.
        </p>
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] gap-2 mt-10 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to home
        </Link>
      </AnimatedWrapper>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────────────── */
  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* ── Left: editorial heading ──────────────────────────────── */}
        <AnimatedWrapper variant={fadeInUp}>
          <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Get In Touch
          </p>
          <h1
            className="font-display font-light text-foreground leading-[0.92]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Let&apos;s work<br />together.
          </h1>
          <p
            className="mt-6 text-muted-foreground leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
          >
            Have a project in mind or just want to say hello? Drop me a line.
          </p>
        </AnimatedWrapper>

        {/* ── Right: form ─────────────────────────────────────────── */}
        <AnimatedWrapper variant={fadeInUp} delay={0.15}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
          >
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="from_name"
                className="block font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground"
              >
                Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={FIELD_BASE}
                style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="from_email"
                className="block font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground"
              >
                Email
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={FIELD_BASE}
                style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className={`${FIELD_BASE} resize-none`}
                style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
              />
            </div>

            {/* Error message */}
            {formState === "error" && errorMsg && (
              <p className="text-sm text-destructive leading-relaxed">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "loading"}
              className="inline-flex items-center min-h-[44px] gap-2 text-sm font-medium text-foreground/90 hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {formState === "loading" ? (
                "Sending..."
              ) : (
                <>
                  Send a message
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </AnimatedWrapper>

      </div>
    </div>
  );
}

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return (
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <ContactForm />
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
