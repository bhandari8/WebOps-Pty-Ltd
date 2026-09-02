"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { ENQUIRY_SERVICE_OPTIONS } from "@/types/enquiry";

export function ContactPageClient() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") ?? "";
  const initialService = ENQUIRY_SERVICE_OPTIONS.includes(
    requestedService as (typeof ENQUIRY_SERVICE_OPTIONS)[number]
  )
    ? requestedService
    : "";

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Tell us about your project"
          description="Fill in the form and we'll get back to you with next steps — usually within one business day."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-lg border border-border p-6 sm:p-8">
            <ContactForm initialService={initialService} />
          </div>
          <ContactInfo />
        </div>
      </Container>
    </section>
  );
}
