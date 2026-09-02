"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { useSpotlight } from "@/hooks/useSpotlight";

export function ServiceCard({ service, priority = false }: { service: Service; priority?: boolean }) {
  const { ref, onMouseMove } = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      href={`/services/${service.slug}`}
      className="spotlight group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-navy">
        {service.image ? (
          <Image
            src={service.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-text">{service.title}</h3>
        <p className="mt-2 text-sm text-text-muted flex-1">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
          Learn more
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              d="M3 7h8M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
