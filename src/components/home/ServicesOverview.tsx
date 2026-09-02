"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useServices } from "@/hooks/useServices";

export function ServicesOverview() {
  const { data: services, loading, error, refetch } = useServices(true);

  return (
    <section className="py-16 sm:py-20 bg-surface-muted border-y border-border">
      <Container>
        <div data-aos="fade-up">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around what growing businesses actually need"
            description="From a new website to ongoing IT support, brand design, and paid advertising — pick one service or work with us across the board."
          />
        </div>
        <div className="mt-10" data-aos="fade-up" data-aos-delay="100">
          {loading ? (
            <LoadingState label="Loading services" rows={4} />
          ) : error ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <ServiceGrid services={services ?? []} />
          )}
        </div>
      </Container>
    </section>
  );
}
