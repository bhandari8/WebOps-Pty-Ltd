"use client";

import { useAsyncData } from "./useAsyncData";
import { getActiveServices, getServiceBySlug, getServices } from "@/repositories/serviceRepository";

export function useServices(activeOnly = true) {
  return useAsyncData(() => (activeOnly ? getActiveServices() : getServices()), [activeOnly]);
}

export function useServiceBySlug(slug: string) {
  return useAsyncData(() => getServiceBySlug(slug), [slug]);
}
