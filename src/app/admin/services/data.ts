import { requireAdminSession } from "@/lib/adminAuth";
import { getServices } from "@/repositories/serviceRepository";

export async function getAdminServices() {
  await requireAdminSession();
  return getServices();
}