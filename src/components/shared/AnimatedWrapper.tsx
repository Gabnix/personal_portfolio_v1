"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
}

export function AnimatedWrapper({
  children,
  variant = fadeInUp,
  className,
  delay,
}: AnimatedWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const resolvedVariant: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : delay
      ? {
          ...variant,
          visible: {
            ...(typeof variant.visible === "object" ? variant.visible : {}),
            transition: {
              ...(typeof variant.visible === "object" &&
              "transition" in variant.visible
                ? (variant.visible.transition as object)
                : {}),
              delay,
            },
          },
        }
      : variant;

  return (
    <motion.div
      variants={resolvedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
