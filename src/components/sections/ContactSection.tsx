"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { CopyEmail } from "@/components/shared/CopyEmail";
import { fadeInUp } from "@/lib/animations";
import { SITE_EMAIL } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="pt-40 pb-48">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedWrapper variant={fadeInUp}>
          <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Let&apos;s talk
          </p>
          <h2
            className="font-display font-light text-foreground leading-[0.92]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.035em" }}
          >
            Ready to build
            <br />
            <span className="text-muted-foreground">something great?</span>
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center min-h-[44px] gap-2 text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
            >
              Send a message <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <CopyEmail
              email={SITE_EMAIL}
              className="inline-flex items-center min-h-[44px] gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy email address"
            >
              or email directly <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </CopyEmail>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
