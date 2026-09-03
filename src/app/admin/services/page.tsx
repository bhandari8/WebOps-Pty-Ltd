import { getServices } from "@/repositories/serviceRepository";
import { AdminServicesClient } from "@/components/admin/services/AdminServicesClient";

export default async function AdminServicesPage() {
  const services = await getServices();

  return <AdminServicesClient services={services} />;
}