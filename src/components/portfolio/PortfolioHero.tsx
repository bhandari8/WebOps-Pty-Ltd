import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/badge";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import type { PortfolioProject } from "@/types/portfolio";

export function PortfolioHero({ project }: { project: PortfolioProject }) {
  return (
    <section className="bg-brand-navy text-white">
      <Container className="py-10">
        <PageBreadcrumb
          dark
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title },
          ]}
        />
      </Container>
      <Container className="pb-16 sm:pb-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge variant="secondary">{project.category}</Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
            {project.title}
          </h1>
          <p className="mt-6 text-lg text-slate-300 text-pretty">{project.shortDescription}</p>
        </div>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
