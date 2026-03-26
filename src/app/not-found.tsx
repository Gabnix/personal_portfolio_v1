"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  const entry = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <div className="min-h-dvh flex flex-col">
      <title>404 — Jim Ling</title>

      {/* ── Main content — fills remaining height above footer ──── */}
      <div className="flex-1 flex items-center overflow-auto">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 w-full py-6">

          {/* ── Illustration ────────────────────────────────────── */}
          <div className="beaver-wrapper mb-5">
            <motion.div {...entry(0)}>
              <Image
                src="/beaver-404.png"
                alt="A confused beaver in a hard hat looking at a collapsed pile of sticks"
                width={2240}
                height={1190}
                className="beaver-img w-full"
                priority
              />
            </motion.div>
          </div>

          {/* ── Text block ────────────────────────────────────────── */}
          <div className="max-w-lg">

            <motion.p
              {...entry(0.08)}
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3"
            >
              404
            </motion.p>

            <motion.h1
              {...entry(0.14)}
              className="font-display font-semibold text-foreground leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Dam. A load-bearing link is missing.
            </motion.h1>

            <motion.p
              {...entry(0.2)}
              className="mt-3 font-sans text-muted-foreground leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 1.8vw, 0.9375rem)" }}
            >
              Our lead architect spent all morning on this path, but one crucial
              piece rolled away and the whole thing came down. We&apos;re
              currently in a bit of a structural crisis.
            </motion.p>

            <motion.div {...entry(0.26)} className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 min-h-[44px] font-sans text-base font-semibold text-foreground/85 hover:text-accent-signal transition-colors duration-300 group"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                <span>{"Help him rebuild "}<span className="text-accent-signal group-hover:text-inherit transition-colors duration-300">home</span></span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
