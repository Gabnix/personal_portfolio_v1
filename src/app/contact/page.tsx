"use client";

import { useRef, useState, useCallback } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { BackToHome } from "@/components/shared/BackToHome";
import { Footer } from "@/components/layout/Footer";
import { fadeInUp } from "@/lib/animations";

type FormState = "idle" | "loading" | "success" | "error";

/* ── Field base style ──────────────────────────────────────────── */
const FIELD_BASE =
  "w-full bg-transparent border-b border-foreground/10 py-3 min-h-[44px] " +
  "text-foreground placeholder:text-muted-foreground/40 placeholder:text-sm " +
  "focus:outline-none focus:border-accent-signal/50 transition-colors duration-300 font-sans text-sm";

const LABEL_CLASS =
  "block font-sans text-sm font-medium text-foreground/60 tracking-normal";

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

  /* ── Success state ──────────────────────────────────────────── */
  if (formState === "success") {
    return (
      <>
        <div className="flex-1 flex flex-col mx-auto w-full max-w-3xl px-6 sm:px-10 py-12 sm:py-16">
          <AnimatedWrapper variant={fadeInUp}>
            <BackToHome />
          </AnimatedWrapper>
          <div className="flex-1 flex items-center">
          <AnimatedWrapper variant={fadeInUp} delay={0.08}>
            <div>
              <CheckCircle2 className="h-9 w-9 text-accent-signal mb-6" aria-hidden="true" />
              <h1
                className="font-display font-semibold text-foreground leading-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.025em" }}
              >
                I&apos;ll be in touch.
              </h1>
              <p
                className="mt-5 font-sans text-muted-foreground leading-relaxed max-w-sm"
                style={{ fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
              >
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-8 min-h-[44px] font-sans text-base font-semibold text-foreground/85 hover:text-accent-signal transition-colors duration-300 group"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Back to home
              </Link>
            </div>
          </AnimatedWrapper>
          </div>
        </div>
      </>
    );
  }

  /* ── Form ───────────────────────────────────────────────────── */
  return (
    <div className="flex-1 mx-auto w-full max-w-3xl px-6 sm:px-10 pt-8 sm:pt-10 pb-16">

      {/* ── Back to home ──────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp}>
        <BackToHome />
      </AnimatedWrapper>

      {/* ── Heading ───────────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp} delay={0.05}>
        <h1
          className="font-display font-semibold text-foreground leading-tight mt-8 mb-7 max-w-xl"
          style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", letterSpacing: "-0.03em" }}
        >
          Let&apos;s start a conversation.
        </h1>
      </AnimatedWrapper>

      {/* ── Form ──────────────────────────────────────────────────── */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 max-w-xl"
        >

          {/* Name */}
          <AnimatedWrapper variant={fadeInUp} delay={0.08}>
            <div className="space-y-2">
              <label
                htmlFor="from_name"
                className={LABEL_CLASS}
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
                aria-invalid={formState === "error" || undefined}
                aria-describedby={formState === "error" ? "form-error" : undefined}
                className={FIELD_BASE}
              />
            </div>
          </AnimatedWrapper>

          {/* Email */}
          <AnimatedWrapper variant={fadeInUp} delay={0.14}>
            <div className="space-y-2">
              <label
                htmlFor="from_email"
                className={LABEL_CLASS}
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
                aria-invalid={formState === "error" || undefined}
                aria-describedby={formState === "error" ? "form-error" : undefined}
                className={FIELD_BASE}
              />
            </div>
          </AnimatedWrapper>

          {/* Message */}
          <AnimatedWrapper variant={fadeInUp} delay={0.2}>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className={LABEL_CLASS}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="What&apos;s on your mind?"
                aria-invalid={formState === "error" || undefined}
                aria-describedby={formState === "error" ? "form-error" : undefined}
                className={`${FIELD_BASE} resize-none`}
              />
            </div>
          </AnimatedWrapper>

          {/* Error */}
          <div aria-live="assertive" aria-atomic="true">
            {formState === "error" && errorMsg && (
              <p id="form-error" className="font-sans text-sm text-destructive leading-relaxed">{errorMsg}</p>
            )}
          </div>

          {/* Submit + reCAPTCHA attribution */}
          <AnimatedWrapper variant={fadeInUp} delay={0.26}>
            <button
              type="submit"
              disabled={formState === "loading"}
              aria-busy={formState === "loading"}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 min-h-[44px] font-sans text-sm font-semibold rounded-lg border border-foreground/15 text-foreground/85 hover:border-accent-signal hover:text-accent-signal bg-transparent transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
            >
              {formState === "loading" ? (
                "Sending…"
              ) : (
                <>
                  Send message
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
            <p className="mt-5 font-sans text-[12px] text-muted-foreground/50 leading-relaxed">
              Protected by reCAPTCHA —{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-muted-foreground transition-colors duration-200"
              >
                Privacy Policy
              </a>
              {" · "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-muted-foreground transition-colors duration-200"
              >
                Terms
              </a>
            </p>
          </AnimatedWrapper>

        </form>
    </div>
  );
}

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <>
      {siteKey ? (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
          <ContactForm />
        </GoogleReCaptchaProvider>
      ) : (
        <ContactForm />
      )}
      <Footer />
    </>
  );
}
