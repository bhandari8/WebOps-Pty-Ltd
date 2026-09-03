import { desc, eq } from "drizzle-orm";

import type {
  Enquiry,
  EnquiryInput,
  EnquiryStatus,
} from "@/types/enquiry";
import type { EnquiryRepository } from "./types";

import { db } from "@/db";
import { enquiries } from "@/db/schema";

function mapEnquiry(
  row: typeof enquiries.$inferSelect,
): Enquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    company: row.company ?? undefined,
    service: row.service,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

class DbEnquiryRepository implements EnquiryRepository {
  async getEnquiries(): Promise<Enquiry[]> {
    const rows = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt));

    return rows.map(mapEnquiry);
  }

  async getEnquiryById(
    id: string,
  ): Promise<Enquiry | null> {
    const rows = await db
      .select()
      .from(enquiries)
      .where(eq(enquiries.id, id))
      .limit(1);

    if (rows.length === 0) {
      return null;
    }

    return mapEnquiry(rows[0]);
  }

  async createEnquiry(
    input: EnquiryInput,
  ): Promise<Enquiry> {
    const [row] = await db
      .insert(enquiries)
      .values({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        company: input.company ?? null,
        service: input.service,
        message: input.message,
        status: "new",
      })
      .returning();

    if (!row) {
      throw new Error("Failed to create enquiry");
    }

    return mapEnquiry(row);
  }

  async updateEnquiryStatus(
    id: string,
    status: EnquiryStatus,
  ): Promise<Enquiry | null> {
    const [row] = await db
      .update(enquiries)
      .set({
        status,
      })
      .where(eq(enquiries.id, id))
      .returning();

    if (!row) {
      return null;
    }

    return mapEnquiry(row);
  }
}

export const enquiryRepository: EnquiryRepository =
  new DbEnquiryRepository();

export const getEnquiries = () =>
  enquiryRepository.getEnquiries();

export const getEnquiryById = (id: string) =>
  enquiryRepository.getEnquiryById(id);

export const createEnquiry = (input: EnquiryInput) =>
  enquiryRepository.createEnquiry(input);

export const updateEnquiryStatus = (
  id: string,
  status: EnquiryStatus,
) =>
  enquiryRepository.updateEnquiryStatus(
    id,
    status,
  );