import type { NavLink } from "@/types";

export const SITE_NAME = "Gabriel";
export const SITE_TITLE = "Gabriel — Software Engineer";
export const SITE_DESCRIPTION =
  "Personal portfolio of Gabriel, a software engineer who builds modern web experiences.";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  email: "mailto:hello@example.com",
};
