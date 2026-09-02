"use client";

import { notFound } from "next/navigation";
import { useServiceBySlug } from "@/hooks/useServices";
import { usePortfolioProjects } from "@/hooks/usePortfolio";
import { ServiceHero } from "./ServiceHero";
import { ServiceFeatures } from "./ServiceFeatures";
import { RelevantPortfolio } from "./RelevantPortfolio";
import { WhyWebOps } from "@/components/shared/WhyWebOps";
import { CTASection } from "@/components/shared/CTASection";
import { Container } from "@/components/ui/Container";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Service } from "@/types/service";

export function ServiceDetailClient({ slug, initial }: { slug: string; initial: Service | null }) {
  const { data: service, loading, error, refetch } = useServiceBySlug(slug);
  const { data: allProjects } = usePortfolioProjects();

  const resolved = service ?? (loading ? initial : undefined);

  if (loading && !resolved) {
    return (
      <Container>
        <LoadingState label="Loading service" />
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

  if (!resolved) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Service not found."
          description="This service may have been renamed or is no longer available."
        />
      </Container>
    );
  }

  if (!resolved.active) {
    notFound();
  }

  const relatedProjects = (allProjects ?? []).filter((p) => p.services.includes(resolved.title));

  return (
    <>
      <ServiceHero service={resolved} />
      <ServiceFeatures description={resolved.description} features={resolved.features} />
      <RelevantPortfolio serviceTitle={resolved.title} projects={relatedProjects} />
      <WhyWebOps eyebrow="Why WebOps" title={`Why choose WebOps for ${resolved.title.toLowerCase()}`} />
      <CTASection
        title={`Ready to get started with ${resolved.title.toLowerCase()}?`}
        description="Tell us about your project and we'll follow up with next steps."
        primaryHref={`/contact?service=${encodeURIComponent(resolved.title)}`}
      />
    </>
  );
}
