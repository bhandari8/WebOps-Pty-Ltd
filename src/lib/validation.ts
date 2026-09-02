import type { EnquiryInput } from "@/types/enquiry";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 2000;

export function validateEnquiry(input: EnquiryInput): FieldErrors<EnquiryInput> {
  const errors: FieldErrors<EnquiryInput> = {};

  if (!input.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!input.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!input.service.trim()) {
    errors.service = "Please select a service.";
  }

  if (!input.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (input.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please provide a little more detail (at least ${MESSAGE_MIN_LENGTH} characters).`;
  } else if (input.message.trim().length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message is too long (maximum ${MESSAGE_MAX_LENGTH} characters).`;
  }

  return errors;
}

export function hasErrors<T extends object>(errors: FieldErrors<T>): boolean {
  return Object.keys(errors).length > 0;
}
