import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { requireAdminSession } from "@/lib/adminAuth";
import { createMedia } from "@/repositories/mediaRepository";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder: string;
  },
) {
  return new Promise<{
    secure_url: string;
    public_id: string;
    resource_type: string;
    format?: string;
    width?: number;
    height?: number;
    bytes: number;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        });
      },
    );

    uploadStream.end(buffer);
  });
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported image type. Use JPEG, PNG, WebP, or AVIF.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 5 MB." },
        { status: 400 },
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The uploaded image is empty." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await uploadToCloudinary(buffer, {
      folder: "webops",
    });

    try {
      const media = await createMedia({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        resourceType: uploaded.resource_type,
        mimeType: file.type,
        originalName: file.name,
        width: uploaded.width,
        height: uploaded.height,
        bytes: uploaded.bytes,
        alt: "",
      });

      return NextResponse.json(
        {
          id: media.id,
          url: media.url,
        },
        { status: 201 },
      );
    } catch (databaseError) {
      // Do not leave an orphaned Cloudinary asset if the DB insert fails.
      await cloudinary.uploader.destroy(uploaded.public_id, {
        resource_type: "image",
      });

      throw databaseError;
    }
  } catch (error) {
    console.error("Media upload failed:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 },
    );
  }
}