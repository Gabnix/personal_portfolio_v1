"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { SkillBadge } from "@/components/shared/SkillBadge";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { skillsByCategory } from "@/data/skills";

const CATEGORY_LABELS: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  database: "Databases",
  tool: "Tools",
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Skills"
          subtitle="Technologies I work with."
        />

        <div className="mt-12 space-y-10">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {CATEGORY_LABELS[category] ?? category}
              </h3>
              <AnimatedWrapper variant={staggerContainer}>
                <motion.div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.div key={skill.name} variants={fadeInUp}>
                      <SkillBadge skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
