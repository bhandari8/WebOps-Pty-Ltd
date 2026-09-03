"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEnquiryForm } from "@/hooks/useEnquiryForm";
import { ENQUIRY_SERVICE_OPTIONS } from "@/types/enquiry";

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const { values, errors, status, serverError, setField, submit, reset } =
    useEnquiryForm(initialService);

  if (status === "success") {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle2 className="text-green-600" />
        <AlertTitle className="text-green-900">
          Your enquiry has been submitted successfully.
        </AlertTitle>
        <AlertDescription className="text-green-800">
          We&apos;ll get back to you shortly.
        </AlertDescription>
        <div className="mt-4 col-start-2">
          <Button variant="outline" size="sm" onClick={reset}>
            Send another enquiry
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-5"
    >
      {serverError ? (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-11"
          />
        </FormField>

        <FormField id="email" label="Email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={!!errors.email}
            className="h-11"
          />
        </FormField>

        <FormField id="phone" label="Phone" hint="Optional">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="h-11"
          />
        </FormField>

        <FormField id="company" label="Company" hint="Optional">
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            className="h-11"
          />
        </FormField>
      </div>

      <FormField id="service" label="Service" required error={errors.service}>
        <Select
          value={values.service}
          onValueChange={(v) => setField("service", String(v))}
        >
          <SelectTrigger
            id="service"
            className="h-11 w-full"
            aria-invalid={!!errors.service}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {ENQUIRY_SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField id="message" label="Message" required error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={!!errors.message}
          placeholder="Tell us a bit about what you need…"
        />
      </FormField>

      <Button type="submit" disabled={status === "submitting"} className="h-11 px-6 w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit Enquiry"
        )}
      </Button>
    </form>
  );
}
