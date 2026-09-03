import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const media = pgTable(
  "media",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    /**
     * Cloudinary secure URL.
     */
    url: text("url").notNull(),

    /**
     * Cloudinary public ID used for management/deletion.
     */
    publicId: varchar("public_id", { length: 500 }).notNull().unique(),

    /**
     * Cloudinary resource type.
     * Currently we primarily support images.
     */
    resourceType: varchar("resource_type", { length: 50 })
      .notNull()
      .default("image"),

    mimeType: varchar("mime_type", { length: 100 }).notNull(),

    /**
     * Original filename supplied by the uploader.
     */
    originalName: varchar("original_name", { length: 255 }),

    /**
     * Cloudinary image metadata.
     */
    width: integer("width"),
    height: integer("height"),
    bytes: integer("bytes"),

    /**
     * Optional accessible description for the image.
     */
    alt: varchar("alt", { length: 300 }).notNull().default(""),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("media_created_at_idx").on(table.createdAt),
  ],
);