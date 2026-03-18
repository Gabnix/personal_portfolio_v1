import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";

export const metadata: Metadata = {
  title: "About — Gabriel",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">
      <SectionHeader
        label="About Me"
        subtitle="Software engineer, builder, and lifelong learner."
      />

      <div className="mt-12 grid md:grid-cols-3 gap-12">
        <AnimatedWrapper variant={fadeInUp} className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a software engineer focused on building modern web
            applications. I have experience across the full stack, from
            designing REST APIs to crafting pixel-perfect UIs.
          </p>
          <p>
            I care deeply about developer experience, code quality, and
            performance. I believe great software is built through clear
            communication and thoughtful iteration.
          </p>
          <p>
            Outside of work, I&apos;m interested in open source, design
            systems, and the intersection of engineering and craft.
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper variant={fadeInUp} delay={0.1} className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-muted-foreground text-sm">Your City, Country</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-muted-foreground text-sm">
              B.S. Computer Science
              <br />
              University Name, Year
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Interests</h3>
            <p className="text-muted-foreground text-sm">
              Open source, design systems, music, reading
            </p>
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
}
