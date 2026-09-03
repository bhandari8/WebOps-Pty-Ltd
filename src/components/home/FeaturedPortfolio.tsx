import type { PortfolioProject } from "@/types/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/link-button";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

interface FeaturedPortfolioProps {
  projects: PortfolioProject[];
}

export function FeaturedPortfolio({
  projects,
}: FeaturedPortfolioProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <SectionHeading
            eyebrow="Our work"
            title="A sample of recent projects"
            description="A look at the kind of work we do across web development, IT, design, and marketing."
          />

          <LinkButton
            href="/portfolio"
            variant="outline"
            marketing={false}
            className="h-10 shrink-0 px-5"
          >
            View All Work
          </LinkButton>
        </div>

        <div
          className="mt-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <PortfolioGrid projects={projects} />
        </div>
      </Container>
    </section>
  );
}