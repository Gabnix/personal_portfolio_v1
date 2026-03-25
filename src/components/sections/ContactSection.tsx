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
          {/* Overline — static on all breakpoints for Contact (last section, no sticky needed) */}
          <p className="lg:hidden font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground mb-8">
            Contact
          </p>

          <h2
            className="font-display font-medium text-foreground leading-snug"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)", letterSpacing: "-0.02em" }}
          >
            Job opportunities or collaborations?
            <br />
            <span className="text-muted-foreground">I&apos;d like to hear about it.</span>
          </h2>

          <div className="mt-10 flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans text-base font-semibold text-foreground/85 hover:text-accent-signal transition-colors duration-300 group"
            >
              Send a message
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <span className="text-muted-foreground/30 text-sm select-none" aria-hidden="true">·</span>

            <CopyEmail
              email={SITE_EMAIL}
              className="inline-flex items-center font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="Copy email address"
            >
              copy email
            </CopyEmail>
          </div>
        </AnimatedWrapper>

      </div>
    </section>
  );
}
