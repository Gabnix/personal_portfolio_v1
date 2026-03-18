import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/types";

const categoryColors: Record<Skill["category"], string> = {
  language: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  framework: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  database: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  tool: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
};

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge className={`${categoryColors[skill.category]} border-0 font-medium`}>
      {skill.name}
    </Badge>
  );
}
