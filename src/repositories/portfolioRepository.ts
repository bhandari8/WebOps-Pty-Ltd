import type { PortfolioProject, PortfolioProjectInput } from "@/types/portfolio";
import type { PortfolioRepository } from "./types";
import { portfolioProjects as seedProjects } from "@/data/portfolio";
import { readOrSeed, writeStorage, STORAGE_KEYS } from "@/lib/storage";
import { generateId } from "@/lib/id";

class StaticPortfolioRepository implements PortfolioRepository {
  private readAll(): PortfolioProject[] {
    return readOrSeed(STORAGE_KEYS.portfolio, seedProjects);
  }

  private writeAll(items: PortfolioProject[]): void {
    writeStorage(STORAGE_KEYS.portfolio, items);
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return [...this.readAll()].sort((a, b) => a.order - b.order);
  }

  async getPublishedPortfolioProjects(): Promise<PortfolioProject[]> {
    const all = await this.getPortfolioProjects();
    return all.filter((p) => p.published);
  }

  async getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    const all = this.readAll();
    return all.find((p) => p.slug === slug) ?? null;
  }

  async getPortfolioProjectById(id: string): Promise<PortfolioProject | null> {
    const all = this.readAll();
    return all.find((p) => p.id === id) ?? null;
  }

  async createPortfolioProject(input: PortfolioProjectInput): Promise<PortfolioProject> {
    const all = this.readAll();
    const project: PortfolioProject = { ...input, id: generateId("prj") };
    this.writeAll([...all, project]);
    return project;
  }

  async updatePortfolioProject(
    id: string,
    input: Partial<PortfolioProjectInput>
  ): Promise<PortfolioProject | null> {
    const all = this.readAll();
    const index = all.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updated: PortfolioProject = { ...all[index], ...input };
    const next = [...all];
    next[index] = updated;
    this.writeAll(next);
    return updated;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    const all = this.readAll();
    const next = all.filter((p) => p.id !== id);
    if (next.length === all.length) return false;
    this.writeAll(next);
    return true;
  }
}

export const portfolioRepository: PortfolioRepository = new StaticPortfolioRepository();

export const getPortfolioProjects = () => portfolioRepository.getPortfolioProjects();
export const getPublishedPortfolioProjects = () =>
  portfolioRepository.getPublishedPortfolioProjects();
export const getPortfolioProjectBySlug = (slug: string) =>
  portfolioRepository.getPortfolioProjectBySlug(slug);
export const getPortfolioProjectById = (id: string) =>
  portfolioRepository.getPortfolioProjectById(id);
export const createPortfolioProject = (input: PortfolioProjectInput) =>
  portfolioRepository.createPortfolioProject(input);
export const updatePortfolioProject = (id: string, input: Partial<PortfolioProjectInput>) =>
  portfolioRepository.updatePortfolioProject(id, input);
export const deletePortfolioProject = (id: string) =>
  portfolioRepository.deletePortfolioProject(id);
