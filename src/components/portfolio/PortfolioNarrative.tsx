import { Container } from "@/components/ui/Container";

interface NarrativeBlock {
  label: string;
  heading: string;
  body?: string;
}

export function PortfolioNarrative({
  challenge,
  solution,
  outcome,
}: {
  challenge?: string;
  solution?: string;
  outcome?: string;
}) {
  const blocks: NarrativeBlock[] = [
    { label: "01", heading: "Challenge", body: challenge },
    { label: "02", heading: "Solution", body: solution },
    { label: "03", heading: "Outcome", body: outcome },
  ].filter((b) => b.body);

  if (blocks.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-surface-muted border-y border-border">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3">
          {blocks.map((block) => (
            <div key={block.heading}>
              <span className="text-sm font-semibold text-brand-blue">{block.label}</span>
              <h3 className="mt-2 text-lg font-semibold text-text">{block.heading}</h3>
              <p className="mt-3 text-sm text-text-muted">{block.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
