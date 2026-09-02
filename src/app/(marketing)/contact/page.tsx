import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { Container } from "@/components/ui/Container";
import { LoadingState } from "@/components/ui/LoadingState";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteSettings.companyName} to discuss your project.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <LoadingState label="Loading contact form" rows={1} />
        </Container>
      }
    >
      <ContactPageClient />
    </Suspense>
  );
}
