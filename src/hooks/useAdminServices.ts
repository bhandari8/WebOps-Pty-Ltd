"use client";

import { useCallback } from "react";
import { useAsyncData } from "./useAsyncData";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "@/repositories/serviceRepository";
import type { ServiceInput } from "@/types/service";

export function useAdminServices() {
  const { data, loading, error, refetch } = useAsyncData(() => getServices(), []);

  const save = useCallback(
    async (id: string | null, input: ServiceInput) => {
      if (id) {
        await updateService(id, input);
      } else {
        await createService(input);
      }
      refetch();
    },
    [refetch]
  );

  const toggleActive = useCallback(
    async (id: string, active: boolean) => {
      await updateService(id, { active });
      refetch();
    },
    [refetch]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteService(id);
      refetch();
    },
    [refetch]
  );

  return { services: data, loading, error, refetch, save, toggleActive, remove };
}
