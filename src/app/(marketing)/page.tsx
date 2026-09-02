import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { HomeFeatureBento } from "@/components/home/HomeFeatureBento";
import { HowWeWork } from "@/components/home/HowWeWork";
import { TechMarquee } from "@/components/home/TechMarquee";
import { FeaturedPortfolio } from "@/components/home/FeaturedPortfolio";
import { CTASection } from "@/components/shared/CTASection";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { ScrollAnimations } from "@/components/home/ScrollAnimations";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: `${siteSettings.companyName} | ${siteSettings.tagline}`,
  description: siteSettings.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <ScrollAnimations />
      <Hero />
      <TechMarquee />
      <CompanyIntro />
      <ServicesOverview />
      <HowWeWork />
      <HomeFeatureBento />
      <FeaturedPortfolio />
      <CTASection backgroundImage="/images/photos/client-working-laptop.jpg" />
    </>
  );
}
