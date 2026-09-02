import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CompanyIntro() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div data-aos="fade-up">
          <SectionHeading
            eyebrow="Who we are"
            title="An IT and digital partner for businesses that want things done properly"
            description="WebOps Pty Ltd works with small and medium Australian businesses across web development, IT support, design, and digital advertising — bringing everything a growing business needs from one team."
          />
        </div>
        <div
          className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Image
            src="/images/photos/team-collaboration.jpg"
            alt="A small team working together on laptops around a table"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
