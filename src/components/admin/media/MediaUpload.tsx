"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MediaUploadProps {
  value?: string;
  onChange: (media: { id: string; url: string } | null) => void;
  disabled?: boolean;
}

interface UploadResponse {
  id?: string;
  url?: string;
  error?: string;
}

export function MediaUpload({
  value,
  onChange,
  disabled = false,
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [preview, setPreview] = useState(value ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreview(value ?? "");
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please choose a JPEG, PNG, WebP, or AVIF image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const localPreview = URL.createObjectURL(file);
    previewUrlRef.current = localPreview;
    setPreview(localPreview);

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as UploadResponse;

      if (!response.ok || !result.id || !result.url) {
        throw new Error(result.error ?? "Failed to upload image.");
      }

      setPreview(result.url);
      onChange({
        id: result.id,
        url: result.url,
      });
    } catch (err) {
      setPreview(value ?? "");

      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload image. Please try again.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function handleRemove() {
    setError(null);
    setPreview("");

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    onChange(null);
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-border bg-surface-muted">
        {preview ? (
          <div className="relative aspect-video w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Selected image preview"
              className="h-full w-full object-cover"
            />

            {uploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-text">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Uploading…
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || uploading}
            className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-text-muted transition-colors hover:bg-white hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImagePlus className="h-8 w-8" aria-hidden="true" />
            <span className="text-sm font-medium">Choose an image</span>
            <span className="text-xs text-text-subtle">
              JPEG, PNG, WebP, or AVIF · Max 5 MB
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="sr-only"
      />

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="gap-1.5"
        >
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
          )}

          {preview ? "Replace image" : "Choose image"}
        </Button>

        {preview ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={disabled || uploading}
            className="gap-1.5 text-red-600 hover:text-red-700"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Remove
          </Button>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}