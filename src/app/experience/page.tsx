import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { BackToHome } from "@/components/shared/BackToHome";
import { fadeInUp } from "@/lib/animations";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Experience — Jim Ling",
};

export default function ExperiencePage() {
  return (
    <>
    <div className="mx-auto max-w-3xl px-6 sm:px-10 pt-12 sm:pt-16 pb-24">

      {/* ── Back to home ──────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp}>
        <BackToHome />
      </AnimatedWrapper>

      {/* ── Page header ───────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp} delay={0.06}>
        <div className="mt-10">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Work History
          </p>
          <h1
            className="font-display font-semibold text-foreground leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.025em" }}
          >
            Experience
          </h1>
        </div>
      </AnimatedWrapper>

      {/* ── Experience list ───────────────────────────────────────── */}
      <div className="mt-12 space-y-1">
        {experience.map((entry, i) => (
          <AnimatedWrapper key={entry.slug} variant={fadeInUp} delay={0.1 + i * 0.07}>
            <Link
              href={`/experience/${entry.slug}`}
              className={cn(
                "ghost-card group block -mx-4 px-4 py-4",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-signal focus-visible:rounded-lg"
              )}
            >
              <div className="grid sm:grid-cols-[130px_1fr] gap-x-8 gap-y-1">

                {/* Date */}
                <p className="font-sans text-sm text-muted-foreground tabular-nums leading-relaxed sm:pt-[3px]">
                  {entry.period}
                </p>

                {/* Role + meta + description + pills */}
                <div>
                  <div className="flex items-start gap-1.5">
                    <h2
                      className="font-display font-medium text-foreground/85 leading-snug group-hover:text-accent-signal transition-colors duration-300"
                      style={{ fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
                    >
                      {entry.role}
                    </h2>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 mt-[3px] shrink-0 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-sans text-sm font-medium text-muted-foreground mt-0.5">
                    {entry.company}
                  </p>

                  {entry.description.length === 1 ? (
                    <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
                      {entry.description[0]}
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-1.5">
                      {entry.description.map((line, j) => (
                        <li
                          key={j}
                          className="font-sans text-sm text-muted-foreground leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-1.5 before:bg-muted-foreground/40"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}

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

    </div>
    <Footer />
    </>
  );
}
