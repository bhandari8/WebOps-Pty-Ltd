"use client";

import { useState } from "react";
import type { EnquiryInput } from "@/types/enquiry";
import { createEnquiry } from "@/repositories/enquiryRepository";
import { hasErrors, validateEnquiry, type FieldErrors } from "@/lib/validation";

export type EnquiryFormStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: EnquiryInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

export function useEnquiryForm(initialService = "") {
  const [values, setValues] = useState<EnquiryInput>({ ...EMPTY_FORM, service: initialService });
  const [errors, setErrors] = useState<FieldErrors<EnquiryInput>>({});
  const [status, setStatus] = useState<EnquiryFormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function setField<K extends keyof EnquiryInput>(field: K, value: EnquiryInput[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    const fieldErrors = validateEnquiry(values);
    setErrors(fieldErrors);

    if (hasErrors(fieldErrors)) {
      setStatus("error");
      setServerError(null);
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      await createEnquiry(values);
      setStatus("success");
      setValues({ ...EMPTY_FORM });
      setErrors({});
    } catch {
      setStatus("error");
      setServerError("We couldn't submit your enquiry. Please try again.");
    }
  }

  function reset() {
    setValues({ ...EMPTY_FORM, service: initialService });
    setErrors({});
    setStatus("idle");
    setServerError(null);
  }

  return { values, errors, status, serverError, setField, submit, reset };
}
