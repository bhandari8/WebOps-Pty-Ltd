import type { Metadata } from "next";
import { getAboutContent } from "@/repositories/aboutRepository";
import { AboutPageClient } from "@/components/about/AboutPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutContent();
  return {
    title: about.title,
    description: about.introduction,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const initial = await getAboutContent();
  return <AboutPageClient initial={initial} />;
}
