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
import { MediaUpload } from "@/components/admin/media/MediaUpload";

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
  const [values, setValues] = useState<ServiceInput>(() =>
    toFormState(service),
  );
  const [featuresText, setFeaturesText] = useState(
    service?.features.join("\n") ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(service));

  useEffect(() => {
    // Re-seeds the form whenever a different service is opened for editing
    // or the dialog is reopened for creating a new service.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(toFormState(service));
    setFeaturesText(service?.features.join("\n") ?? "");
    setSaveError(null);
    setSlugTouched(Boolean(service));
  }, [service, open]);

  function setField<K extends keyof ServiceInput>(
    field: K,
    value: ServiceInput[K],
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setSaveError(null);

    try {
      const features = featuresText
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean);

      await onSave(service?.id ?? null, {
        ...values,
        features,
      });

      onOpenChange(false);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to save service.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl! max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-lg">
            {service ? "Edit service" : "New service"}
          </DialogTitle>

          <DialogDescription>
            Changes are saved to the WebOps database.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {saveError ? (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {saveError}
            </div>
          ) : null}

          {/* Basic information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Basic information
              </h3>
              <p className="mt-1 text-xs text-text-subtle">
                Define the service name and URL.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField id="svc-title" label="Title" required>
                <Input
                  id="svc-title"
                  required
                  value={values.title}
                  onChange={(e) => {
                    const title = e.target.value;

                    setField("title", title);

                    if (!slugTouched) {
                      setField("slug", slugify(title));
                    }
                  }}
                />
              </FormField>

              <FormField
                id="svc-slug"
                label="Slug"
                required
                hint="Used in the URL, e.g. /services/your-slug"
              >
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
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Service content
              </h3>
              <p className="mt-1 text-xs text-text-subtle">
                Add the descriptions that appear across the public website.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                id="svc-short"
                label="Short Description"
                required
              >
                <Textarea
                  id="svc-short"
                  required
                  rows={5}
                  value={values.shortDescription}
                  onChange={(e) =>
                    setField(
                      "shortDescription",
                      e.target.value,
                    )
                  }
                />
              </FormField>

              <FormField
                id="svc-desc"
                label="Description"
                required
              >
                <Textarea
                  id="svc-desc"
                  required
                  rows={5}
                  value={values.description}
                  onChange={(e) =>
                    setField("description", e.target.value)
                  }
                />
              </FormField>
            </div>
          </div>

          {/* Features and image */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Media & features
              </h3>
              <p className="mt-1 text-xs text-text-subtle">
                Add key service features and choose a representative image.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <FormField
                id="svc-features"
                label="Features"
                hint="One feature per line"
              >
                <Textarea
                  id="svc-features"
                  rows={8}
                  value={featuresText}
                  onChange={(e) =>
                    setFeaturesText(e.target.value)
                  }
                  placeholder={
                    "Custom website development\n" +
                    "Web application development\n" +
                    "Ongoing maintenance"
                  }
                />
              </FormField>

              <FormField
                id="svc-image"
                label="Image"
                hint="Upload an image for this service. Maximum 5 MB."
              >
                <MediaUpload
                  value={values.image}
                  onChange={(media) => {
                    setField(
                      "image",
                      media?.url ?? "",
                    );
                    setField(
                      "imageMediaId",
                      media?.id,
                    );
                  }}
                />
              </FormField>
            </div>
          </div>

          {/* Publishing settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Publishing settings
              </h3>
              <p className="mt-1 text-xs text-text-subtle">
                Control the service order and visibility.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FormField id="svc-order" label="Order" required>
                <Input
                  id="svc-order"
                  type="number"
                  min={0}
                  required
                  value={values.order}
                  onChange={(e) =>
                    setField(
                      "order",
                      Number(e.target.value),
                    )
                  }
                />
              </FormField>

              <div className="flex min-h-11 items-center justify-between rounded-md border border-border px-4">
                <Label
                  htmlFor="svc-featured"
                  className="text-sm font-medium text-text"
                >
                  Featured
                </Label>

                <Switch
                  id="svc-featured"
                  checked={values.featured}
                  onCheckedChange={(value) =>
                    setField(
                      "featured",
                      Boolean(value),
                    )
                  }
                />
              </div>

              <div className="flex min-h-11 items-center justify-between rounded-md border border-border px-4">
                <Label
                  htmlFor="svc-active"
                  className="text-sm font-medium text-text"
                >
                  Active
                </Label>

                <Switch
                  id="svc-active"
                  checked={values.active}
                  onCheckedChange={(value) =>
                    setField(
                      "active",
                      Boolean(value),
                    )
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}