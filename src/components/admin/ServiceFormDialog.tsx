"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/id";
import type { Service, ServiceInput } from "@/types/service";

const EMPTY: ServiceInput = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  image: "",
  features: [],
  featured: false,
  active: true,
  order: 1,
};

function toFormState(service: Service | null): ServiceInput {
  if (!service) return { ...EMPTY };
  const { id: _id, ...rest } = service;
  void _id;
  return rest;
}

export function ServiceFormDialog({
  open,
  onOpenChange,
  service,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onSave: (id: string | null, input: ServiceInput) => Promise<void>;
}) {
  const [values, setValues] = useState<ServiceInput>(() => toFormState(service));
  const [featuresText, setFeaturesText] = useState(service?.features.join("\n") ?? "");
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(service));

  useEffect(() => {
    // Re-seeds the form whenever a different service is opened for editing
    // (or the dialog is reopened for "new") — not derivable from props
    // alone since the fields are locally editable in between.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(toFormState(service));
    setFeaturesText(service?.features.join("\n") ?? "");
    setSlugTouched(Boolean(service));
  }, [service, open]);

  function setField<K extends keyof ServiceInput>(field: K, value: ServiceInput[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const features = featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
      await onSave(service?.id ?? null, { ...values, features });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? "Edit service" : "New service"}</DialogTitle>
          <DialogDescription>
            Changes are saved to this browser&apos;s local storage for the prototype.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField id="svc-title" label="Title" required>
            <Input
              id="svc-title"
              required
              value={values.title}
              onChange={(e) => {
                const title = e.target.value;
                setField("title", title);
                if (!slugTouched) setField("slug", slugify(title));
              }}
            />
          </FormField>

          <FormField id="svc-slug" label="Slug" required hint="Used in the URL, e.g. /services/your-slug">
            <Input
              id="svc-slug"
              required
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setField("slug", slugify(e.target.value));
              }}
            />
          </FormField>

          <FormField id="svc-short" label="Short Description" required>
            <Textarea
              id="svc-short"
              required
              rows={2}
              value={values.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)}
            />
          </FormField>

          <FormField id="svc-desc" label="Description" required>
            <Textarea
              id="svc-desc"
              required
              rows={4}
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </FormField>

          <FormField id="svc-features" label="Features" hint="One feature per line">
            <Textarea
              id="svc-features"
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
            />
          </FormField>

          <FormField id="svc-image" label="Image" hint="Path or URL, e.g. /images/services/web-development.svg">
            <Input
              id="svc-image"
              value={values.image ?? ""}
              onChange={(e) => setField("image", e.target.value)}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField id="svc-order" label="Order" required>
              <Input
                id="svc-order"
                type="number"
                required
                value={values.order}
                onChange={(e) => setField("order", Number(e.target.value))}
              />
            </FormField>

            <div className="flex flex-col justify-end gap-3">
              <Label
                htmlFor="svc-featured"
                className="flex items-center justify-between gap-3 text-sm font-medium text-text"
              >
                Featured
                <Switch
                  id="svc-featured"
                  checked={values.featured}
                  onCheckedChange={(v) => setField("featured", Boolean(v))}
                />
              </Label>
              <Label
                htmlFor="svc-active"
                className="flex items-center justify-between gap-3 text-sm font-medium text-text"
              >
                Active
                <Switch
                  id="svc-active"
                  checked={values.active}
                  onCheckedChange={(v) => setField("active", Boolean(v))}
                />
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
