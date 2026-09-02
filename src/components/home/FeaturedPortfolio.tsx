"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/link-button";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { usePortfolioProjects } from "@/hooks/usePortfolio";

export function FeaturedPortfolio() {
  const { data: projects, loading, error, refetch } = usePortfolioProjects();
  const featured = (projects ?? []).filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          data-aos="fade-up"
        >
          <SectionHeading
            eyebrow="Our work"
            title="A sample of recent projects"
            description="A look at the kind of work we do across web development, IT, design, and marketing."
          />
          <LinkButton href="/portfolio" variant="outline" marketing={false} className="h-10 px-5 shrink-0">
            View All Work
          </LinkButton>
        </div>
        <div className="mt-10" data-aos="fade-up" data-aos-delay="100">
          {loading ? (
            <LoadingState label="Loading portfolio" rows={3} />
          ) : error ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <PortfolioGrid projects={featured} />
          )}
        </div>
      </Container>
    </section>
  );
}
