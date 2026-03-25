"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { fadeInUp } from "@/lib/animations";
import { featuredProjects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-0">

      {/* ── Sticky section header — mobile only ──────────────────── */}
      <div className="lg:hidden sticky top-0 z-20 -mx-6 sm:-mx-10 px-6 sm:px-10 py-3 mb-3 backdrop-blur-md bg-background/70">
        <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Projects
        </span>
      </div>

      <div className="pb-12 lg:py-24">
        <div className="grid sm:grid-cols-2 gap-3">
          {featuredProjects.map((project, i) => (
            <AnimatedWrapper key={project.slug} variant={fadeInUp} delay={i * 0.07}>
              <div className="ghost-card group h-full p-5 flex flex-col gap-3">

                {/* Title + links */}
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className="font-display font-medium text-foreground/85 leading-snug group-hover:text-accent-signal transition-colors duration-300"
                    style={{ fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center h-7 w-7 -mr-1 rounded text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live site`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center h-7 w-7 -mr-1 rounded text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech pills */}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-pill">{tag}</span>
                    ))}
                  </div>
                )}

              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>

    </section>
  );
}
