import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "svc-web-development",
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "Custom websites and web applications built to be fast, reliable, and easy to manage.",
    description:
      "We design and build websites and web applications for businesses that need more than a template can offer. From marketing sites to custom web platforms, we focus on clean architecture, solid performance, and interfaces that are straightforward to use and maintain.",
    image: "/images/photos/web-development-image.webp",
    features: [
      "Custom website design and development",
      "Web application development",
      "Content-managed and editable websites",
      "E-commerce foundations",
      "Ongoing maintenance and support",
      "Performance and accessibility best practices",
    ],
    featured: true,
    active: true,
    order: 1,
  },
  {
    id: "svc-it-solutions",
    slug: "it-solutions",
    title: "IT Solutions",
    shortDescription:
      "Practical IT support and infrastructure services to keep your business running smoothly.",
    description:
      "We help businesses set up, manage, and troubleshoot the technology they rely on day to day — from workstations and networks to cloud services and general IT support. Our approach is straightforward: understand what you need, recommend sensible options, and keep things running.",
    image: "/images/photos/IT-solution.jpg",
    features: [
      "IT support and troubleshooting",
      "Network setup and management",
      "Cloud services configuration",
      "Hardware and software recommendations",
      "Data backup planning",
      "IT consulting for small and medium businesses",
    ],
    featured: true,
    active: true,
    order: 2,
  },
  {
    id: "svc-graphic-design",
    slug: "graphic-design",
    title: "Graphic Design",
    shortDescription:
      "Brand identity and visual design that helps your business look professional and consistent.",
    description:
      "Good design builds trust. We create brand identities, marketing materials, and visual assets that give businesses a consistent, professional presence across their website, print materials, and social channels.",
    image: "/images/photos/Graphic-Design.webp",
    features: [
      "Logo and brand identity design",
      "Marketing collateral design",
      "Social media graphics",
      "Brand guidelines",
      "Print-ready design files",
      "Website and digital visual assets",
    ],
    featured: true,
    active: true,
    order: 3,
  },
  {
    id: "svc-digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Google Ads and Meta advertising campaigns designed to reach the right audience.",
    description:
      "We plan and manage digital advertising campaigns across Google Ads and Meta (Facebook and Instagram) to help businesses reach the right audience and track meaningful results. Every campaign is built around clear goals and transparent reporting.",
    image: "/images/photos/Digital-marketing.jpg",
    features: [
      "Google Ads campaign setup and management",
      "Meta (Facebook & Instagram) advertising",
      "Audience targeting and research",
      "Campaign performance reporting",
      "Landing page recommendations",
      "Ongoing optimisation",
    ],
    featured: true,
    active: true,
    order: 4,
  },
];
