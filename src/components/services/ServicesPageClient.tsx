"use client";

import { Container } from "@/components/ui/Container";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { CTASection } from "@/components/shared/CTASection";
import { useServices } from "@/hooks/useServices";

export function ServicesPageClient() {
  const { data: services, loading, error, refetch } = useServices(true);

  return (
    <>
      <section className="bg-brand-navy text-white py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue-light">
              Services
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              What we do
            </h1>
            <p className="mt-6 text-lg text-slate-300 text-pretty">
              Four core services that cover what most growing businesses need from a technology
              and marketing partner.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {loading ? (
            <LoadingState label="Loading services" rows={4} />
          ) : error ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <ServiceGrid services={services ?? []} />
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
