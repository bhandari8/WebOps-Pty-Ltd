"use client";

import { useRef, useState } from "react";
import {
  ImagePlus,
  Loader2,
  Upload,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface MediaGalleryUploadProps {
  images: string[];
  mediaIds: string[];
  onChange: (media: {
    images: string[];
    mediaIds: string[];
  }) => void;
  disabled?: boolean;
  maxImages?: number;
}

interface UploadResponse {
  id?: string;
  url?: string;
  error?: string;
}

export function MediaGalleryUpload({
  images,
  mediaIds,
  onChange,
  disabled = false,
  maxImages = 8,
}: MediaGalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setError(null);

    const remainingSlots = maxImages - images.length;

    if (remainingSlots <= 0) {
      setError(`A maximum of ${maxImages} gallery images is allowed.`);
      event.target.value = "";
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setError(
        `Only ${remainingSlots} more image${
          remainingSlots === 1 ? "" : "s"
        } can be added.`,
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    for (const file of filesToUpload) {
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Please choose only JPEG, PNG, WebP, or AVIF images.",
        );
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError(
          `"${file.name}" is larger than the 5 MB limit.`,
        );
        event.target.value = "";
        return;
      }
    }

    setUploading(true);

    try {
      const uploadedImages: string[] = [];
      const uploadedMediaIds: string[] = [];

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const result =
          (await response.json()) as UploadResponse;

        if (
          !response.ok ||
          !result.id ||
          !result.url
        ) {
          throw new Error(
            result.error ??
              `Failed to upload "${file.name}".`,
          );
        }

        uploadedImages.push(result.url);
        uploadedMediaIds.push(result.id);
      }

      onChange({
        images: [...images, ...uploadedImages],
        mediaIds: [...mediaIds, ...uploadedMediaIds],
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload images. Please try again.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    const nextImages = images.filter(
      (_, imageIndex) => imageIndex !== index,
    );

    const nextMediaIds = mediaIds.filter(
      (_, mediaIndex) => mediaIndex !== index,
    );

    onChange({
      images: nextImages,
      mediaIds: nextMediaIds,
    });
  }

  function moveImage(
    index: number,
    direction: "up" | "down",
  ) {
    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= images.length
    ) {
      return;
    }

    const nextImages = [...images];
    const nextMediaIds = [...mediaIds];

    [
      nextImages[index],
      nextImages[targetIndex],
    ] = [
      nextImages[targetIndex],
      nextImages[index],
    ];

    [
      nextMediaIds[index],
      nextMediaIds[targetIndex],
    ] = [
      nextMediaIds[targetIndex],
      nextMediaIds[index],
    ];

    onChange({
      images: nextImages,
      mediaIds: nextMediaIds,
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={
              mediaIds[index] ??
              `${image}-${index}`
            }
            className="group overflow-hidden rounded-lg border border-border bg-white"
          >
            <div className="relative aspect-video overflow-hidden bg-surface-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/70 to-transparent px-3 pb-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-medium text-white">
                  Image {index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      moveImage(index, "up")
                    }
                    disabled={
                      disabled ||
                      uploading ||
                      index === 0
                    }
                    aria-label={`Move image ${
                      index + 1
                    } up`}
                  >
                    <ChevronUp
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      moveImage(index, "down")
                    }
                    disabled={
                      disabled ||
                      uploading ||
                      index === images.length - 1
                    }
                    aria-label={`Move image ${
                      index + 1
                    } down`}
                  >
                    <ChevronDown
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      removeImage(index)
                    }
                    disabled={
                      disabled || uploading
                    }
                    aria-label={`Remove image ${
                      index + 1
                    }`}
                  >
                    <X
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {images.length === 0 ? (
          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            disabled={
              disabled ||
              uploading ||
              images.length >= maxImages
            }
            className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface-muted/30 text-text-muted transition-colors hover:border-brand-blue/50 hover:bg-white hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImagePlus
              className="h-8 w-8"
              aria-hidden="true"
            />
            <span className="text-sm font-medium">
              Add gallery images
            </span>
            <span className="text-xs text-text-subtle">
              Up to {maxImages} images
            </span>
          </button>
        ) : null}
      </div>

      {images.length > 0 &&
      images.length < maxImages ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={disabled || uploading}
          className="gap-1.5"
        >
          {uploading ? (
            <Loader2
              className="h-3.5 w-3.5 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Upload
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
          )}

          {uploading
            ? "Uploading…"
            : "Add gallery images"}
        </Button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        onChange={handleFiles}
        disabled={disabled || uploading}
        className="sr-only"
      />

      <p className="text-xs text-text-subtle">
        {images.length} of {maxImages} images · JPEG,
        PNG, WebP, or AVIF · Max 5 MB each
      </p>

      {uploading ? (
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Loader2
            className="h-4 w-4 animate-spin"
            aria-hidden="true"
          />
          Uploading images…
        </div>
      ) : null}

      {error ? (
        <p
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}