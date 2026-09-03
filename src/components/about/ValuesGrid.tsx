import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutValue } from "@/types/about";

export function ValuesGrid({ values }: { values: AboutValue[] }) {
  if (values.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our values" title="What guides how we work" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-lg border border-border p-6">
              <h3 className="text-base font-semibold text-text">{value.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
  
}
