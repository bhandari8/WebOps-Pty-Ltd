"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { updateAboutContentAction } from "@/app/admin/about/actions";

import type { AboutContent, AboutValue } from "@/types/about";

export function AdminAboutClient({
  about,
}: {
  about: AboutContent;
}) {
  const [form, setForm] = useState<AboutContent>(about);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof AboutContent>(
    field: K,
    value: AboutContent[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSavedMessage(false);
    setError(null);
  }

  function updateValue(
    index: number,
    patch: Partial<AboutValue>,
  ) {
    setForm((prev) => ({
      ...prev,
      values: (prev.values ?? []).map((value, i) =>
        i === index
          ? { ...value, ...patch }
          : value,
      ),
    }));

    setSavedMessage(false);
    setError(null);
  }

  function addValue() {
    setForm((prev) => ({
      ...prev,
      values: [
        ...(prev.values ?? []),
        {
          title: "",
          description: "",
        },
      ],
    }));

    setSavedMessage(false);
    setError(null);
  }

  function removeValue(index: number) {
    setForm((prev) => ({
      ...prev,
      values: (prev.values ?? []).filter(
        (_, i) => i !== index,
      ),
    }));

    setSavedMessage(false);
    setError(null);
  }

  function updateCapability(
    index: number,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      capabilities: (prev.capabilities ?? []).map(
        (capability, i) =>
          i === index ? value : capability,
      ),
    }));

    setSavedMessage(false);
    setError(null);
  }

  function addCapability() {
    setForm((prev) => ({
      ...prev,
      capabilities: [
        ...(prev.capabilities ?? []),
        "",
      ],
    }));

    setSavedMessage(false);
    setError(null);
  }

  function removeCapability(index: number) {
    setForm((prev) => ({
      ...prev,
      capabilities: (prev.capabilities ?? []).filter(
        (_, i) => i !== index,
      ),
    }));

    setSavedMessage(false);
    setError(null);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setSavedMessage(false);
    setError(null);

    try {
      const input: AboutContent = {
        ...form,
        values: (form.values ?? []).filter(
          (value) => value.title.trim(),
        ),
        capabilities: (form.capabilities ?? []).filter(
          (capability) => capability.trim(),
        ),
      };

      const updated = await updateAboutContentAction(input);

      setForm(updated);
      setSavedMessage(true);

      window.setTimeout(() => {
        setSavedMessage(false);
      }, 2500);
    } catch {
      setError(
        "We couldn't save the changes. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="About Content"
        description="Edit the content shown on the About page."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-8"
      >
        <div className="space-y-4 rounded-lg border border-border bg-white p-6">
          <FormField
            id="about-title"
            label="Company title"
            required
          >
            <Input
              id="about-title"
              required
              value={form.title}
              onChange={(event) =>
                setField(
                  "title",
                  event.target.value,
                )
              }
            />
          </FormField>

          <FormField
            id="about-intro"
            label="Introduction"
            required
          >
            <Textarea
              id="about-intro"
              required
              rows={4}
              value={form.introduction}
              onChange={(event) =>
                setField(
                  "introduction",
                  event.target.value,
                )
              }
            />
          </FormField>

          <FormField
            id="about-mission"
            label="Mission"
            hint="Optional"
          >
            <Textarea
              id="about-mission"
              rows={3}
              value={form.mission ?? ""}
              onChange={(event) =>
                setField(
                  "mission",
                  event.target.value,
                )
              }
            />
          </FormField>

          <FormField
            id="about-vision"
            label="Vision"
            hint="Optional"
          >
            <Textarea
              id="about-vision"
              rows={3}
              value={form.vision ?? ""}
              onChange={(event) =>
                setField(
                  "vision",
                  event.target.value,
                )
              }
            />
          </FormField>
        </div>

        <div className="rounded-lg border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text">
              Values
            </h2>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addValue}
              className="gap-1.5"
            >
              <Plus
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Add value
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {(form.values ?? []).map(
              (value, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-md border border-border p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-3">
                      <Input
                        aria-label="Value title"
                        placeholder="Title"
                        value={value.title}
                        onChange={(event) =>
                          updateValue(index, {
                            title: event.target.value,
                          })
                        }
                      />

                      <Textarea
                        aria-label="Value description"
                        placeholder="Description"
                        rows={2}
                        value={value.description}
                        onChange={(event) =>
                          updateValue(index, {
                            description:
                              event.target.value,
                          })
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Remove value"
                      onClick={() =>
                        removeValue(index)
                      }
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </div>
              ),
            )}

            {(form.values ?? []).length === 0 ? (
              <p className="text-sm text-text-subtle">
                No values added yet.
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text">
              Capabilities
            </h2>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCapability}
              className="gap-1.5"
            >
              <Plus
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Add capability
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {(form.capabilities ?? []).map(
              (capability, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <Input
                    aria-label="Capability"
                    value={capability}
                    onChange={(event) =>
                      updateCapability(
                        index,
                        event.target.value,
                      )
                    }
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Remove capability"
                    onClick={() =>
                      removeCapability(index)
                    }
                    className="shrink-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              ),
            )}

            {(form.capabilities ?? []).length === 0 ? (
              <p className="text-sm text-text-subtle">
                No capabilities added yet.
              </p>
            ) : null}
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="text-sm text-red-600"
          >
            {error}
          </p>
        ) : null}

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2"
          >
            <Save
              className="h-4 w-4"
              aria-hidden="true"
            />
            {saving ? "Saving…" : "Save changes"}
          </Button>

          {savedMessage ? (
            <span className="text-sm text-green-700">
              Saved.
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}