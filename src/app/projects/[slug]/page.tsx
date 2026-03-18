import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { BackToProjects, ProjectLinks } from "@/components/shared/ProjectLinks";
import { getProjectBySlug, projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} — Gabriel` : "Project Not Found" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
      <AnimatedWrapper>
        <BackToProjects />

        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {project.thumbnail && (
          <div className="mt-8 aspect-video rounded-xl bg-muted overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-8">
          <p className="text-muted-foreground leading-relaxed">
            {project.longDescription ?? project.description}
          </p>
        </div>

        <ProjectLinks github={project.github} live={project.live} />
      </AnimatedWrapper>
    </div>
  );
}
