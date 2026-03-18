import { AnimatedWrapper } from "./AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

interface SectionHeaderProps {
  label: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ label, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <AnimatedWrapper variant={fadeInUp} className={centered ? "text-center" : ""}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{label}</h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </AnimatedWrapper>
  );
}
