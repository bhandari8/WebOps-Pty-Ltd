import type { Service, ServiceInput } from "@/types/service";
import type { ServiceRepository } from "./types";
import { services as seedServices } from "@/data/services";
import { readOrSeed, writeStorage, STORAGE_KEYS } from "@/lib/storage";
import { generateId } from "@/lib/id";

class StaticServiceRepository implements ServiceRepository {
  private readAll(): Service[] {
    return readOrSeed(STORAGE_KEYS.services, seedServices);
  }

  private writeAll(items: Service[]): void {
    writeStorage(STORAGE_KEYS.services, items);
  }

  async getServices(): Promise<Service[]> {
    return [...this.readAll()].sort((a, b) => a.order - b.order);
  }

  async getActiveServices(): Promise<Service[]> {
    const all = await this.getServices();
    return all.filter((s) => s.active);
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const all = this.readAll();
    return all.find((s) => s.slug === slug) ?? null;
  }

  async getServiceById(id: string): Promise<Service | null> {
    const all = this.readAll();
    return all.find((s) => s.id === id) ?? null;
  }

  async createService(input: ServiceInput): Promise<Service> {
    const all = this.readAll();
    const service: Service = { ...input, id: generateId("svc") };
    this.writeAll([...all, service]);
    return service;
  }

  async updateService(id: string, input: Partial<ServiceInput>): Promise<Service | null> {
    const all = this.readAll();
    const index = all.findIndex((s) => s.id === id);
    if (index === -1) return null;
    const updated: Service = { ...all[index], ...input };
    const next = [...all];
    next[index] = updated;
    this.writeAll(next);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    const all = this.readAll();
    const next = all.filter((s) => s.id !== id);
    if (next.length === all.length) return false;
    this.writeAll(next);
    return true;
  }
}

export const serviceRepository: ServiceRepository = new StaticServiceRepository();

export const getServices = () => serviceRepository.getServices();
export const getActiveServices = () => serviceRepository.getActiveServices();
export const getServiceBySlug = (slug: string) => serviceRepository.getServiceBySlug(slug);
export const getServiceById = (id: string) => serviceRepository.getServiceById(id);
export const createService = (input: ServiceInput) => serviceRepository.createService(input);
export const updateService = (id: string, input: Partial<ServiceInput>) =>
  serviceRepository.updateService(id, input);
export const deleteService = (id: string) => serviceRepository.deleteService(id);
