import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { ENQUIRY_SERVICE_OPTIONS } from "@/types/enquiry";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteSettings.companyName} to discuss your project.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;

  const requestedService = Array.isArray(params.service)
    ? params.service[0] ?? ""
    : params.service ?? "";

  const initialService = ENQUIRY_SERVICE_OPTIONS.includes(
    requestedService as (typeof ENQUIRY_SERVICE_OPTIONS)[number],
  )
    ? requestedService
    : "";

  return <ContactPageClient initialService={initialService} />;
}