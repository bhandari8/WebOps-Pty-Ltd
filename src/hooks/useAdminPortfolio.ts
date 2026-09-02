"use client";

import { useCallback } from "react";
import { useAsyncData } from "./useAsyncData";
import {
  createPortfolioProject,
  deletePortfolioProject,
  getPortfolioProjects,
  updatePortfolioProject,
} from "@/repositories/portfolioRepository";
import type { PortfolioProjectInput } from "@/types/portfolio";

export function useAdminPortfolio() {
  const { data, loading, error, refetch } = useAsyncData(() => getPortfolioProjects(), []);

  const save = useCallback(
    async (id: string | null, input: PortfolioProjectInput) => {
      if (id) {
        await updatePortfolioProject(id, input);
      } else {
        await createPortfolioProject(input);
      }
      refetch();
    },
    [refetch]
  );

  const togglePublished = useCallback(
    async (id: string, published: boolean) => {
      await updatePortfolioProject(id, { published });
      refetch();
    },
    [refetch]
  );

  const toggleFeatured = useCallback(
    async (id: string, featured: boolean) => {
      await updatePortfolioProject(id, { featured });
      refetch();
    },
    [refetch]
  );

  const remove = useCallback(
    async (id: string) => {
      await deletePortfolioProject(id);
      refetch();
    },
    [refetch]
  );

  return {
    projects: data,
    loading,
    error,
    refetch,
    save,
    togglePublished,
    toggleFeatured,
    remove,
  };
}
