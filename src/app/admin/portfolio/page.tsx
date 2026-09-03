import { getPortfolioProjects } from "@/repositories/portfolioRepository";
import { getServices } from "@/repositories/serviceRepository";
import { AdminPortfolioClient } from "@/components/admin/portfolio/AdminPortfolioClient";

export default async function AdminPortfolioPage() {
  const [projects, services] = await Promise.all([
    getPortfolioProjects(),
    getServices(),
  ]);

  return (
    <AdminPortfolioClient
      projects={projects}
      services={services}
    />
  );
}