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
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedWrapper variant={fadeInUp}>
          <p className="font-medium text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Contact Me
          </p>
          <h2
            className="font-display font-medium text-foreground leading-snug"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "-0.02em" }}
          >
            Job opportunities or collaborations?
            <br />
            <span className="text-muted-foreground">I&apos;d like to hear about it.</span>
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center min-h-[44px] gap-2 text-base font-medium text-foreground/90 hover:text-foreground hover:gap-3 transition-all cursor-pointer"
            >
              Send a message <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <CopyEmail
              email={SITE_EMAIL}
              className="inline-flex items-center min-h-[44px] gap-2 text-base font-medium text-foreground/90 hover:text-foreground hover:gap-3 transition-all cursor-pointer"
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
