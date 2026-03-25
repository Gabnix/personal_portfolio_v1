import { LeftColumn } from "@/components/layout/LeftColumn";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
        <div className="lg:flex lg:gap-16 xl:gap-24">

          {/* ── Left Column — static intro on mobile, sticky sidebar on desktop ── */}
          <aside className="pt-16 pb-10 lg:pt-0 lg:pb-0 lg:w-[360px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <LeftColumn />
          </aside>

          {/* ── Right Column — scrollable content stream ─────────────────────── */}
          <div className="lg:flex-1 lg:py-24 lg:min-w-0">
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ContactSection />
          </div>

        </div>
      </div>
    </div>
  );
}
