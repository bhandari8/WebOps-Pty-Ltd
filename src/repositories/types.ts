import type { Service, ServiceInput } from "@/types/service";
import type { PortfolioProject, PortfolioProjectInput } from "@/types/portfolio";
import type { AboutContent } from "@/types/about";
import type { Enquiry, EnquiryInput, EnquiryStatus } from "@/types/enquiry";

export interface ServiceRepository {
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  getServiceById(id: string): Promise<Service | null>;
  createService(input: ServiceInput): Promise<Service>;
  updateService(id: string, input: Partial<ServiceInput>): Promise<Service | null>;
  deleteService(id: string): Promise<boolean>;
}

export interface PortfolioRepository {
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getPublishedPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null>;
  getPortfolioProjectById(id: string): Promise<PortfolioProject | null>;
  createPortfolioProject(input: PortfolioProjectInput): Promise<PortfolioProject>;
  updatePortfolioProject(
    id: string,
    input: Partial<PortfolioProjectInput>
  ): Promise<PortfolioProject | null>;
  deletePortfolioProject(id: string): Promise<boolean>;
}

export interface AboutRepository {
  getAboutContent(): Promise<AboutContent>;
  updateAboutContent(input: Partial<AboutContent>): Promise<AboutContent>;
}

export interface EnquiryRepository {
  getEnquiries(): Promise<Enquiry[]>;
  getEnquiryById(id: string): Promise<Enquiry | null>;
  createEnquiry(input: EnquiryInput): Promise<Enquiry>;
  updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry | null>;
}
