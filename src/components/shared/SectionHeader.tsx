import { AnimatedWrapper } from "./AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

interface SectionHeaderProps {
  label: string;
  subtitle?: string;
  overline?: string;
  centered?: boolean;
}

export function SectionHeader({ label, subtitle, overline, centered = false }: SectionHeaderProps) {
  return (
    <AnimatedWrapper variant={fadeInUp} className={centered ? "text-center" : ""}>
      {overline && (
        <p className="font-medium text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
          {overline}
        </p>
      )}
      <h2
        className="font-display font-medium leading-tight text-foreground"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
      >
        {label}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedWrapper>
  );
}
