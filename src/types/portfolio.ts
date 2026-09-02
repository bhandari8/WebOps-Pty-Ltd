export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  client?: string;
  industry?: string;
  services: string[];
  technologies?: string[];
  thumbnail: string;
  images: string[];
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

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];
