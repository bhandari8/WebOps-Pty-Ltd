import type { AboutContent } from "@/types/about";
import type { AboutRepository } from "./types";
import { aboutContent as seedAbout } from "@/data/about";
import { readOrSeed, writeStorage, STORAGE_KEYS } from "@/lib/storage";

class StaticAboutRepository implements AboutRepository {
  async getAboutContent(): Promise<AboutContent> {
    return readOrSeed(STORAGE_KEYS.about, seedAbout);
  }

  async updateAboutContent(input: Partial<AboutContent>): Promise<AboutContent> {
    const current = await this.getAboutContent();
    const updated: AboutContent = { ...current, ...input };
    writeStorage(STORAGE_KEYS.about, updated);
    return updated;
  }
}

export const aboutRepository: AboutRepository = new StaticAboutRepository();

export const getAboutContent = () => aboutRepository.getAboutContent();
export const updateAboutContent = (input: Partial<AboutContent>) =>
  aboutRepository.updateAboutContent(input);
