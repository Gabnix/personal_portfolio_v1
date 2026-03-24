"use client";

import { useEffect, useRef, useState } from "react";
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <span className="relative inline-flex">
      <motion.button
        type="button"
        onClick={handleClick}
        className={cn("cursor-copy", className)}
        aria-label={ariaLabel ?? `Copy ${email} to clipboard`}
        whileHover={shouldReduceMotion ? undefined : whileHover}
        transition={transition}
      >
        {children}
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none font-sans font-medium text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
