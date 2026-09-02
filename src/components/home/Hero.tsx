import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/link-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <Image
        src="/images/photos/office-skyline-boardroom.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative py-20 sm:py-28 lg:py-32" data-aos="fade-up">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue-light">
            Australian IT &amp; Digital Services
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Practical technology for growing Australian businesses
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-xl text-pretty">
            WebOps helps businesses build reliable websites, manage IT infrastructure, design
            professional brand assets, and run digital advertising campaigns — with clear
            communication from start to finish.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LinkButton href="/contact">Get a Quote</LinkButton>
            <LinkButton
              href="/portfolio"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              View Our Work
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
