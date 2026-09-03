import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getActiveServices,
  getServiceBySlug,
} from "@/repositories/serviceRepository";
import { getPublishedPortfolioProjectsByServiceId } from "@/repositories/portfolioRepository";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getActiveServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || !service.active) {
    return {
      title: "Service",
    };
  }

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service || !service.active) {
    notFound();
  }

  const relatedProjects =
    await getPublishedPortfolioProjectsByServiceId(service.id);

  return (
    <ServiceDetailClient
      service={service}
      relatedProjects={relatedProjects}
    />
  );
}