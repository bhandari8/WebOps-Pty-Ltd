import { eq } from "drizzle-orm";

import { db } from "@/db";
import { media } from "@/db/schema";

export interface CreateMediaInput {
  url: string;
  publicId: string;
  resourceType?: string;
  mimeType: string;
  originalName?: string;
  width?: number;
  height?: number;
  bytes?: number;
  alt?: string;
}

export interface Media {
  id: string;
  url: string;
  publicId: string;
  resourceType: string;
  mimeType: string;
  originalName?: string;
  width?: number;
  height?: number;
  bytes?: number;
  alt: string;
  createdAt: string;
  updatedAt: string;
}

function mapMedia(row: typeof media.$inferSelect): Media {
  return {
    id: row.id,
    url: row.url,
    publicId: row.publicId,
    resourceType: row.resourceType,
    mimeType: row.mimeType,
    originalName: row.originalName ?? undefined,
    width: row.width ?? undefined,
    height: row.height ?? undefined,
    bytes: row.bytes ?? undefined,
    alt: row.alt,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function createMedia(
  input: CreateMediaInput,
): Promise<Media> {
  const [row] = await db
    .insert(media)
    .values({
      url: input.url,
      publicId: input.publicId,
      resourceType: input.resourceType ?? "image",
      mimeType: input.mimeType,
      originalName: input.originalName ?? null,
      width: input.width ?? null,
      height: input.height ?? null,
      bytes: input.bytes ?? null,
      alt: input.alt ?? "",
    })
    .returning();

  if (!row) {
    throw new Error("Failed to create media record");
  }

  return mapMedia(row);
}

export async function getMediaById(
  id: string,
): Promise<Media | null> {
  const [row] = await db
    .select()
    .from(media)
    .where(eq(media.id, id))
    .limit(1);

  return row ? mapMedia(row) : null;
}

export async function getMediaByPublicId(
  publicId: string,
): Promise<Media | null> {
  const [row] = await db
    .select()
    .from(media)
    .where(eq(media.publicId, publicId))
    .limit(1);

  return row ? mapMedia(row) : null;
}