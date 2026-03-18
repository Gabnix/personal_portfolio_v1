"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { staggerContainer } from "@/lib/animations";
import { featuredProjects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeader
            label="Featured Projects"
            subtitle="A selection of work I'm proud of."
          />
          <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}>
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <AnimatedWrapper variant={staggerContainer}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
