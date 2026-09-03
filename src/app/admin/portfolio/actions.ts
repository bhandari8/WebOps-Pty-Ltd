"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/adminAuth";
import {
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
} from "@/repositories/portfolioRepository";
import type { PortfolioProjectInput } from "@/types/portfolio";

export async function createPortfolioProjectAction(
  input: PortfolioProjectInput,
) {
  await requireAdminSession();

  const project = await createPortfolioProject(input);

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${project.slug}`);
  revalidatePath("/");

  return project;
}

export async function updatePortfolioProjectAction(
  id: string,
  input: Partial<PortfolioProjectInput>,
) {
  await requireAdminSession();

  const project = await updatePortfolioProject(id, input);

  if (project) {
    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);
    revalidatePath("/");
  }

  return project;
}

export async function deletePortfolioProjectAction(id: string) {
  await requireAdminSession();

  const result = await deletePortfolioProject(id);

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");

  return result;
}