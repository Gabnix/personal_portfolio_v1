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
        <p className="font-medium text-[12px] uppercase tracking-[0.18em] text-foreground/60 mb-3">
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
            <div className="grid md:grid-cols-[160px_1fr] gap-x-12 py-6 border-t border-foreground/5">

              <p className="text-xs text-foreground/35 tabular-nums mb-3 md:mb-0 pt-px">
                {entry.period}
              </p>

              <div>
                <Link
                  href={`/experience/${entry.slug}`}
                  className="text-sm font-medium text-foreground/90 leading-snug hover:text-foreground transition-colors"
                >
                  {entry.role}
                </Link>
                <p className="text-sm font-medium text-foreground/50 mt-0.5">
                  {entry.company}
                </p>
                {entry.description.length === 1 ? (
                  <p className="mt-3 text-sm text-foreground/50 leading-relaxed">
                    {entry.description[0]}
                  </p>
                ) : (
                  <ul className="mt-3 space-y-1">
                    {entry.description.map((line, j) => (
                      <li
                        key={j}
                        className="text-sm text-foreground/50 leading-relaxed pl-3 relative before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-1.5 before:bg-foreground/25"
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
