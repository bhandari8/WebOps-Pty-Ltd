"use client";

import { useCallback } from "react";
import { useAsyncData } from "./useAsyncData";
import { getEnquiries, updateEnquiryStatus } from "@/repositories/enquiryRepository";
import type { EnquiryStatus } from "@/types/enquiry";

export function useEnquiries() {
  const { data, loading, error, refetch } = useAsyncData(() => getEnquiries(), []);

  const changeStatus = useCallback(
    async (id: string, status: EnquiryStatus) => {
      await updateEnquiryStatus(id, status);
      refetch();
    },
    [refetch]
  );

  return { enquiries: data, loading, error, refetch, changeStatus };
}
