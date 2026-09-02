"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Logo } from "@/components/layout/Logo";

export function AdminLoginForm({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted py-12">
      <Container className="max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-text">Admin sign in</h1>
          <p className="mt-1 text-sm text-text-muted">
            Sign in to manage services, portfolio, and enquiries.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSignIn();
            }}
          >
            <FormField id="admin-email" label="Email" required>
              <Input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@webops.com.au"
                className="h-11"
              />
            </FormField>
            <FormField id="admin-password" label="Password" required>
              <Input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11"
              />
            </FormField>
            <Button type="submit" className="h-11 w-full">
              Sign in
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
