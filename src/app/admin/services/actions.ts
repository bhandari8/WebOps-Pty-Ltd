"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/adminAuth";
import {
  createService,
  updateService,
  deleteService,
} from "@/repositories/serviceRepository";
import type { ServiceInput } from "@/types/service";

function validateServiceInput(input: ServiceInput) {
  if (!input.title.trim()) {
    throw new Error("Service title is required.");
  }

  if (!input.slug.trim()) {
    throw new Error("Service slug is required.");
  }

  if (!input.shortDescription.trim()) {
    throw new Error("Short description is required.");
  }

  if (!input.description.trim()) {
    throw new Error("Description is required.");
  }

  if (!Number.isInteger(input.order) || input.order < 0) {
    throw new Error("Order must be a non-negative integer.");
  }
}

export async function createServiceAction(input: ServiceInput) {
  await requireAdminSession();

  validateServiceInput(input);

  await createService(input);

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function updateServiceAction(
  id: string,
  input: Partial<ServiceInput>,
) {
  await requireAdminSession();

  if (input.title !== undefined && !input.title.trim()) {
    throw new Error("Service title is required.");
  }

  if (input.slug !== undefined && !input.slug.trim()) {
    throw new Error("Service slug is required.");
  }

  if (
    input.shortDescription !== undefined &&
    !input.shortDescription.trim()
  ) {
    throw new Error("Short description is required.");
  }

  if (input.description !== undefined && !input.description.trim()) {
    throw new Error("Description is required.");
  }

  if (
    input.order !== undefined &&
    (!Number.isInteger(input.order) || input.order < 0)
  ) {
    throw new Error("Order must be a non-negative integer.");
  }

  await updateService(id, input);

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteServiceAction(id: string) {
  await requireAdminSession();

  await deleteService(id);

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}