import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@/types/portfolio";

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-text">{value}</dd>
    </div>
  );
}

export function PortfolioOverview({ project }: { project: PortfolioProject }) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-text">Project Overview</h2>
          <p className="mt-4 text-base text-text-muted text-pretty">{project.description}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-muted p-6">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
            <Fact label="Client" value={project.client} />
            <Fact label="Industry" value={project.industry} />
            <Fact label="Category" value={project.category} />
          </dl>
          {project.services.length > 0 ? (
            <div className="mt-6">
              <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                Services provided
              </dt>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <Badge key={service} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
          {project.technologies && project.technologies.length > 0 ? (
            <div className="mt-6">
              <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                Technologies &amp; tools
              </dt>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
