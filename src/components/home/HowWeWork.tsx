"use client";

import { Search, PenTool, Hammer, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSpotlight } from "@/hooks/useSpotlight";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "We start by understanding your business, goals, and what success looks like.",
    icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    description: "We scope the work clearly — what's included, what it costs, and how long it takes.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description: "We design and build with regular check-ins, so there are no surprises at delivery.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Support",
    description: "We stay available after launch for updates, questions, and ongoing support.",
    icon: LifeBuoy,
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      data-aos="fade-up"
      data-aos-delay={index * 75}
      className="spotlight relative rounded-xl border border-border bg-white p-6 transition-colors hover:border-brand-blue/40"
    >
      <span className="text-sm font-semibold text-border" aria-hidden="true">
        {step.number}
      </span>
      <div
        className="mt-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-brand-blue"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-text">{step.title}</h3>
      <p className="mt-1.5 text-sm text-text-muted">{step.description}</p>
    </div>
  );
}

export function HowWeWork() {
  return (
    <section className="py-16 sm:py-20 bg-surface-muted border-y border-border">
      <Container>
        <div data-aos="fade-up">
          <SectionHeading
            eyebrow="How we work"
            title="A straightforward process from first call to launch"
            description="No black boxes — you'll know what's happening at every stage of the project."
          />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
