"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useAdminAbout } from "@/hooks/useAdminAbout";
import type { AboutContent, AboutValue } from "@/types/about";

const EMPTY: AboutContent = {
  title: "",
  introduction: "",
  mission: "",
  vision: "",
  values: [],
  capabilities: [],
};

export default function AdminAboutPage() {
  const { about, loading, error, saving, save } = useAdminAbout();
  const [form, setForm] = useState<AboutContent>(EMPTY);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    // Seeds the editable form once the repository data has loaded — the
    // form fields are then locally editable and shouldn't keep syncing.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (about) setForm(about);
  }, [about]);

  function setField<K extends keyof AboutContent>(field: K, value: AboutContent[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateValue(index: number, patch: Partial<AboutValue>) {
    setForm((prev) => ({
      ...prev,
      values: (prev.values ?? []).map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));
  }

  function addValue() {
    setForm((prev) => ({
      ...prev,
      values: [...(prev.values ?? []), { title: "", description: "" }],
    }));
  }

  function removeValue(index: number) {
    setForm((prev) => ({ ...prev, values: (prev.values ?? []).filter((_, i) => i !== index) }));
  }

  function updateCapability(index: number, value: string) {
    setForm((prev) => ({
      ...prev,
      capabilities: (prev.capabilities ?? []).map((c, i) => (i === index ? value : c)),
    }));
  }

  function addCapability() {
    setForm((prev) => ({ ...prev, capabilities: [...(prev.capabilities ?? []), ""] }));
  }

  function removeCapability(index: number) {
    setForm((prev) => ({
      ...prev,
      capabilities: (prev.capabilities ?? []).filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save({
      ...form,
      values: (form.values ?? []).filter((v) => v.title.trim()),
      capabilities: (form.capabilities ?? []).filter((c) => c.trim()),
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  }

  if (loading) {
    return (
      <div>
        <AdminPageHeader title="About Content" description="Edit the content shown on the About page." />
        <LoadingState label="Loading about content" rows={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminPageHeader title="About Content" description="Edit the content shown on the About page." />
        <ErrorState />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="About Content" description="Edit the content shown on the About page." />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <div className="rounded-lg border border-border bg-white p-6 space-y-4">
          <FormField id="about-title" label="Company title" required>
            <Input
              id="about-title"
              required
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </FormField>
          <FormField id="about-intro" label="Introduction" required>
            <Textarea
              id="about-intro"
              required
              rows={4}
              value={form.introduction}
              onChange={(e) => setField("introduction", e.target.value)}
            />
          </FormField>
          <FormField id="about-mission" label="Mission" hint="Optional">
            <Textarea
              id="about-mission"
              rows={3}
              value={form.mission ?? ""}
              onChange={(e) => setField("mission", e.target.value)}
            />
          </FormField>
          <FormField id="about-vision" label="Vision" hint="Optional">
            <Textarea
              id="about-vision"
              rows={3}
              value={form.vision ?? ""}
              onChange={(e) => setField("vision", e.target.value)}
            />
          </FormField>
        </div>

        <div className="rounded-lg border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text">Values</h2>
            <Button type="button" variant="outline" size="sm" onClick={addValue} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add value
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {(form.values ?? []).map((value, i) => (
              <div key={i} className="rounded-md border border-border p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      aria-label="Value title"
                      placeholder="Title"
                      value={value.title}
                      onChange={(e) => updateValue(i, { title: e.target.value })}
                    />
                    <Textarea
                      aria-label="Value description"
                      placeholder="Description"
                      rows={2}
                      value={value.description}
                      onChange={(e) => updateValue(i, { description: e.target.value })}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Remove value"
                    onClick={() => removeValue(i)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
            {(form.values ?? []).length === 0 ? (
              <p className="text-sm text-text-subtle">No values added yet.</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text">Capabilities</h2>
            <Button type="button" variant="outline" size="sm" onClick={addCapability} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add capability
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {(form.capabilities ?? []).map((capability, i) => (
              <div key={i} className="flex items-center gap-3">
                <Input
                  aria-label="Capability"
                  value={capability}
                  onChange={(e) => updateCapability(i, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Remove capability"
                  onClick={() => removeCapability(i)}
                  className="text-red-600 hover:text-red-700 shrink-0"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ))}
            {(form.capabilities ?? []).length === 0 ? (
              <p className="text-sm text-text-subtle">No capabilities added yet.</p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving} className="gap-2">
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "Saving…" : "Save changes"}
          </Button>
          {savedMessage ? <span className="text-sm text-green-700">Saved.</span> : null}
        </div>
      </form>
    </div>
  );
}
