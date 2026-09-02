"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { CTASection } from "@/components/shared/CTASection";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { usePortfolioProjects } from "@/hooks/usePortfolio";

export function PortfolioPageClient() {
  const { data: projects, loading, error, refetch } = usePortfolioProjects();
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const all = projects ?? [];
    if (category === "All") return all;
    return all.filter((p) => p.category === category);
  }, [projects, category]);

  return (
    <>
      <section className="bg-brand-navy text-white py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue-light">
              Portfolio
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              Our work
            </h1>
            <p className="mt-6 text-lg text-slate-300 text-pretty">
              A selection of projects across web development, IT solutions, graphic design, and
              digital marketing.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <PortfolioFilter value={category} onChange={setCategory} />
          <div className="mt-8">
            {loading ? (
              <LoadingState label="Loading portfolio" rows={6} />
            ) : error ? (
              <ErrorState onRetry={refetch} />
            ) : (
              <PortfolioGrid projects={filtered} />
            )}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
