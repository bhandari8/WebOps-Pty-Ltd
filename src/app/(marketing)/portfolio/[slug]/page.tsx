import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getPortfolioProjectBySlug,
  getPublishedPortfolioProjects,
} from "@/repositories/portfolioRepository";

import { PortfolioDetailClient } from "@/components/portfolio/PortfolioDetailClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getPublishedPortfolioProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = await getPortfolioProjectBySlug(slug);

  if (!project || !project.published) {
    return {
      title: "Project",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getPortfolioProjectBySlug(slug);

  if (!project || !project.published) {
    notFound();
  }

  return <PortfolioDetailClient project={project} />;
}