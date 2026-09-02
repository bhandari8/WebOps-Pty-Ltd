"use client";

import { usePortfolioProjectBySlug } from "@/hooks/usePortfolio";
import { PortfolioHero } from "./PortfolioHero";
import { PortfolioOverview } from "./PortfolioOverview";
import { PortfolioNarrative } from "./PortfolioNarrative";
import { PortfolioGallery } from "./PortfolioGallery";
import { CTASection } from "@/components/shared/CTASection";
import { Container } from "@/components/ui/Container";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PortfolioProject } from "@/types/portfolio";

export function PortfolioDetailClient({
  slug,
  initial,
}: {
  slug: string;
  initial: PortfolioProject | null;
}) {
  const { data: project, loading, error, refetch } = usePortfolioProjectBySlug(slug);
  const resolved = project ?? (loading ? initial : undefined);

  if (loading && !resolved) {
    return (
      <Container>
        <LoadingState label="Loading project" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState onRetry={refetch} />
      </Container>
    );
  }

  if (!resolved || !resolved.published) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Project not found."
          description="This project may have been removed or is not currently published."
        />
      </Container>
    );
  }

  return (
    <>
      <PortfolioHero project={resolved} />
      <PortfolioOverview project={resolved} />
      <PortfolioNarrative
        challenge={resolved.challenge}
        solution={resolved.solution}
        outcome={resolved.outcome}
      />
      <PortfolioGallery images={resolved.images} title={resolved.title} />
      <CTASection
        title="Have a similar project in mind?"
        description="Tell us what you're working on and we'll get back to you with next steps."
      />
    </>
  );
}
