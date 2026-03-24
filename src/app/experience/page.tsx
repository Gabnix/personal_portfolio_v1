import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience — Jim Hie",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">
      <AnimatedWrapper variant={fadeInUp}>
        <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
          History
        </p>
        <h1
          className="font-display font-medium leading-tight text-foreground"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
        >
          Experience
        </h1>
      </AnimatedWrapper>

      <div className="mt-16">
        {experience.map((entry, i) => (
          <AnimatedWrapper key={entry.slug} variant={fadeInUp} delay={i * 0.08}>
            <div className="grid md:grid-cols-[160px_1fr] gap-x-12 py-8 border-t border-foreground/5">

              <p className="text-xs text-muted-foreground tabular-nums mb-3 md:mb-0 pt-1">
                {entry.period}
              </p>

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
    </div>
  );
}
