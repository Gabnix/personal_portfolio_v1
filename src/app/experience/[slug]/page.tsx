import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { getExperienceBySlug, experience } from "@/data/experience";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experience.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getExperienceBySlug(slug);
  return { title: entry ? `${entry.role} — Jim Hie` : "Not Found" };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getExperienceBySlug(slug);

  if (!entry) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <AnimatedWrapper>
        <Link
          href="/experience"
          className="inline-flex items-center min-h-[44px] gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden="true" />
          All experience
        </Link>

        <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mt-8 mb-3">
          Work History
        </p>
        <h1
          className="font-display font-medium leading-tight text-foreground"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
        >
          {entry.role}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium">{entry.company}</span>
          <span className="mx-2 opacity-40">·</span>
          <span className="tabular-nums">{entry.period}</span>
        </p>

        <div className="mt-10 border-t border-border pt-8">
          {entry.description.length === 1 ? (
            <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}>
              {entry.description[0]}
            </p>
          ) : (
            <ul className="space-y-3">
              {entry.description.map((line, i) => (
                <li
                  key={i}
                  className="text-muted-foreground leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2 before:bg-muted-foreground/40"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
