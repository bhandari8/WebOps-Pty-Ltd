import Image from "next/image";
import { Users, MessageCircle, LifeBuoy, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_WEBOPS_REASONS } from "@/components/shared/WhyWebOps";

const ICONS = [Users, MessageCircle, LifeBuoy, Layers];

export function HomeFeatureBento() {
  const [spotlight, ...rest] = WHY_WEBOPS_REASONS;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div data-aos="fade-up">
          <SectionHeading eyebrow="Why WebOps" title="A practical approach to technology and design" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[10rem]">
          <div
            className="group relative overflow-hidden rounded-xl border border-border sm:col-span-2 lg:row-span-2 lg:col-span-2"
            data-aos="fade-up"
          >
            <Image
              src="/images/photos/team-collaboration.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-navy via-brand-navy/60 to-brand-navy/10" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <Users className="h-6 w-6 text-brand-blue-light" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-white">{spotlight.title}</h3>
              <p className="mt-1.5 text-sm text-slate-300 max-w-sm">{spotlight.description}</p>
            </div>
          </div>

          {rest.map((reason, i) => {
            const Icon = ICONS[i + 1] ?? Layers;
            return (
              <div
                key={reason.title}
                className="rounded-xl border border-border bg-white p-6 flex flex-col justify-center transition-colors hover:border-brand-blue/40 hover:bg-blue-50/30"
                data-aos="fade-up"
                data-aos-delay={(i + 1) * 75}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-brand-blue"
                  aria-hidden="true"
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-text">{reason.title}</h3>
                <p className="mt-1.5 text-sm text-text-muted">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
