import type { PortfolioProject } from "@/types/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No portfolio projects available."
        description="Try a different category, or check back soon as we add more work."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <PortfolioCard key={project.id} project={project} priority={i === 0} />
      ))}
    </div>
  );
}
