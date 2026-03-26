"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { CopyEmail } from "@/components/shared/CopyEmail";
import { fadeInUp } from "@/lib/animations";
import { SITE_EMAIL } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-0">

      <div className="py-10 lg:py-16">

        <AnimatedWrapper variant={fadeInUp}>
          {/* Overline — mobile only, Contact has no sticky header */}
          <p className="lg:hidden font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground mb-8">
            Contact
          </p>

          <h2
            className="font-display font-medium text-foreground leading-snug"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", letterSpacing: "-0.025em" }}
          >
            Job opportunities or collaborations?
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 min-h-[44px] font-sans text-sm font-semibold rounded-lg border border-foreground/15 text-foreground/85 hover:border-accent-signal hover:text-accent-signal transition-colors duration-200 group"
            >
              Send a message
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <CopyEmail
              email={SITE_EMAIL}
              className="inline-flex items-center font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="Copy email address"
            >
              Copy email address
            </CopyEmail>
          </div>
        </AnimatedWrapper>

      </div>
    </section>
  );
}
