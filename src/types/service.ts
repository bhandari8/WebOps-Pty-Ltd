export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  features: string[];
  featured: boolean;
  active: boolean;
  order: number;
}

export type ServiceInput = Omit<Service, "id">;
