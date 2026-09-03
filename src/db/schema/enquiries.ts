import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "new",
  "contacted",
  "in_progress",
  "completed",
  "archived",
]);

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 160 }).notNull(),

    email: varchar("email", { length: 320 }).notNull(),

    phone: varchar("phone", { length: 50 }),

    company: varchar("company", { length: 160 }),

    service: varchar("service", { length: 100 }).notNull(),

    message: text("message").notNull(),

    status: enquiryStatusEnum("status")
      .notNull()
      .default("new"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("enquiries_status_idx").on(table.status),
    index("enquiries_created_at_idx").on(table.createdAt),
  ],
);