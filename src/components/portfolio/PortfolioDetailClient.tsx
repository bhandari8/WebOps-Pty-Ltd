import { PortfolioHero } from "./PortfolioHero";
import { PortfolioOverview } from "./PortfolioOverview";
import { PortfolioNarrative } from "./PortfolioNarrative";
import { PortfolioGallery } from "./PortfolioGallery";
import { CTASection } from "@/components/shared/CTASection";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioDetailClientProps {
  project: PortfolioProject;
}

export function PortfolioDetailClient({
  project,
}: PortfolioDetailClientProps) {
  return (
    <>
      <PortfolioHero project={project} />

      <PortfolioOverview project={project} />

      <PortfolioNarrative
        challenge={project.challenge}
        solution={project.solution}
        outcome={project.outcome}
      />

      <PortfolioGallery
        images={project.images}
        title={project.title}
      />

      <CTASection
        title="Have a similar project in mind?"
        description="Tell us what you're working on and we'll get back to you with next steps."
      />
    </>
  );
}