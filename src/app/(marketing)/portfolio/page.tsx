import type { Metadata } from "next";
import { getPublishedPortfolioProjects } from "@/repositories/portfolioRepository";
import { PortfolioPageClient } from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of WebOps Pty Ltd projects across web development, IT solutions, graphic design, and digital marketing.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default async function PortfolioPage() {
  const projects = await getPublishedPortfolioProjects();

  return <PortfolioPageClient projects={projects} />;
}