import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 group min-h-[44px]"
      aria-label="Back to home"
    >
      <ArrowLeft
        className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      <span
        className="font-display font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-200"
        style={{ letterSpacing: "-0.02em", fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
      >
        {SITE_NAME}
      </span>
    </Link>
  );
}
