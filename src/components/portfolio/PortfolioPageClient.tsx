"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/shared/CTASection";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioPageClientProps {
  projects: PortfolioProject[];
}

export function PortfolioPageClient({
  projects,
}: PortfolioPageClientProps) {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    if (category === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === category,
    );
  }, [projects, category]);

  return (
    <>
      <section className="bg-brand-navy py-16 text-white sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue-light">
              Portfolio
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Our work
            </h1>

            <p className="mt-6 text-lg text-slate-300 text-pretty">
              A selection of projects across web development, IT solutions,
              graphic design, and digital marketing.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <PortfolioFilter
            value={category}
            onChange={setCategory}
          />

          <div className="mt-8">
            <PortfolioGrid projects={filtered} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}