import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    description: "A short description of what this project does and the problem it solves.",
    longDescription:
      "A longer description with more detail about the project, the technical challenges, and the decisions made.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/",
    live: "https://example.com",
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/",
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project Three",
    description: "A short description of what this project does and the problem it solves.",
    tags: ["Python", "FastAPI", "Docker"],
    github: "https://github.com/",
    live: "https://example.com",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
