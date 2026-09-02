import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CapabilitiesList({ capabilities }: { capabilities: string[] }) {
  if (capabilities.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-surface-muted border-y border-border">
      <Container>
        <SectionHeading eyebrow="What we do" title="Our capabilities" />
        <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-3 text-text-muted">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="mt-0.5 shrink-0 text-brand-blue"
                aria-hidden="true"
              >
                <path
                  d="M3.5 9.5l3.5 3.5 7.5-8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
