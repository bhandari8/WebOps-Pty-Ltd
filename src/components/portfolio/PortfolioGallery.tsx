import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PortfolioGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Gallery" title="Project gallery" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border bg-brand-navy"
            >
              <Image
                src={src}
                alt={`${title} — screenshot ${i + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
