import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/marquee";

const TOOLS = [
  "Next.js",
  "WordPress",
  "Shopify",
  "Google Ads",
  "Meta Ads",
  "Google Workspace",
  "Microsoft 365",
  "Cloudflare",
  "Figma",
  "Mailchimp",
];

export function TechMarquee() {
  return (
    <section className="border-y border-border bg-white py-8" data-aos="fade-up">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-text-subtle">
          Platforms &amp; tools we work with
        </p>
      </Container>
      <div className="mt-6">
        <Marquee durationSeconds={32}>
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className="shrink-0 text-lg font-semibold text-text-subtle/70 transition-colors hover:text-text"
            >
              {tool}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
