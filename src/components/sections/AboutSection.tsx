"use client";

import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

export function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[1fr_200px] gap-16 items-start">

          {/* ── Editorial text ─────────────────────────────────────────── */}
          <AnimatedWrapper variant={fadeInUp}>
            <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              Background
            </p>
            <div
              className="space-y-5 text-muted-foreground leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
            >
              <p>
                I&apos;m a software engineer focused on building high-performance
                web systems — from distributed backends to precise, well-crafted
                UIs. I care about the details: clean architecture, measurable
                performance, and interfaces that feel inevitable.
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

          {/* ── Meta facts ─────────────────────────────────────────────── */}
          <AnimatedWrapper variant={fadeInUp} delay={0.15}>
            <dl className="space-y-6">
              <div>
                <dt className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  Focus
                </dt>
                <dd className="text-sm text-muted-foreground">
                  High-performance web systems
                </dd>
              </div>
              <div>
                <dt className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  Location
                </dt>
                <dd className="text-sm text-muted-foreground">Perth, Western Australia</dd>
              </div>
              <div>
                <dt className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  Education
                </dt>
                <dd className="text-sm text-foreground/75 leading-relaxed">
                  Bachelor of Computing (Computer Science)
                  <br />
                  Curtin University, 2022-2025
                </dd>
              </div>
              <div>
                <dt className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  Interests
                </dt>
                <dd className="text-sm text-muted-foreground">
                  Open source · design systems · music · reading
                </dd>
              </div>
              {/* <div>
                <dt className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  Status
                </dt>
                <dd className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-indigo-accent flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-foreground/75">Open to opportunities</span>
                </dd>
              </div> */}
            </dl>
          </AnimatedWrapper>

        </div>
      </div>
    </section>
  );
}
