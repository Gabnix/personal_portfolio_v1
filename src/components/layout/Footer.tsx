"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_NAME, SOCIAL_LINKS, SITE_EMAIL } from "@/lib/constants";
import { CopyEmail } from "@/components/shared/CopyEmail";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 py-5 flex items-center justify-between">
        <p className="font-sans text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>

        <div className="flex items-center gap-1">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 w-11 -m-1 rounded-lg text-muted-foreground hero-social-icon"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 w-11 -m-1 rounded-lg text-muted-foreground hero-social-icon"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <CopyEmail
            email={SITE_EMAIL}
            className="inline-flex items-center justify-center h-11 w-11 -m-1 rounded-lg text-muted-foreground hero-social-icon cursor-pointer"
            aria-label="Copy email address"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </CopyEmail>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
