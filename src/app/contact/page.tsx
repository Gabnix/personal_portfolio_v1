"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

type FormState = "idle" | "loading" | "success" | "error";

const FIELD_BASE =
  "w-full bg-transparent border-b border-foreground/10 py-3 text-foreground " +
  "placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 " +
  "transition-colors font-sans";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  // When no key is configured (local dev), bypass CAPTCHA requirement
  const [captchaVerified, setCaptchaVerified] = useState(!recaptchaSiteKey);
  const [errorMsg, setErrorMsg] = useState("");
  const { resolvedTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !captchaVerified) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMsg(
        "Something went wrong. Please try again or email me directly."
      );
      recaptchaRef.current?.reset();
      setCaptchaVerified(!recaptchaSiteKey);
    }
  };

  /* ── Success state ──────────────────────────────────────────────── */
  if (formState === "success") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">
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
                placeholder="What&apos;s on your mind?"
                className={`${FIELD_BASE} resize-none`}
                style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
              />
            </div>

            {/* reCAPTCHA — only renders when key is configured */}
            {recaptchaSiteKey && (
              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  theme={resolvedTheme === "dark" ? "dark" : "light"}
                  onChange={(token) => setCaptchaVerified(!!token)}
                  onExpired={() => setCaptchaVerified(false)}
                />
              </div>
            )}

            {/* Error message */}
            {formState === "error" && errorMsg && (
              <p className="text-sm text-destructive leading-relaxed">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!captchaVerified || formState === "loading"}
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
