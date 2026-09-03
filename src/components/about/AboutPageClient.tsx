"use client";

import { AboutHero } from "./AboutHero";
import { MissionVision } from "./MissionVision";
import { ValuesGrid } from "./ValuesGrid";
import { CapabilitiesList } from "./CapabilitiesList";
import { CTASection } from "@/components/shared/CTASection";
import type { AboutContent } from "@/types/about";

interface AboutPageClientProps {
  about: AboutContent;
}

export function AboutPageClient({ about }: AboutPageClientProps) {
  return (
    <>
      <AboutHero
        title={about.title}
        introduction={about.introduction}
      />

      <MissionVision
        mission={about.mission}
        vision={about.vision}
      />

      <ValuesGrid values={about.values ?? []} />

      <CapabilitiesList
        capabilities={about.capabilities ?? []}
      />

      <CTASection
        title="Want to know more about how we work?"
        description="Get in touch and we'll walk you through how we can help your business."
      />
    </>
  );
}