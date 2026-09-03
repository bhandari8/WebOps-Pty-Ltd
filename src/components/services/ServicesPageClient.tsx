"use client";

import type { Service } from "@/types/service";

import { Container } from "@/components/ui/Container";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { CTASection } from "@/components/shared/CTASection";

interface ServicesPageClientProps {
  services: Service[];
}

export function ServicesPageClient({
  services,
}: ServicesPageClientProps) {
  return (
    <>
      <section className="bg-brand-navy py-16 text-white sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue-light">
              Services
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              What we do
            </h1>

            <p className="mt-6 text-lg text-slate-300 text-pretty">
              Four core services that cover what most
              growing businesses need from a technology
              and marketing partner.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <ServiceGrid services={services} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}