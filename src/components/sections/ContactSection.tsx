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

      <div className="py-12 lg:py-24">

        <AnimatedWrapper variant={fadeInUp}>
          {/* Overline — static on all breakpoints for Contact (last section, no sticky needed) */}
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-8">
            Contact
          </p>

          <h2
            className="font-display font-medium text-foreground leading-snug"
            style={{ fontSize: "clamp(1.375rem, 3.5vw, 1.75rem)", letterSpacing: "-0.02em" }}
          >
            Job opportunities or collaborations?
            <br />
            <span className="text-muted-foreground">I&apos;d like to hear about it.</span>
          </h2>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-indigo-accent transition-colors duration-200 group"
            >
              Send a message
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <span className="hidden sm:block h-px w-4 bg-foreground/20" aria-hidden="true" />

            <CopyEmail
              email={SITE_EMAIL}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="Copy email address"
            >
              or copy my email
            </CopyEmail>
          </div>
        </AnimatedWrapper>

      </div>
    </section>
  );
}
