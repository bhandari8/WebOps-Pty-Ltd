import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/link-button";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  backgroundImage?: string;
}

export function CTASection({
  title = "Ready to talk about your project?",
  description = "Tell us a bit about what you need and we'll get back to you with next steps.",
  primaryLabel = "Get a Quote",
  primaryHref = "/contact",
  secondaryLabel = "View Our Work",
  secondaryHref = "/portfolio",
  backgroundImage,
}: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div
          className="relative overflow-hidden rounded-xl bg-brand-navy px-6 py-14 sm:px-16 sm:py-16 text-center"
          data-aos="fade-up"
        >
          {backgroundImage ? (
            <>
              <Image
                src={backgroundImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 80rem, 100vw"
                className="object-cover opacity-25"
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/90 to-brand-navy"
                aria-hidden="true"
              />
            </>
          ) : null}
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white text-balance max-w-2xl mx-auto">
              {title}
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto text-pretty">{description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <LinkButton href={primaryHref}>{primaryLabel}</LinkButton>
              <LinkButton
                href={secondaryHref}
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                {secondaryLabel}
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
