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
import type { PortfolioProject, PortfolioProjectInput } from "@/types/portfolio";
import type { Service } from "@/types/service";

const EMPTY: PortfolioProjectInput = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  category: PORTFOLIO_CATEGORIES[0],
  client: "",
  industry: "",
  services: [],
  technologies: [],
  thumbnail: "",
  images: [],
  challenge: "",
  solution: "",
  outcome: "",
  featured: false,
  published: true,
  order: 1,
};

function toFormState(project: PortfolioProject | null): PortfolioProjectInput {
  if (!project) return { ...EMPTY };
  const { id: _id, ...rest } = project;
  void _id;
  return rest;
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
  onSave: (id: string | null, input: PortfolioProjectInput) => Promise<void>;
}) {
  const [values, setValues] = useState<PortfolioProjectInput>(() => toFormState(project));
  const [techText, setTechText] = useState((project?.technologies ?? []).join(", "));
  const [galleryText, setGalleryText] = useState((project?.images ?? []).join("\n"));
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(project));

  useEffect(() => {
    // Re-seeds the form whenever a different project is opened for editing
    // (or the dialog is reopened for "new") — not derivable from props
    // alone since the fields are locally editable in between.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(toFormState(project));
    setTechText((project?.technologies ?? []).join(", "));
    setGalleryText((project?.images ?? []).join("\n"));
    setSlugTouched(Boolean(project));
  }, [project, open]);

  function setField<K extends keyof PortfolioProjectInput>(field: K, value: PortfolioProjectInput[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleService(title: string) {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(title)
        ? prev.services.filter((s) => s !== title)
        : [...prev.services, title],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const technologies = techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const images = galleryText
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);
      await onSave(project?.id ?? null, {
        ...values,
        technologies,
        images,
        thumbnail: values.thumbnail || images[0] || "",
      });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit project" : "New project"}</DialogTitle>
          <DialogDescription>
            Changes are saved to this browser&apos;s local storage for the prototype.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="prj-title" label="Title" required>
              <Input
                id="prj-title"
                required
                value={values.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setField("title", title);
                  if (!slugTouched) setField("slug", slugify(title));
                }}
              />
            </FormField>
            <FormField id="prj-slug" label="Slug" required>
              <Input
                id="prj-slug"
                required
                value={values.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setField("slug", slugify(e.target.value));
                }}
              />
            </FormField>
          </div>

          <FormField id="prj-short" label="Short Description" required>
            <Textarea
              id="prj-short"
              required
              rows={2}
              value={values.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)}
            />
          </FormField>

          <FormField id="prj-desc" label="Description" required>
            <Textarea
              id="prj-desc"
              required
              rows={3}
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField id="prj-category" label="Category" required>
              <Select
                value={values.category}
                onValueChange={(v) => setField("category", String(v))}
              >
                <SelectTrigger id="prj-category" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PORTFOLIO_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField id="prj-client" label="Client" hint="Optional">
              <Input
                id="prj-client"
                value={values.client ?? ""}
                onChange={(e) => setField("client", e.target.value)}
              />
            </FormField>
            <FormField id="prj-industry" label="Industry" hint="Optional">
              <Input
                id="prj-industry"
                value={values.industry ?? ""}
                onChange={(e) => setField("industry", e.target.value)}
              />
            </FormField>
          </div>

          <FormField id="prj-services" label="Services provided">
            <div className="flex flex-wrap gap-x-4 gap-y-2 rounded-md border border-border p-3">
              {availableServices.map((service) => {
                const checkboxId = `prj-service-${service.id}`;
                return (
                  <Label
                    key={service.id}
                    htmlFor={checkboxId}
                    className="flex items-center gap-2 text-sm font-normal text-text-muted"
                  >
                    <Checkbox
                      id={checkboxId}
                      checked={values.services.includes(service.title)}
                      onCheckedChange={() => toggleService(service.title)}
                    />
                    {service.title}
                  </Label>
                );
              })}
            </div>
          </FormField>

          <FormField id="prj-tech" label="Technologies" hint="Comma-separated">
            <Input id="prj-tech" value={techText} onChange={(e) => setTechText(e.target.value)} />
          </FormField>

          <FormField id="prj-thumb" label="Thumbnail" hint="Path or URL — defaults to the first gallery image if left blank">
            <Input
              id="prj-thumb"
              value={values.thumbnail}
              onChange={(e) => setField("thumbnail", e.target.value)}
            />
          </FormField>

          <FormField id="prj-gallery" label="Gallery Images" hint="One path or URL per line">
            <Textarea
              id="prj-gallery"
              rows={3}
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField id="prj-challenge" label="Challenge" hint="Optional">
              <Textarea
                id="prj-challenge"
                rows={3}
                value={values.challenge ?? ""}
                onChange={(e) => setField("challenge", e.target.value)}
              />
            </FormField>
            <FormField id="prj-solution" label="Solution" hint="Optional">
              <Textarea
                id="prj-solution"
                rows={3}
                value={values.solution ?? ""}
                onChange={(e) => setField("solution", e.target.value)}
              />
            </FormField>
            <FormField id="prj-outcome" label="Outcome" hint="Optional">
              <Textarea
                id="prj-outcome"
                rows={3}
                value={values.outcome ?? ""}
                onChange={(e) => setField("outcome", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField id="prj-order" label="Order" required>
              <Input
                id="prj-order"
                type="number"
                required
                value={values.order}
                onChange={(e) => setField("order", Number(e.target.value))}
              />
            </FormField>
            <div className="flex flex-col justify-end gap-3">
              <Label
                htmlFor="prj-featured"
                className="flex items-center justify-between gap-3 text-sm font-medium text-text"
              >
                Featured
                <Switch
                  id="prj-featured"
                  checked={values.featured}
                  onCheckedChange={(v) => setField("featured", Boolean(v))}
                />
              </Label>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <Label
                htmlFor="prj-published"
                className="flex items-center justify-between gap-3 text-sm font-medium text-text"
              >
                Published
                <Switch
                  id="prj-published"
                  checked={values.published}
                  onCheckedChange={(v) => setField("published", Boolean(v))}
                />
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
