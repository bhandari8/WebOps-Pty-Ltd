import type { Service } from "@/types/service";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";

interface ServicesOverviewProps {
  services: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="border-y border-border bg-surface-muted py-16 sm:py-20">
      <Container>
        <div data-aos="fade-up">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around what growing businesses actually need"
            description="From a new website to ongoing IT support, brand design, and paid advertising — pick one service or work with us across the board."
          />
        </div>

        <div className="mt-10" data-aos="fade-up" data-aos-delay="100">
          <ServiceGrid services={services} />
        </div>
      </Container>
    </section>
  );
}