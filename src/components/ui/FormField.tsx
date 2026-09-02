import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function FormField({ id, label, error, required, hint, children }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
        {required ? (
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-text-subtle">{hint}</p> : null}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
