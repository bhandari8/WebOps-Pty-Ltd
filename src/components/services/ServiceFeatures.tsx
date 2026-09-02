import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export function ServiceFeatures({
  description,
  features,
}: {
  description: string;
  features: string[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Overview" title="What's included" />
          <p className="mt-5 text-base text-text-muted text-pretty">{description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
            Features &amp; Capabilities
          </h3>
          <ul className="mt-5 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
