"use client";

import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { useSpotlight } from "@/hooks/useSpotlight";

export function PortfolioCard({
  project,
  priority = false,
}: {
  project: PortfolioProject;
  priority?: boolean;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      className="spotlight group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md"
    >
      <Link href={`/portfolio/${project.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-navy">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary">{project.category}</Badge>
        <h3 className="mt-3 text-lg font-semibold text-text">
          <Link
            href={`/portfolio/${project.slug}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-text-muted flex-1">{project.shortDescription}</p>
        <div className="mt-5">
          <LinkButton
            href={`/portfolio/${project.slug}`}
            variant="outline"
            marketing={false}
            className="h-9 px-4"
          >
            View Project
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
