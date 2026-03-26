"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type CopyEmailProps = {
  email: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
} & Pick<MotionProps, "whileHover" | "transition">;

export function CopyEmail({
  email,
  children,
  className,
  "aria-label": ariaLabel,
  whileHover,
  transition,
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  function handleClick() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <span className="relative inline-flex">
        <motion.button
          type="button"
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(className)}
          aria-label={ariaLabel ?? `Copy ${email} to clipboard`}
          whileHover={shouldReduceMotion ? undefined : whileHover}
          transition={transition}
        >
          {children}
        </motion.button>
        {/* Screen reader announcement */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </span>

      {/* Custom cursor label — rendered at root level via portal-like fixed position */}
      <AnimatePresence>
        {hovered && !shouldReduceMotion && (
          <motion.span
            key="cursor-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[999] pointer-events-none"
            style={{ left: pos.x + 14, top: pos.y - 10 }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-background">
              {copied ? "Copied" : "Copy"}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}
