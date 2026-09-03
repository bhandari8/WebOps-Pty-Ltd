import { getAboutContent } from "@/repositories/aboutRepository";
import { AdminAboutClient } from "@/components/admin/about/AdminAboutClient";

export default async function AdminAboutPage() {
  const about = await getAboutContent();

  return <AdminAboutClient about={about} />;
}