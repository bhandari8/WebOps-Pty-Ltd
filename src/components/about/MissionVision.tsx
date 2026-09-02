import { Container } from "@/components/ui/Container";

export function MissionVision({ mission, vision }: { mission?: string; vision?: string }) {
  if (!mission && !vision) return null;

  return (
    <section className="py-16 sm:py-20 bg-surface-muted border-y border-border">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2">
          {mission ? (
            <div className="rounded-lg bg-white border border-border p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                Our Mission
              </h2>
              <p className="mt-3 text-base text-text-muted">{mission}</p>
            </div>
          ) : null}
          {vision ? (
            <div className="rounded-lg bg-white border border-border p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                Our Vision
              </h2>
              <p className="mt-3 text-base text-text-muted">{vision}</p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
