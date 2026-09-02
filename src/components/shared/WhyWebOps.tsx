import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const WHY_WEBOPS_REASONS = [
  {
    title: "One team, fewer handoffs",
    description:
      "Web, IT, design, and advertising work together under one roof, so your website, systems, and marketing stay consistent.",
  },
  {
    title: "Clear communication",
    description:
      "We explain decisions in plain language and keep you informed at each stage of a project — no jargon, no guesswork.",
  },
  {
    title: "Support that continues after launch",
    description:
      "Projects don't end at delivery. We're available for ongoing support, updates, and maintenance as your business changes.",
  },
  {
    title: "Solutions sized to your business",
    description:
      "We recommend what actually fits your business today, with room to grow — not unnecessary complexity.",
  },
];

interface WhyWebOpsProps {
  eyebrow?: string;
  title?: string;
  bordered?: boolean;
}

export function WhyWebOps({
  eyebrow = "Why WebOps",
  title = "A practical approach to technology and design",
  bordered = false,
}: WhyWebOpsProps) {
  return (
    <section className={`py-16 sm:py-20 ${bordered ? "bg-surface-muted border-y border-border" : ""}`}>
      <Container>
        <div data-aos="fade-up">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {WHY_WEBOPS_REASONS.map((reason, i) => (
            <div
              key={reason.title}
              className="flex gap-4"
              data-aos="fade-up"
              data-aos-delay={i * 75}
            >
              <div
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-brand-blue"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3.5 9.5l3.5 3.5 7.5-8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text">{reason.title}</h3>
                <p className="mt-1.5 text-sm text-text-muted">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
