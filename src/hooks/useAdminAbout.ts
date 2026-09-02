"use client";

import { useCallback, useState } from "react";
import { useAsyncData } from "./useAsyncData";
import { getAboutContent, updateAboutContent } from "@/repositories/aboutRepository";
import type { AboutContent } from "@/types/about";

export function useAdminAbout() {
  const { data, loading, error, refetch } = useAsyncData(() => getAboutContent(), []);
  const [saving, setSaving] = useState(false);

  const save = useCallback(
    async (input: AboutContent) => {
      setSaving(true);
      try {
        await updateAboutContent(input);
        refetch();
      } finally {
        setSaving(false);
      }
    },
    [refetch]
  );

  return { about: data, loading, error, saving, save };
}
