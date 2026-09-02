import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { PortfolioProject } from "@/types/portfolio";

export function RelevantPortfolio({
  serviceTitle,
  projects,
}: {
  serviceTitle: string;
  projects: PortfolioProject[];
}) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-surface-muted border-y border-border">
      <Container>
        <SectionHeading
          eyebrow="Related work"
          title={`${serviceTitle} projects`}
          description="A look at recent projects where this service was part of the work."
        />
        <div className="mt-10">
          <PortfolioGrid projects={projects.slice(0, 3)} />
        </div>
      </Container>
    </section>
  );
}
