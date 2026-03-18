import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { staggerContainer } from "@/lib/animations";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Gabriel",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">
      <SectionHeader
        label="Projects"
        subtitle="Things I've built."
      />

      <AnimatedWrapper variant={staggerContainer} className="mt-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
