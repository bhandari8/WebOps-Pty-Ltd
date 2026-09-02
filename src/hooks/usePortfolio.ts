"use client";

import { useAsyncData } from "./useAsyncData";
import {
  getPortfolioProjectBySlug,
  getPublishedPortfolioProjects,
} from "@/repositories/portfolioRepository";

export function usePortfolioProjects() {
  return useAsyncData(() => getPublishedPortfolioProjects(), []);
}

export function usePortfolioProjectBySlug(slug: string) {
  return useAsyncData(() => getPortfolioProjectBySlug(slug), [slug]);
}
