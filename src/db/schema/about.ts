import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const aboutContent = pgTable("about_content", {
  id: uuid("id").defaultRandom().primaryKey(),

  /**
   * Used to guarantee that the CMS has one logical
   * About content record.
   */
  singletonKey: varchar("singleton_key", { length: 50 })
    .notNull()
    .default("default")
    .unique(),

  title: text("title").notNull(),

  introduction: text("introduction").notNull(),

  mission: text("mission"),

  vision: text("vision"),

  /**
   * Small static list of capabilities.
   * Keeping this as a PostgreSQL array is sufficient
   * for the current CMS requirements.
   */
  capabilities: text("capabilities").array().notNull().default([]),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const aboutValues = pgTable(
  "about_values",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    aboutContentId: uuid("about_content_id")
      .notNull()
      .references(() => aboutContent.id, {
        onDelete: "cascade",
      }),

    title: varchar("title", { length: 160 }).notNull(),

    description: text("description").notNull(),

    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    index("about_values_content_order_idx").on(
      table.aboutContentId,
      table.sortOrder,
    ),
  ],
);