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
    const handleScroll = () => {
      if (suppressRef.current) return;

      const vh = window.innerHeight;
      const center = vh / 2;
      let active = "";
      let closestDist = Infinity;

      for (const { sectionId } of NAV_ITEMS) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();

        // Skip sections entirely outside the viewport
        if (bottom <= 0 || top >= vh) continue;

        // Midpoint of the visible slice of this section
        const visibleCenter = (Math.max(top, 0) + Math.min(bottom, vh)) / 2;
        const dist = Math.abs(visibleCenter - center);

        if (dist < closestDist) {
          closestDist = dist;
          active = sectionId;
        }
      }

      if (active) setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((sectionId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    // "About" lives at the very top — scroll to 0 instead of the element
    if (sectionId === "about") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
              style={{ fontSize: "clamp(1.725rem, 3.45vw, 2.15rem)", letterSpacing: "-0.025em" }}
            >
              Jim Ling
            </h1>
          </Link>
          <p
            className="mt-2 font-display font-medium text-foreground/60 dark:text-foreground/80"
            style={{ fontSize: "clamp(1rem, 1.725vw, 1.15rem)", letterSpacing: "-0.01em" }}
          >
            Software Engineer
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-sm">
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
                onClick={(e) => handleNavClick(sectionId, e)}
                className="group flex items-center gap-4 py-0.5"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "block h-px flex-shrink-0 transition-all duration-300 ease-out",
                    isActive
                      ? "w-16 bg-accent-signal"
                      : "w-8 bg-muted-foreground/40 group-hover:w-12 group-hover:bg-muted-foreground/70"
                  )}
                />
                <span
                  className={cn(
                    "font-sans text-[14px] font-medium uppercase tracking-[0.18em] transition-colors duration-200",
                    isActive
                      ? "text-accent-signal"
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
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground hero-social-icon"
          aria-label="GitHub"
        >
          <Github className="h-[21px] w-[21px]" aria-hidden="true" />
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground hero-social-icon"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-[21px] w-[21px]" aria-hidden="true" />
        </a>
        <CopyEmail
          email={SITE_EMAIL}
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground hero-social-icon cursor-pointer"
          aria-label="Copy email address"
        >
          <Mail className="h-[21px] w-[21px]" aria-hidden="true" />
        </CopyEmail>
        <ThemeToggle />
      </motion.div>

    </div>
  );
}
