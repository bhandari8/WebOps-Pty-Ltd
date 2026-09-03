import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { media } from "./media";
import { services } from "./services";

export const portfolioProjects = pgTable(
  "portfolio_projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: varchar("slug", { length: 160 }).notNull().unique(),

    title: varchar("title", { length: 200 }).notNull(),

    shortDescription: text("short_description").notNull(),

    description: text("description").notNull(),

    category: varchar("category", { length: 100 }).notNull(),

    client: varchar("client", { length: 160 }),

    industry: varchar("industry", { length: 160 }),

    technologies: text("technologies").array().notNull().default([]),

    /**
     * Every published project must have a thumbnail.
     */
    thumbnailMediaId: uuid("thumbnail_media_id")
      .notNull()
      .references(() => media.id, {
        onDelete: "restrict",
      }),

    challenge: text("challenge"),

    solution: text("solution"),

    outcome: text("outcome"),

    featured: boolean("featured").notNull().default(false),

    published: boolean("published").notNull().default(false),

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
    index("portfolio_published_order_idx").on(
      table.published,
      table.sortOrder,
    ),
    index("portfolio_featured_idx").on(table.featured),
    index("portfolio_category_idx").on(table.category),
  ],
);

/**
 * Many-to-many:
 *
 * portfolio project <-> services
 */
export const portfolioProjectServices = pgTable(
  "portfolio_project_services",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => portfolioProjects.id, {
        onDelete: "cascade",
      }),

    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.projectId, table.serviceId],
    }),
    index("portfolio_project_services_service_idx").on(
      table.serviceId,
    ),
  ],
);

/**
 * Portfolio gallery:
 *
 * portfolio project <-> media
 *
 * A project can have multiple gallery images.
 */
export const portfolioProjectMedia = pgTable(
  "portfolio_project_media",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => portfolioProjects.id, {
        onDelete: "cascade",
      }),

    mediaId: uuid("media_id")
      .notNull()
      .references(() => media.id, {
        onDelete: "restrict",
      }),

    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    primaryKey({
      columns: [table.projectId, table.mediaId],
    }),
    index("portfolio_project_media_media_idx").on(
      table.mediaId,
    ),
    index("portfolio_project_media_order_idx").on(
      table.projectId,
      table.sortOrder,
    ),
  ],
);