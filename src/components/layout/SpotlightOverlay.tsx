"use client";

import { useEffect } from "react";

export function SpotlightOverlay() {
  useEffect(() => {
    // Skip spotlight tracking on touch/coarse-pointer devices (phones, tablets)
    if (window.matchMedia("(pointer: coarse)").matches) return;

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
          "radial-gradient(600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), var(--spotlight-color), transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}
