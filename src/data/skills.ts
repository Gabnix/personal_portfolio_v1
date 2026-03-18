import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Python", category: "language" },

  // Frameworks
  { name: "Next.js", category: "framework" },
  { name: "React", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },

  // Databases
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },

  // Tools
  { name: "Git", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Figma", category: "tool" },
];

export const skillsByCategory = skills.reduce<Record<string, Skill[]>>(
  (acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  },
  {}
);
