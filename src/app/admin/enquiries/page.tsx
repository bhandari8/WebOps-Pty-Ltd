import { getEnquiries } from "@/repositories/enquiryRepository";
import { AdminEnquiriesClient } from "@/components/admin/enquiries/AdminEnquiriesClient";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return <AdminEnquiriesClient enquiries={enquiries} />;
}