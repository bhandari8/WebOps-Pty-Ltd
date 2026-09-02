import type { Enquiry, EnquiryInput, EnquiryStatus } from "@/types/enquiry";
import type { EnquiryRepository } from "./types";
import { enquiries as seedEnquiries } from "@/data/enquiries";
import { readOrSeed, writeStorage, STORAGE_KEYS } from "@/lib/storage";
import { generateId } from "@/lib/id";

class StaticEnquiryRepository implements EnquiryRepository {
  private readAll(): Enquiry[] {
    return readOrSeed(STORAGE_KEYS.enquiries, seedEnquiries);
  }

  private writeAll(items: Enquiry[]): void {
    writeStorage(STORAGE_KEYS.enquiries, items);
  }

  async getEnquiries(): Promise<Enquiry[]> {
    return [...this.readAll()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getEnquiryById(id: string): Promise<Enquiry | null> {
    const all = this.readAll();
    return all.find((e) => e.id === id) ?? null;
  }

  async createEnquiry(input: EnquiryInput): Promise<Enquiry> {
    const all = this.readAll();
    const enquiry: Enquiry = {
      ...input,
      id: generateId("enq"),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    this.writeAll([...all, enquiry]);
    return enquiry;
  }

  async updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry | null> {
    const all = this.readAll();
    const index = all.findIndex((e) => e.id === id);
    if (index === -1) return null;
    const updated: Enquiry = { ...all[index], status };
    const next = [...all];
    next[index] = updated;
    this.writeAll(next);
    return updated;
  }
}

export const enquiryRepository: EnquiryRepository = new StaticEnquiryRepository();

export const getEnquiries = () => enquiryRepository.getEnquiries();
export const getEnquiryById = (id: string) => enquiryRepository.getEnquiryById(id);
export const createEnquiry = (input: EnquiryInput) => enquiryRepository.createEnquiry(input);
export const updateEnquiryStatus = (id: string, status: EnquiryStatus) =>
  enquiryRepository.updateEnquiryStatus(id, status);
