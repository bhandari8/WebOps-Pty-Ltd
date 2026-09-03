export interface PortfolioProject {
  id: string;

  slug: string;

  title: string;

  shortDescription: string;

  description: string;

  category: string;

  client?: string;

  industry?: string;

  /**
   * Human-readable service names.
   * Used by the public website.
   */
  services: string[];

  /**
   * Database service IDs.
   * Used by admin editing and relationship management.
   */
  serviceIds?: string[];

  technologies?: string[];

  thumbnail: string;

  thumbnailMediaId?: string;

  images: string[];

  imageMediaIds?: string[];

  challenge?: string;

  solution?: string;

  outcome?: string;

  featured: boolean;

  published: boolean;

  order: number;
}

export type PortfolioProjectInput = Omit<PortfolioProject, "id">;

export const PORTFOLIO_CATEGORIES = [
  "Web Development",
  "IT Solutions",
  "Graphic Design",
  "Digital Marketing",
] as const;