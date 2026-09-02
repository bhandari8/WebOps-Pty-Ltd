import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function AboutHero({ title, introduction }: { title: string; introduction: string }) {
  return (
    <section className="bg-brand-navy text-white py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue-light">About</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="mt-6 text-lg text-slate-300 text-pretty">{introduction}</p>
        </div>
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
          <Image
            src="/images/photos/workspace-flatlay.jpg"
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
