"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS, SITE_EMAIL } from "@/lib/constants";
import { CopyEmail } from "@/components/shared/CopyEmail";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const entry = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section className="min-h-screen flex flex-col justify-center pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">

        {/* ── Name + Role ─────────────────────────────────────────────── */}
        <motion.div {...entry(0)}>
          <h1
            className="font-display font-semibold leading-none text-foreground/90"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Jim Hie
          </h1>
          <p
            className="font-display font-light text-muted-foreground mt-4"
            style={{
              fontSize: "clamp(1.25rem, 3.5vw, 2.25rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Software Engineer
          </p>
        </motion.div>

        {/* ── Static focus line — replaces rotating ticker ────────────── */}
        <motion.p
          {...entry(0.2)}
          className="mt-6 text-muted-foreground leading-relaxed max-w-lg"
          style={{ fontSize: "clamp(1rem, 2vw, 1.0625rem)" }}
        >
          Building high-performance web systems, from distributed backends
          to precise, crafted UIs.
        </motion.p>

        {/* ── Social links — primary position ────────────────────────── */}
        <motion.div
          {...entry(0.35)}
          className="mt-12 flex items-center gap-1"
        >
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 w-11 -m-1 rounded-lg text-muted-foreground hero-social-icon"
            aria-label="GitHub"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 w-11 -m-1 rounded-lg text-muted-foreground hero-social-icon"
            aria-label="LinkedIn"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </motion.a>
          <CopyEmail
            email={SITE_EMAIL}
            className="inline-flex items-center justify-center h-11 w-11 -m-1 rounded-lg text-muted-foreground hero-social-icon"
            aria-label="Copy email address"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </CopyEmail>
        </motion.div>


      </div>
    </section>
  );
}
