"use client";

import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

const TOOLS = [
  { category: "Languages", tools: ["Python", "JavaScript", "Dart", "Java", "C"] },
  { category: "Frontend", tools: ["Flutter", "React", "Figma"] },
  { category: "Backend", tools: ["Node.js", "Express", "Django", "Flask"] },
  { category: "Data", tools: ["Supabase", "MongoDB", "MySQL"] },
  { category: "Infrastructure", tools: ["Docker", "Git", "Jira", "VS Code"] },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <AnimatedWrapper variant={fadeInUp}>
          <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Stack
          </p>
        </AnimatedWrapper>

        <dl className="space-y-5">
          {TOOLS.map(({ category, tools }, i) => (
            <AnimatedWrapper key={category} variant={fadeInUp} delay={i * 0.08}>
              <div className="flex items-center gap-6">
                <dt className="w-36 sm:w-40 flex-shrink-0">
                  <span className="font-sans font-medium text-xs text-muted-foreground uppercase tracking-[0.18em]">
                    {category}
                  </span>
                </dt>
                <dd className="text-sm text-muted-foreground leading-none">
                  {tools.join(" · ")}
                </dd>
              </div>
            </AnimatedWrapper>
          ))}
        </dl>

      </div>
    </section>
  );
}
