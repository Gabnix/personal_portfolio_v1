"use client";

import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-0">

      {/* ── Sticky section header — mobile only ──────────────────── */}
      <div className="lg:hidden sticky top-0 z-20 -mx-6 sm:-mx-10 px-6 sm:px-10 py-3 mb-3 backdrop-blur-md bg-background/70">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          About
        </span>
      </div>

      <div className="pb-12 lg:pt-0 lg:pb-24">
        <AnimatedWrapper variant={fadeInUp}>
          <div
            className="font-sans space-y-5 text-base leading-relaxed text-muted-foreground max-w-xl"
          >
            <p>
              I&apos;m a software engineer focused on building high-performance
              web systems — from distributed backends to precise, well-crafted
              UIs. I care about the details: clean architecture, measurable
              performance, and{" "}
              <span className="text-foreground font-medium">interfaces that feel inevitable</span>.
            </p>
            <p>
              I bring an engineering-first mindset to every problem, but
              I&apos;m equally comfortable talking design decisions, product
              tradeoffs, and what ships versus what doesn&apos;t.
            </p>
            <p>
              Outside of work, I&apos;m interested in open source, design
              systems, and the intersection of engineering and craft.
            </p>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
