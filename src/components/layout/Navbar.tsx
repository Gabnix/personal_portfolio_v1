"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { scrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const suppressObserverRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track which section is in view on the home page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sectionIds = [
      ...NAV_LINKS.filter((l) => l.href.startsWith("/#")).map((l) => l.href.slice(2)),
      "contact", // also watch the contact section on the home page
    ];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !suppressObserverRef.current) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.slice(2);
    }
    // Highlight /contact when scrolled to the contact section on home page too
    if (href === "/contact") {
      return pathname === "/contact" || (pathname === "/" && activeSection === "contact");
    }
    return pathname === href;
  };

  const handleHashLinkClick = (sectionId: string) => {
    // Immediately set the target section and suppress observer during scroll
    setActiveSection(sectionId);
    suppressObserverRef.current = true;
    if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressObserverRef.current = false;
    }, 1000);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      setActiveSection(null);
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — home anchor with smooth-scroll on / */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="inline-flex items-center min-h-[44px]"
          aria-label="Back to top"
        >
          <motion.span
            className="font-light text-foreground"
            style={{ letterSpacing: "-0.02em" }}
            whileHover={shouldReduceMotion ? {} : { opacity: 0.7 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {SITE_NAME}
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.href);
            const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={sectionId ? () => handleHashLinkClick(sectionId) : undefined}
                className={cn(
                  "inline-flex items-center min-h-[44px] px-1 text-sm border-b-2 transition-all",
                  isActive
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="w-11 h-11" />}>
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col gap-1 mt-8">
                {NAV_LINKS.map((link) => {
                  const isActive = isLinkActive(link.href);
                  const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        if (sectionId) handleHashLinkClick(sectionId);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center min-h-[44px] px-4 rounded-lg text-sm transition-all",
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground font-normal hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
