"use client";

import { useActionState } from "react";

import { Container } from "@/components/ui/Container";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Logo } from "@/components/layout/Logo";

import {
  loginAdmin,
  type AdminLoginState,
} from "@/app/admin/actions";

const INITIAL_STATE: AdminLoginState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] =
    useActionState(
      loginAdmin,
      INITIAL_STATE,
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted py-12">
      <Container className="max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-text">
            Admin sign in
          </h1>

          <p className="mt-1 text-sm text-text-muted">
            Sign in to manage services, portfolio,
            and enquiries.
          </p>

          {state.error && (
            <Alert
              variant="destructive"
              className="mt-6"
            >
              <AlertTitle>
                Sign in failed
              </AlertTitle>

              <AlertDescription>
                {state.error}
              </AlertDescription>
            </Alert>
          )}

          <form
            action={formAction}
            className="mt-6 space-y-4"
          >
            <FormField
              id="admin-email"
              label="Email"
              required
            >
              <Input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@webops.com.au"
                className="h-11"
              />
            </FormField>

            <FormField
              id="admin-password"
              label="Password"
              required
            >
              <Input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-11"
              />
            </FormField>

            <Button
              type="submit"
              disabled={pending}
              className="h-11 w-full"
            >
              {pending
                ? "Signing in..."
                : "Sign in"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}