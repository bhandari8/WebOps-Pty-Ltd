"use client";

import { ServiceHero } from "./ServiceHero";
import { ServiceFeatures } from "./ServiceFeatures";
import { RelevantPortfolio } from "./RelevantPortfolio";
import { WhyWebOps } from "@/components/shared/WhyWebOps";
import { CTASection } from "@/components/shared/CTASection";
import type { Service } from "@/types/service";
import type { PortfolioProject } from "@/types/portfolio";

interface ServiceDetailClientProps {
  service: Service;
  relatedProjects: PortfolioProject[];
}

export function ServiceDetailClient({
  service,
  relatedProjects,
}: ServiceDetailClientProps) {
  return (
    <>
      <ServiceHero service={service} />

      <ServiceFeatures
        description={service.description}
        features={service.features}
      />

      <RelevantPortfolio
        serviceTitle={service.title}
        projects={relatedProjects}
      />

      <WhyWebOps
        eyebrow="Why WebOps"
        title={`Why choose WebOps for ${service.title.toLowerCase()}`}
      />

      <CTASection
        title={`Ready to get started with ${service.title.toLowerCase()}?`}
        description="Tell us about your project and we'll follow up with next steps."
        primaryHref={`/contact?service=${encodeURIComponent(service.title)}`}
      />
    </>
  );
}