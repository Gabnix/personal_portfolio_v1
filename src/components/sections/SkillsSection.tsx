"use client";

import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

const TOOLS = [
  { category: "Languages", tools: ["Python", "JavaScript", "TypeScript", "Dart", "Java", "C"] },
  { category: "Frontend", tools: ["React", "Next.js", "Flutter", "Tailwind CSS", "Figma"] },
  { category: "Backend", tools: ["Node.js", "Express", "Django", "Flask"] },
  { category: "Data", tools: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Redis"] },
  { category: "Infrastructure", tools: ["Docker", "Git", "GitHub Actions", "AWS", "Vercel"] },
];

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-0">

      {/* ── Sticky section header — mobile only ──────────────────── */}
      <div className="lg:hidden sticky top-0 z-20 -mx-6 sm:-mx-10 px-6 sm:px-10 py-3 mb-8 backdrop-blur-md bg-background/70 border-b border-foreground/[0.07]">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Stack
        </span>
      </div>

      <div className="py-12 lg:py-24">

        {/* Desktop overline */}
        <AnimatedWrapper variant={fadeInUp} className="hidden lg:block">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-8">
            Stack
          </p>
        </AnimatedWrapper>

        <dl className="space-y-6">
          {TOOLS.map(({ category, tools }, i) => (
            <AnimatedWrapper key={category} variant={fadeInUp} delay={i * 0.06}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
                <dt className="sm:w-32 sm:shrink-0 sm:pt-[3px]">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {category}
                  </span>
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <span key={tool} className="tech-pill">{tool}</span>
                  ))}
                </dd>
              </div>
            </AnimatedWrapper>
          ))}
        </dl>

      </div>
    </section>
  );
}
