import type { PortfolioProject } from "@/types/portfolio";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "prj-brightpath-retail-website",
    slug: "brightpath-retail-website",
    title: "Brightpath Retail Website",
    shortDescription:
      "A responsive marketing and catalogue website for a multi-location retail business.",
    description:
      "Brightpath needed a website that could represent multiple store locations, showcase their product range, and give the internal team an easy way to update content without relying on a developer for every change.",
    category: "Web Development",
    client: "Brightpath Retail (example client)",
    industry: "Retail",
    services: ["Web Development"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    thumbnail: "/images/portfolio/bright-path-website.png",
    images: [
      "/images/portfolio/brightpath-retail-website-thumb.svg",
      "/images/portfolio/brightpath-retail-website-gallery-1.svg",
      "/images/portfolio/brightpath-retail-website-gallery-2.svg",
    ],
    challenge:
      "The previous site was slow to update, was not mobile-friendly, and made it difficult for customers to find store-specific information.",
    solution:
      "We built a responsive, component-based website with a clear content structure, making it straightforward to add locations, update products, and maintain consistent branding across pages.",
    outcome:
      "The team can now update store and product information directly, and the site works consistently across mobile, tablet, and desktop.",
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: "prj-meridian-logistics-it-support",
    slug: "meridian-logistics-it-support",
    title: "Meridian Logistics IT Support",
    shortDescription:
      "Ongoing IT support and network management for a logistics operation with multiple sites.",
    description:
      "Meridian Logistics needed a reliable IT partner to manage day-to-day support requests, keep their network infrastructure stable, and help plan for future growth across their depots.",
    category: "IT Solutions",
    client: "Meridian Logistics (example client)",
    industry: "Logistics & Transport",
    services: ["IT Solutions"],
    technologies: ["Cloud backup", "Network monitoring", "Managed workstations"],
    thumbnail: "/images/portfolio/meridian-website.png",
    images: [
      "/images/portfolio/meridian-logistics-it-support-thumb.svg",
      "/images/portfolio/meridian-logistics-it-support-gallery-1.svg",
      "/images/portfolio/meridian-logistics-it-support-gallery-2.svg",
    ],
    challenge:
      "Inconsistent IT support across sites led to slow response times and no centralised view of infrastructure health.",
    solution:
      "We implemented a standard IT support process across all depots, set up centralised monitoring, and established a regular maintenance schedule.",
    outcome:
      "Support requests are now handled through a consistent process, with clearer visibility into network status across sites.",
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: "prj-harbourline-brand-identity",
    slug: "harbourline-brand-identity",
    title: "Harbourline Brand Identity",
    shortDescription:
      "A complete brand identity refresh for a professional services firm.",
    description:
      "Harbourline wanted a modern, professional brand identity that better reflected the quality of their work, along with guidelines the team could apply consistently across materials.",
    category: "Graphic Design",
    client: "Harbourline Partners (example client)",
    industry: "Professional Services",
    services: ["Graphic Design"],
    technologies: ["Brand guidelines", "Print collateral", "Digital assets"],
    thumbnail: "/images/portfolio/habourline-navy.png",
    images: [
      "/images/portfolio/harbourline-brand-identity-thumb.svg",
      "/images/portfolio/harbourline-brand-identity-gallery-1.svg",
      "/images/portfolio/harbourline-brand-identity-gallery-2.svg",
    ],
    challenge:
      "The existing brand was inconsistent across print and digital materials, with no defined guidelines for the team to follow.",
    solution:
      "We developed a refreshed visual identity, including logo refinement, colour and typography guidelines, and templates for common materials.",
    outcome:
      "Harbourline now has a consistent, documented brand identity that their team can apply across new materials.",
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: "prj-coastal-fitness-ad-campaign",
    slug: "coastal-fitness-ad-campaign",
    title: "Coastal Fitness Ad Campaign",
    shortDescription:
      "A Google Ads and Meta advertising campaign to support a local fitness studio's membership drive.",
    description:
      "Coastal Fitness wanted to promote a membership offer to a local audience across search and social platforms, with clear reporting on how the campaign was performing.",
    category: "Digital Marketing",
    client: "Coastal Fitness Studio (example client)",
    industry: "Health & Fitness",
    services: ["Digital Marketing"],
    technologies: ["Google Ads", "Meta Ads Manager"],
    thumbnail: "/images/portfolio/coastal-fitness-ad-campaign-thumb.svg",
    images: [
      "/images/portfolio/coastal-fitness-ad-campaign-thumb.svg",
      "/images/portfolio/coastal-fitness-ad-campaign-gallery-1.svg",
      "/images/portfolio/coastal-fitness-ad-campaign-gallery-2.svg",
    ],
    challenge:
      "The studio had not previously run paid campaigns and needed a targeted approach to reach the local area without overspending.",
    solution:
      "We set up geo-targeted campaigns across Google Ads and Meta, with creative tailored to the membership offer and regular reporting reviews.",
    outcome:
      "The studio gained a repeatable campaign structure they can reuse for future promotions, with clear reporting on campaign activity.",
    featured: false,
    published: true,
    order: 4,
  },
  {
    id: "prj-northgate-legal-web-platform",
    slug: "northgate-legal-web-platform",
    title: "Northgate Legal Web Platform",
    shortDescription:
      "A secure client-facing web platform for a legal services firm.",
    description:
      "Northgate Legal needed a professional web presence along with a simple, secure way for clients to view case updates and submit documents.",
    category: "Web Development",
    client: "Northgate Legal (example client)",
    industry: "Legal Services",
    services: ["Web Development", "IT Solutions"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    thumbnail: "/images/portfolio/northgate-legal-web-platform-thumb.svg",
    images: [
      "/images/portfolio/northgate-legal-web-platform-thumb.svg",
      "/images/portfolio/northgate-legal-web-platform-gallery-1.svg",
      "/images/portfolio/northgate-legal-web-platform-gallery-2.svg",
    ],
    challenge:
      "The firm's existing site did not reflect their professionalism and offered no way for clients to interact with the firm online.",
    solution:
      "We designed a clean, professional website and scoped a client-facing platform structure that can be extended with secure client accounts in future.",
    outcome:
      "The new site presents the firm professionally, with a clear foundation for future client-facing features.",
    featured: false,
    published: true,
    order: 5,
  },
  {
    id: "prj-aurora-clinic-network-upgrade",
    slug: "aurora-clinic-network-upgrade",
    title: "Aurora Clinic Network Upgrade",
    shortDescription:
      "A network and hardware upgrade for a growing allied health clinic.",
    description:
      "As Aurora Clinic added more practitioners, their existing network and hardware setup struggled to keep pace, leading to intermittent connectivity issues.",
    category: "IT Solutions",
    client: "Aurora Allied Health (example client)",
    industry: "Healthcare",
    services: ["IT Solutions"],
    technologies: ["Network hardware", "Wi-Fi coverage planning", "Backup systems"],
    thumbnail: "/images/portfolio/aurora-clinic-network-upgrade-thumb.svg",
    images: [
      "/images/portfolio/aurora-clinic-network-upgrade-thumb.svg",
      "/images/portfolio/aurora-clinic-network-upgrade-gallery-1.svg",
      "/images/portfolio/aurora-clinic-network-upgrade-gallery-2.svg",
    ],
    challenge:
      "Growing practitioner numbers exposed weak Wi-Fi coverage and an ageing network setup that was not built for the clinic's current size.",
    solution:
      "We assessed the clinic's layout, upgraded core network hardware, and improved Wi-Fi coverage across all consultation rooms.",
    outcome:
      "The clinic now has stable connectivity across the practice, with a network set up to accommodate future growth.",
    featured: false,
    published: true,
    order: 6,
  },
];
