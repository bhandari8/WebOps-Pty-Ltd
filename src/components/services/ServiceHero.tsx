import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import type { Service } from "@/types/service";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="bg-brand-navy text-white">
      <Container className="py-10">
        <PageBreadcrumb
          dark
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </Container>
      <Container className="pb-16 sm:pb-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
            {service.title}
          </h1>
          <p className="mt-6 text-lg text-slate-300 text-pretty">{service.shortDescription}</p>
        </div>
        {service.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
