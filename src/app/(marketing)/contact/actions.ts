"use server";

import { createEnquiry } from "@/repositories/enquiryRepository";
import {
  hasErrors,
  validateEnquiry,
  type FieldErrors,
} from "@/lib/validation";
import type { EnquiryInput } from "@/types/enquiry";

export type SubmitEnquiryResult =
  | {
      success: true;
      fieldErrors: FieldErrors<EnquiryInput>;
      error: null;
    }
  | {
      success: false;
      fieldErrors: FieldErrors<EnquiryInput>;
      error: string | null;
    };

export async function submitEnquiry(
  input: EnquiryInput,
): Promise<SubmitEnquiryResult> {
  const fieldErrors = validateEnquiry(input);

  if (hasErrors(fieldErrors)) {
    return {
      success: false,
      fieldErrors,
      error: null,
    };
  }

  try {
    await createEnquiry(input);

    return {
      success: true,
      fieldErrors: {},
      error: null,
    };
  } catch {
    return {
      success: false,
      fieldErrors: {},
      error: "We couldn't submit your enquiry. Please try again.",
    };
  }
}