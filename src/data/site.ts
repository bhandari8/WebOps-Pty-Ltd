import type { SiteSettings } from "@/types/site";

/**
 * Static site-wide settings. Replace with real WebOps company details
 * before launch — this is the single place that content is sourced from,
 * so every page updates automatically.
 */
export const siteSettings: SiteSettings = {
  companyName: "WebOps",
  legalName: "WebOps Pty Ltd",
  tagline: "Practical technology for growing Australian businesses",
  description:
    "WebOps Pty Ltd is an Australian IT and digital services company helping businesses build websites, manage IT infrastructure, and grow their brand online.",
  email: "hello@webops.com.au",
  phone: "+61 2 8000 0000",
  address: "Sydney, NSW, Australia",
  abn: "00 000 000 000",
  socials: {
    linkedin: "https://www.linkedin.com/company/webops",
    facebook: "https://www.facebook.com/webops",
    instagram: "https://www.instagram.com/webops",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
};
