"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <AnimatedWrapper variant={fadeInUp}>
          <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Experience
          </p>
        </AnimatedWrapper>

        <div>
          {experience.map((entry, i) => (
            <AnimatedWrapper key={entry.slug} variant={fadeInUp} delay={i * 0.08}>
              <div className="grid md:grid-cols-[160px_1fr] gap-x-12 py-8 border-t border-foreground/5">

                {/* ── Date ──────────────────────────────────────────────── */}
                <p className="text-xs text-muted-foreground tabular-nums mb-3 md:mb-0 pt-1">
                  {entry.period}
                </p>

                {/* ── Role + Company + Description ──────────────────────── */}
                <div>
                  <Link
                    href={`/experience/${entry.slug}`}
                    className="font-medium text-foreground/90 leading-snug hover:text-foreground transition-colors"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
                  >
                    {entry.role}
                  </Link>
                  <p className="text-sm font-medium text-muted-foreground mt-1">
                    {entry.company}
                  </p>
                  {entry.description.length === 1 ? (
                    <p
                      className="mt-3 text-muted-foreground leading-relaxed"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
                    >
                      {entry.description[0]}
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {entry.description.map((line, j) => (
                        <li
                          key={j}
                          className="text-muted-foreground leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-1.5 before:bg-muted-foreground/40"
                          style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            </AnimatedWrapper>
          ))}
        </div>

        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 mt-8 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Full history <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>

      </div>
    </section>
  );
}
