"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-0">

      {/* ── Sticky section header — mobile only ──────────────────── */}
      <div className="lg:hidden sticky top-0 z-20 -mx-6 sm:-mx-10 px-6 sm:px-10 py-3 mb-3 backdrop-blur-md bg-background/70">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Experience
        </span>
      </div>

      <div className="pb-12 lg:py-24">

        {/* Desktop overline */}
        <AnimatedWrapper variant={fadeInUp} className="hidden lg:block">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-8">
            Experience
          </p>
        </AnimatedWrapper>

        <div className="space-y-1">
          {experience.map((entry, i) => (
            <AnimatedWrapper key={entry.slug} variant={fadeInUp} delay={i * 0.07}>
              <Link
                href={`/experience/${entry.slug}`}
                className={cn(
                  "ghost-card group block -mx-4 px-4 py-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:rounded-lg"
                )}
              >
                <div className="grid sm:grid-cols-[120px_1fr] gap-x-8 gap-y-1">

                  {/* Date */}
                  <p className="text-sm text-muted-foreground tabular-nums leading-relaxed pt-0.5 sm:pt-[3px]">
                    {entry.period}
                  </p>

                  {/* Role + Company + Description */}
                  <div className="min-w-0">
                    <div className="flex items-start gap-1.5">
                      <h3
                        className="font-display font-medium text-foreground/85 leading-snug group-hover:text-accent-signal transition-colors duration-300"
                        style={{ fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
                      >
                        {entry.role}
                      </h3>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 mt-[3px] shrink-0 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">
                      {entry.company}
                    </p>

                    {entry.description.length === 1 ? (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {entry.description[0]}
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-1.5">
                        {entry.description.map((line, j) => (
                          <li
                            key={j}
                            className="text-sm text-muted-foreground leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-1.5 before:bg-muted-foreground/40"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech pills */}
                    {entry.tech && entry.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {entry.tech.map((t) => (
                          <span key={t} className="tech-pill">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </Link>
            </AnimatedWrapper>
          ))}
        </div>

        <AnimatedWrapper variant={fadeInUp} delay={experience.length * 0.07}>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 mt-6 ml-0 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            Full résumé
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </AnimatedWrapper>

      </div>
    </section>
  );
}
