"use client";

import { useEffect } from "react";

export function SpotlightOverlay() {
  useEffect(() => {
    const root = document.documentElement;
    const handleMouseMove = (e: MouseEvent) => {
      root.style.setProperty("--mouse-x", `${e.clientX}px`);
      root.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-[background] duration-500"
      style={{
        background:
          "radial-gradient(600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), oklch(0.62 0.16 145 / 0.08), transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}
