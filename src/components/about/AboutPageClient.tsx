"use client";

import { useAboutContent } from "@/hooks/useAboutContent";
import { AboutHero } from "./AboutHero";
import { MissionVision } from "./MissionVision";
import { ValuesGrid } from "./ValuesGrid";
import { CapabilitiesList } from "./CapabilitiesList";
import { CTASection } from "@/components/shared/CTASection";
import { Container } from "@/components/ui/Container";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { AboutContent } from "@/types/about";

export function AboutPageClient({ initial }: { initial: AboutContent }) {
  const { data, loading, error, refetch } = useAboutContent();
  const about = data ?? initial;

  if (loading && !data) {
    return (
      <Container>
        <LoadingState label="Loading about content" />
      </Container>
    );
  }

  if (error && !data) {
    return (
      <Container>
        <ErrorState onRetry={refetch} />
      </Container>
    );
  }

  return (
    <>
      <AboutHero title={about.title} introduction={about.introduction} />
      <MissionVision mission={about.mission} vision={about.vision} />
      <ValuesGrid values={about.values ?? []} />
      <CapabilitiesList capabilities={about.capabilities ?? []} />
      <CTASection
        title="Want to know more about how we work?"
        description="Get in touch and we'll walk you through how we can help your business."
      />
    </>
  );
}
