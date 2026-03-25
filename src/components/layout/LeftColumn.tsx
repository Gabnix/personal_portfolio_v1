"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS, SITE_EMAIL } from "@/lib/constants";
import { CopyEmail } from "@/components/shared/CopyEmail";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", sectionId: "about" },
  { label: "Experience", sectionId: "experience" },
  { label: "Stack", sectionId: "skills" },
  { label: "Contact", sectionId: "contact" },
] as const;

export function LeftColumn() {
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();
  const suppressRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !suppressRef.current) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: "-28% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    suppressRef.current = true;
    if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressRef.current = false;
    }, 1200);
  }, []);

  const entry = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.19, 1, 0.22, 1] as const, delay },
  });

  return (
    <div className="flex flex-col gap-10 lg:h-full lg:justify-between lg:py-24">

      {/* ── Identity ─────────────────────────────────────────────── */}
      <div>
        <motion.div {...entry(0)}>
          <Link href="/" aria-label="Home">
            <h1
              className="font-display font-semibold text-foreground leading-none hover:text-foreground/75 transition-colors duration-200"
              style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)", letterSpacing: "-0.025em" }}
            >
              Jim Ling
            </h1>
          </Link>
          <p
            className="mt-2 font-display font-medium text-foreground/60"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", letterSpacing: "-0.01em" }}
          >
            Software Engineer
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-[260px]">
            I build fast, reliable web systems with clean architecture and thoughtfully crafted UIs.
          </p>
        </motion.div>

        {/* ── Scroll-spy nav — desktop only ───────────────────────── */}
        <motion.nav
          {...entry(0.12)}
          className="hidden lg:flex flex-col gap-4 mt-12"
          aria-label="Page sections"
        >
          {NAV_ITEMS.map(({ label, sectionId }) => {
            const isActive = activeSection === sectionId;
            return (
              <a
                key={sectionId}
                href={`#${sectionId}`}
                onClick={() => handleNavClick(sectionId)}
                className="group flex items-center gap-4 py-0.5"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "block h-px flex-shrink-0 transition-all duration-300 ease-out",
                    isActive
                      ? "w-16 bg-foreground"
                      : "w-8 bg-muted-foreground/40 group-hover:w-12 group-hover:bg-muted-foreground/70"
                  )}
                />
                <span
                  className={cn(
                    "font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground/65"
                  )}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </motion.nav>
      </div>

      {/* ── Social + Theme ──────────────────────────────────────── */}
      <motion.div {...entry(0.28)} className="flex items-center gap-0.5 -ml-1">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github className="h-[18px] w-[18px]" aria-hidden="true" />
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
        </a>
        <CopyEmail
          email={SITE_EMAIL}
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
          aria-label="Copy email address"
        >
          <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
        </CopyEmail>
        <ThemeToggle />
      </motion.div>

    </div>
  );
}
