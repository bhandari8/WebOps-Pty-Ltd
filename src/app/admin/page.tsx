import Link from "next/link";
import {
  Briefcase,
  FolderKanban,
  Inbox,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatCard } from "@/components/admin/StatCard";

import { getServices } from "@/repositories/serviceRepository";
import { getPortfolioProjects } from "@/repositories/portfolioRepository";
import { getEnquiries } from "@/repositories/enquiryRepository";

const SECTIONS = [
  {
    label: "Services",
    description: "Manage the services shown on the public site.",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    label: "Portfolio Projects",
    description: "Create, edit, and publish portfolio work.",
    href: "/admin/portfolio",
    icon: FolderKanban,
  },
  {
    label: "Enquiries",
    description: "Review and manage incoming enquiries.",
    href: "/admin/enquiries",
    icon: Inbox,
  },
  {
    label: "Website Content",
    description: "Edit the About page's mission, values, and capabilities.",
    href: "/admin/about",
    icon: Info,
  },
];

export default async function AdminDashboardPage() {
  const [services, projects, enquiries] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
    getEnquiries(),
  ]);

  const stats = [
    {
      label: "Total Services",
      value: services.length,
      icon: Briefcase,
    },
    {
      label: "Total Portfolio Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      label: "New Enquiries",
      value: enquiries.filter((e) => e.status === "new").length,
      icon: Inbox,
    },
    {
      label: "Published Projects",
      value: projects.filter((p) => p.published).length,
      icon: CheckCircle2,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="An overview of your services, portfolio, and enquiries."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-text-subtle">
        Manage content
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => {
          const Icon = section.icon;

          return (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-4 rounded-lg border border-border bg-white p-5 transition-colors hover:border-brand-blue/40 hover:bg-blue-50/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-muted text-text">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-text">
                  {section.label}
                </p>
                <p className="text-sm text-text-muted">
                  {section.description}
                </p>
              </div>

              <ArrowRight
                className="h-4 w-4 text-text-subtle"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}