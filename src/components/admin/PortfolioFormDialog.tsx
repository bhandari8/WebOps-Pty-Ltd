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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/id";
import { PORTFOLIO_CATEGORIES } from "@/types/portfolio";
import type {
  PortfolioProject,
  PortfolioProjectInput,
} from "@/types/portfolio";
import type { Service } from "@/types/service";
import { MediaUpload } from "@/components/admin/media/MediaUpload";
import { MediaGalleryUpload } from "@/components/admin/media/MediaGalleryUpload";

const EMPTY: PortfolioProjectInput = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  category: PORTFOLIO_CATEGORIES[0],
  client: "",
  industry: "",
  services: [],
  serviceIds: [],
  technologies: [],
  thumbnail: "",
  thumbnailMediaId: undefined,
  images: [],
  imageMediaIds: [],
  challenge: "",
  solution: "",
  outcome: "",
  featured: false,
  published: true,
  order: 1,
};

function toFormState(
  project: PortfolioProject | null,
): PortfolioProjectInput {
  if (!project) {
    return { ...EMPTY };
  }

  const { id: _id, ...rest } = project;

  void _id;

  return {
    ...rest,
    serviceIds: project.serviceIds ?? [],
    imageMediaIds: project.imageMediaIds ?? [],
    thumbnailMediaId: project.thumbnailMediaId,
  };
}

