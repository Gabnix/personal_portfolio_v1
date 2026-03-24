import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    slug: "senior-software-engineer",
    company: "Company Name",
    role: "Senior Software Engineer",
    period: "2024 — Present",
    description: [
      "Leading architecture for a distributed platform processing millions of events per day, with a focus on latency reduction and operational reliability.",
    ],
  },
  {
    slug: "software-engineer",
    company: "Company Name",
    role: "Software Engineer",
    period: "2022 — 2024",
    description: [
      "Built and maintained a core API layer serving web and mobile clients, reducing p99 response times by 40% through query optimisation and caching.",
    ],
  },
  {
    slug: "junior-software-engineer",
    company: "Company Name",
    role: "Junior Software Engineer",
    period: "2021 — 2022",
    description: [
      "Developed internal tooling and automation that cut deployment time from 45 minutes to under 5, adopted across three product teams.",
    ],
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experience.find((e) => e.slug === slug);
}
