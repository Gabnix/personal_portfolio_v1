import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { BackToHome } from "@/components/shared/BackToHome";
import { fadeInUp } from "@/lib/animations";
import { getExperienceBySlug, experience } from "@/data/experience";
import { Footer } from "@/components/layout/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experience.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getExperienceBySlug(slug);
  return { title: entry ? `${entry.role} — Jim Ling` : "Not Found" };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getExperienceBySlug(slug);

  if (!entry) notFound();

  return (
    <>
    <div className="flex-1 mx-auto w-full max-w-3xl px-6 sm:px-10 pt-12 sm:pt-16 pb-24">

      {/* ── Back to home ──────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp}>
        <BackToHome />
      </AnimatedWrapper>

      {/* ── Role header ───────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp} delay={0.06}>
        <div className="mt-10">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Work History
          </p>
          <h1
            className="font-display font-semibold text-foreground leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.025em" }}
          >
            {entry.role}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/65">{entry.company}</span>
            <span className="mx-2 text-foreground/20" aria-hidden="true">·</span>
            <span className="tabular-nums">{entry.period}</span>
          </p>
        </div>
      </AnimatedWrapper>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <AnimatedWrapper variant={fadeInUp} delay={0.12}>
        <div className="mt-10 pt-8 border-t border-border">
          {entry.description.length === 1 ? (
            <p
              className="text-muted-foreground leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)" }}
            >
              {entry.description[0]}
            </p>
          ) : (
            <ul className="space-y-3">
              {entry.description.map((line, i) => (
                <li
                  key={i}
                  className="text-muted-foreground leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-muted-foreground/40"
                  style={{ fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)" }}
                >
                  {line}
                </li>
              ))}
            </ul>
          )}

          {/* Tech pills */}
          {entry.tech && entry.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-8">
              {entry.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          )}
        </div>
      </AnimatedWrapper>

    </div>
    <Footer />
    </>
  );
}