export function PortfolioFormDialog({
  open,
  onOpenChange,
  project,
  availableServices,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: PortfolioProject | null;
  availableServices: Service[];
  onSave: (
    id: string | null,
    input: PortfolioProjectInput,
  ) => Promise<void>;
}) {
  const [values, setValues] = useState<PortfolioProjectInput>(() =>
    toFormState(project),
  );

  const [techText, setTechText] = useState(
    (project?.technologies ?? []).join(", "),
  );

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(project));

  useEffect(() => {
    // Re-seed the editable form whenever a different project is opened
    // or the dialog is reopened for a new project.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(toFormState(project));
    setTechText((project?.technologies ?? []).join(", "));
    setSaveError(null);
    setSlugTouched(Boolean(project));
  }, [project, open]);

  function setField<K extends keyof PortfolioProjectInput>(
    field: K,
    value: PortfolioProjectInput[K],
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function toggleService(service: Service) {
    setValues((prev) => {
      const serviceIds = prev.serviceIds ?? [];
      const services = prev.services ?? [];

      const isSelected = serviceIds.includes(service.id);

      if (isSelected) {
        return {
          ...prev,
          serviceIds: serviceIds.filter(
            (id) => id !== service.id,
          ),
          services: services.filter(
            (title) => title !== service.title,
          ),
        };
      }

      return {
        ...prev,
        serviceIds: [...serviceIds, service.id],
        services: [...services, service.title],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setSaveError(null);

    try {
      const technologies = techText
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

      await onSave(project?.id ?? null, {
        ...values,
        technologies,
      });

      onOpenChange(false);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to save project.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent
  className="max-w-5xl! max-h-[90vh] overflow-y-auto"
>
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit project" : "New project"}
          </DialogTitle>

          <DialogDescription>
            Manage portfolio content, images, services, and publishing.
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
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Basic information
              </h3>

              <p className="mt-1 text-xs text-text-subtle">
                Core information displayed on the portfolio.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="prj-title"
                label="Title"
                required
              >
                <Input
                  id="prj-title"
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
                id="prj-slug"
                label="Slug"
                required
                hint="Used in the URL, e.g. /portfolio/project-name"
              >
                <Input
                  id="prj-slug"
                  required
                  value={values.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setField(
                      "slug",
                      slugify(e.target.value),
                    );
                  }}
                />
              </FormField>
            </div>

            <FormField
              id="prj-short"
              label="Short Description"
              required
            >
              <Textarea
                id="prj-short"
                required
                rows={2}
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
              id="prj-desc"
              label="Description"
              required
            >
              <Textarea
                id="prj-desc"
                required
                rows={4}
                value={values.description}
                onChange={(e) =>
                  setField(
                    "description",
                    e.target.value,
                  )
                }
              />
            </FormField>
          </section>

          {/* Project details */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Project details
              </h3>

              <p className="mt-1 text-xs text-text-subtle">
                Categorise the project and describe the client context.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                id="prj-category"
                label="Category"
                required
              >
                <Select
                  value={values.category}
                  onValueChange={(value) => {
                    if (value) {
                      setField("category", value);
                    }
                  }}
                >
                  <SelectTrigger
                    id="prj-category"
                    className="w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {PORTFOLIO_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                id="prj-client"
                label="Client"
                hint="Optional"
              >
                <Input
                  id="prj-client"
                  value={values.client ?? ""}
                  onChange={(e) =>
                    setField(
                      "client",
                      e.target.value,
                    )
                  }
                />
              </FormField>

              <FormField
                id="prj-industry"
                label="Industry"
                hint="Optional"
              >
                <Input
                  id="prj-industry"
                  value={values.industry ?? ""}
                  onChange={(e) =>
                    setField(
                      "industry",
                      e.target.value,
                    )
                  }
                />
              </FormField>
            </div>

            <FormField
              id="prj-services"
              label="Services provided"
            >
              <div className="flex flex-wrap gap-x-5 gap-y-3 rounded-md border border-border bg-surface-muted/30 p-4">
                {availableServices.length > 0 ? (
                  availableServices.map((service) => {
                    const checkboxId =
                      `prj-service-${service.id}`;

                    return (
                      <Label
                        key={service.id}
                        htmlFor={checkboxId}
                        className="flex items-center gap-2 text-sm font-normal text-text"
                      >
                        <Checkbox
                          id={checkboxId}
                          checked={(
                            values.serviceIds ?? []
                          ).includes(service.id)}
                          onCheckedChange={() =>
                            toggleService(service)
                          }
                        />

                        {service.title}
                      </Label>
                    );
                  })
                ) : (
                  <p className="text-sm text-text-subtle">
                    No services available.
                  </p>
                )}
              </div>
            </FormField>

            <FormField
              id="prj-tech"
              label="Technologies"
              hint="Comma-separated"
            >
              <Input
                id="prj-tech"
                value={techText}
                onChange={(e) =>
                  setTechText(e.target.value)
                }
                placeholder="Next.js, TypeScript, PostgreSQL"
              />
            </FormField>
          </section>

          {/* Media */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Project media
              </h3>

              <p className="mt-1 text-xs text-text-subtle">
                Upload the project thumbnail and gallery images.
              </p>
            </div>

            <FormField
              id="prj-thumb"
              label="Thumbnail"
              required
              hint="The main image shown on portfolio cards."
            >
              <MediaUpload
                value={values.thumbnail}
                onChange={(media) => {
                  setField(
                    "thumbnail",
                    media?.url ?? "",
                  );

                  setField(
                    "thumbnailMediaId",
                    media?.id,
                  );
                }}
                disabled={saving}
              />
            </FormField>

            <FormField
              id="prj-gallery"
              label="Gallery Images"
              hint="Upload additional images and arrange their order."
            >
              <MediaGalleryUpload
                images={values.images ?? []}
                mediaIds={values.imageMediaIds ?? []}
                onChange={({ images, mediaIds }) => {
                  setField("images", images);
                  setField(
                    "imageMediaIds",
                    mediaIds,
                  );
                }}
                disabled={saving}
              />
            </FormField>
          </section>

          {/* Case study */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Case study
              </h3>

              <p className="mt-1 text-xs text-text-subtle">
                Optional project story shown on the project detail page.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                id="prj-challenge"
                label="Challenge"
                hint="Optional"
              >
                <Textarea
                  id="prj-challenge"
                  rows={5}
                  value={values.challenge ?? ""}
                  onChange={(e) =>
                    setField(
                      "challenge",
                      e.target.value,
                    )
                  }
                />
              </FormField>

              <FormField
                id="prj-solution"
                label="Solution"
                hint="Optional"
              >
                <Textarea
                  id="prj-solution"
                  rows={5}
                  value={values.solution ?? ""}
                  onChange={(e) =>
                    setField(
                      "solution",
                      e.target.value,
                    )
                  }
                />
              </FormField>

              <FormField
                id="prj-outcome"
                label="Outcome"
                hint="Optional"
              >
                <Textarea
                  id="prj-outcome"
                  rows={5}
                  value={values.outcome ?? ""}
                  onChange={(e) =>
                    setField(
                      "outcome",
                      e.target.value,
                    )
                  }
                />
              </FormField>
            </div>
          </section>

          {/* Publishing */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Publishing
              </h3>

              <p className="mt-1 text-xs text-text-subtle">
                Control how and where this project appears publicly.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                id="prj-order"
                label="Display order"
                required
              >
                <Input
                  id="prj-order"
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

              <div className="flex min-h-10 items-end">
                <Label
                  htmlFor="prj-featured"
                  className="flex w-full items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-text"
                >
                  Featured

                  <Switch
                    id="prj-featured"
                    checked={values.featured}
                    onCheckedChange={(value) =>
                      setField(
                        "featured",
                        Boolean(value),
                      )
                    }
                  />
                </Label>
              </div>

              <div className="flex min-h-10 items-end">
                <Label
                  htmlFor="prj-published"
                  className="flex w-full items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-text"
                >
                  Published

                  <Switch
                    id="prj-published"
                    checked={values.published}
                    onCheckedChange={(value) =>
                      setField(
                        "published",
                        Boolean(value),
                      )
                    }
                  />
                </Label>
              </div>
            </div>
          </section>

          <DialogFooter className="border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                saving ||
                !values.thumbnailMediaId
              }
            >
              {saving
                ? "Saving…"
                : project
                  ? "Save changes"
                  : "Create project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}