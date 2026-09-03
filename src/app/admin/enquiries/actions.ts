"use server";

import { requireAdminSession } from "@/lib/adminAuth";
import { updateEnquiryStatus } from "@/repositories/enquiryRepository";
import type { EnquiryStatus } from "@/types/enquiry";

export async function updateEnquiryStatusAction(
  id: string,
  status: EnquiryStatus,
) {
  await requireAdminSession();

  const enquiry = await updateEnquiryStatus(id, status);

  if (!enquiry) {
    throw new Error("Enquiry not found");
  }

  return enquiry;
}