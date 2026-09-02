"use client";

import { useAsyncData } from "./useAsyncData";
import { getAboutContent } from "@/repositories/aboutRepository";

export function useAboutContent() {
  return useAsyncData(() => getAboutContent(), []);
}
