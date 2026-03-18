"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackToProjects() {
  return (
    <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }), "mb-8 -ml-2")}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Projects
    </Link>
  );
}

interface ProjectLinksProps {
  github?: string;
  live?: string;
}

export function ProjectLinks({ github, live }: ProjectLinksProps) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Github className="mr-2 h-4 w-4" />
          View Code
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({}))}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Live Demo
        </a>
      )}
    </div>
  );
}
