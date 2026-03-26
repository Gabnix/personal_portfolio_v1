import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Pulse — Real-time Analytics Dashboard",
    description:
      "A live analytics dashboard that streams event data via WebSockets and renders interactive charts with sub-second latency. Built to replace a clunky spreadsheet workflow for a small ops team tracking daily KPIs.",
    longDescription:
      "A longer description with more detail about the project, the technical challenges, and the decisions made.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Recharts"],
    github: "https://github.com/",
    live: "/not-found",
    featured: true,
  },
  {
    slug: "project-two",
    title: "Shelf — Personal Library Tracker",
    description:
      "A full-stack reading tracker where users log books, write notes, and visualize their yearly reading habits. Features a fuzzy-search integration with the Open Library API for instant book lookups.",
    longDescription:
      "A longer description with more detail about the project, the technical challenges, and the decisions made.",
    tags: ["React", "Node.js", "PostgreSQL", "Open Library API"],
    github: "https://github.com/",
    featured: true,
  },
  {
    slug: "project-three",
    title: "Dispatch — Lightweight Job Queue",
    description:
      "A minimal background job processor built on Redis Streams, designed for small services that need reliable async task execution without the overhead of a full message broker like RabbitMQ or Kafka.",
    longDescription:
      "A longer description with more detail about the project, the technical challenges, and the decisions made.",
    tags: ["Python", "FastAPI", "Redis", "Docker"],
    github: "https://github.com/",
    live: "/not-found",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
