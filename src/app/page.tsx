import { LeftColumn } from "@/components/layout/LeftColumn";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
        <div className="lg:flex lg:gap-12 xl:gap-16">

          {/* ── Left Column — static intro on mobile, sticky sidebar on desktop ── */}
          <aside className="pt-16 pb-10 lg:pt-0 lg:pb-0 lg:flex-1 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <LeftColumn />
          </aside>

          {/* ── Right Column — scrollable content stream ─────────────────────── */}
          <div className="pb-20 lg:flex-1 lg:pt-16 lg:pb-[50vh] lg:min-w-0">
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>

        </div>
      </div>

      {/* Footer — mobile only; desktop uses the left column social icons */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
}
