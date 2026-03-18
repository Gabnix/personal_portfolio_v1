export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  live?: string;
  thumbnail?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "database";
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
