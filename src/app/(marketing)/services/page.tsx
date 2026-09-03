import type { Metadata } from "next";

import { ServicesPageClient } from "@/components/services/ServicesPageClient";
import { getActiveServices } from "@/repositories/serviceRepository";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, IT solutions, graphic design, and digital marketing services from WebOps Pty Ltd.",
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <ServicesPageClient services={services} />
  );
}