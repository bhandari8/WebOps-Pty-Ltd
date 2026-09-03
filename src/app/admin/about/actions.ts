"use server";

import { requireAdminSession } from "@/lib/adminAuth";
import { updateAboutContent } from "@/repositories/aboutRepository";
import type { AboutContent } from "@/types/about";

export async function updateAboutContentAction(input: AboutContent) {
  await requireAdminSession();

  return updateAboutContent(input);
}