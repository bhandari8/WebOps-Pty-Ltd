interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl sm:text-4xl font-semibold tracking-tight text-text text-balance">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-text-muted text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
