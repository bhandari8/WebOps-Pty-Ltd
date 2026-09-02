import type { Metadata } from "next";
import { PortfolioPageClient } from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of WebOps Pty Ltd projects across web development, IT solutions, graphic design, and digital marketing.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
