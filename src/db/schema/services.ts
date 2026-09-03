import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { media } from "./media";

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: varchar("slug", { length: 160 }).notNull().unique(),

    title: varchar("title", { length: 160 }).notNull(),

    shortDescription: text("short_description").notNull(),

    description: text("description").notNull(),

    icon: varchar("icon", { length: 100 }),

    /**
     * Optional service image.
     */
    imageMediaId: uuid("image_media_id").references(() => media.id, {
      onDelete: "set null",
    }),

    features: text("features").array().notNull().default([]),

    featured: boolean("featured").notNull().default(false),

    active: boolean("active").notNull().default(true),

    sortOrder: integer("sort_order").notNull().default(0),

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
    index("services_active_order_idx").on(
      table.active,
      table.sortOrder,
    ),
    index("services_featured_idx").on(table.featured),
  ],
);