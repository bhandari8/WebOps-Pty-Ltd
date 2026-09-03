import { and, asc, eq, inArray } from "drizzle-orm";
import type {
  PortfolioProject,
  PortfolioProjectInput,
} from "@/types/portfolio";
import type { PortfolioRepository } from "./types";

import { db } from "@/db";
import {
  media,
  portfolioProjectMedia,
  portfolioProjectServices,
  portfolioProjects,
  services,
} from "@/db/schema";

type ProjectRow = typeof portfolioProjects.$inferSelect;

function mapProject(
  project: ProjectRow,
  projectServices: string[],
  projectServiceIds: string[],
  projectImageIds: string[],
  projectImages: string[],
  thumbnailUrl: string,
): PortfolioProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    description: project.description,
    category: project.category,
    client: project.client ?? undefined,
    industry: project.industry ?? undefined,

    services: projectServices,
    serviceIds: projectServiceIds,

    technologies: project.technologies,
    thumbnail: thumbnailUrl,
    thumbnailMediaId: project.thumbnailMediaId,
    images: projectImages,
    imageMediaIds: projectImageIds,
    challenge: project.challenge ?? undefined,
    solution: project.solution ?? undefined,
    outcome: project.outcome ?? undefined,
    featured: project.featured,
    published: project.published,
    order: project.sortOrder,
  };
}

class DbPortfolioRepository implements PortfolioRepository {
  private async mapProjects(
    projects: ProjectRow[],
  ): Promise<PortfolioProject[]> {
    if (projects.length === 0) {
      return [];
    }

    const projectIds = projects.map((project) => project.id);
    const thumbnailMediaIds = projects.map(
      (project) => project.thumbnailMediaId,
    );

    const serviceRows = await db
      .select({
        projectId: portfolioProjectServices.projectId,
        serviceId: portfolioProjectServices.serviceId,
        serviceTitle: services.title,
      })
      .from(portfolioProjectServices)
      .innerJoin(
        services,
        eq(portfolioProjectServices.serviceId, services.id),
      )
      .where(
        inArray(
          portfolioProjectServices.projectId,
          projectIds,
        ),
      );

    const mediaRows = await db
      .select({
        projectId: portfolioProjectMedia.projectId,
        mediaId: portfolioProjectMedia.mediaId,
        url: media.url,
        sortOrder: portfolioProjectMedia.sortOrder,
      })
      .from(portfolioProjectMedia)
      .innerJoin(
        media,
        eq(portfolioProjectMedia.mediaId, media.id),
      )
      .where(inArray(portfolioProjectMedia.projectId, projectIds))
      .orderBy(asc(portfolioProjectMedia.sortOrder));

    const thumbnailRows = await db
      .select({
        mediaId: media.id,
        url: media.url,
      })
      .from(media)
      .where(inArray(media.id, thumbnailMediaIds));

    const serviceMap = new Map<string, string[]>();
    const serviceIdMap = new Map<string, string[]>();

    const imageIdMap = new Map<string, string[]>();
    const imageMap = new Map<string, string[]>();
    const thumbnailMap = new Map<string, string>();

    for (const row of serviceRows) {
      const existingNames =
        serviceMap.get(row.projectId) ?? [];
    
      existingNames.push(row.serviceTitle);
    
      serviceMap.set(row.projectId, existingNames);
    
      const existingIds =
        serviceIdMap.get(row.projectId) ?? [];
    
      existingIds.push(row.serviceId);
    
      serviceIdMap.set(row.projectId, existingIds);
    }

    for (const row of mediaRows) {
      const existingIds = imageIdMap.get(row.projectId) ?? [];
      existingIds.push(row.mediaId);
      imageIdMap.set(row.projectId, existingIds);

      const existingUrls = imageMap.get(row.projectId) ?? [];
      existingUrls.push(row.url);
      imageMap.set(row.projectId, existingUrls);
    }

    for (const row of thumbnailRows) {
      thumbnailMap.set(row.mediaId, row.url);
    }

    return projects.map((project) => {
      const thumbnailUrl = thumbnailMap.get(
        project.thumbnailMediaId,
      );

      if (!thumbnailUrl) {
        throw new Error(
          `Thumbnail media not found for portfolio project ${project.id}`,
        );
      }

      return mapProject(
        project,
        serviceMap.get(project.id) ?? [],
        serviceIdMap.get(project.id) ?? [],
        imageIdMap.get(project.id) ?? [],
        imageMap.get(project.id) ?? [],
        thumbnailUrl,
      );
    });
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    const projects = await db
      .select()
      .from(portfolioProjects)
      .orderBy(asc(portfolioProjects.sortOrder));

    return this.mapProjects(projects);
  }

  async getPublishedPortfolioProjects(): Promise<PortfolioProject[]> {
    const projects = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.published, true))
      .orderBy(asc(portfolioProjects.sortOrder));

    return this.mapProjects(projects);
  }

  async getFeaturedPortfolioProjects(): Promise<PortfolioProject[]> {
    const projects = await db
      .select()
      .from(portfolioProjects)
      .where(
        and(
          eq(portfolioProjects.published, true),
          eq(portfolioProjects.featured, true),
        ),
      )
      .orderBy(asc(portfolioProjects.sortOrder))
      .limit(3);

    return this.mapProjects(projects);
  }

  async getPortfolioProjectBySlug(
    slug: string,
  ): Promise<PortfolioProject | null> {
    const projects = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.slug, slug))
      .limit(1);

    if (projects.length === 0) {
      return null;
    }

    const mapped = await this.mapProjects(projects);

    return mapped[0] ?? null;
  }

  async getPublishedPortfolioProjectsByServiceId(
    serviceId: string,
  ): Promise<PortfolioProject[]> {
    const projects = await db
      .select({
        project: portfolioProjects,
      })
      .from(portfolioProjects)
      .innerJoin(
        portfolioProjectServices,
        eq(
          portfolioProjects.id,
          portfolioProjectServices.projectId,
        ),
      )
      .where(
        and(
          eq(portfolioProjects.published, true),
          eq(
            portfolioProjectServices.serviceId,
            serviceId,
          ),
        ),
      )
      .orderBy(asc(portfolioProjects.sortOrder));

    return this.mapProjects(
      projects.map((row) => row.project),
    );
  }

  async getPortfolioProjectById(
    id: string,
  ): Promise<PortfolioProject | null> {
    const projects = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.id, id))
      .limit(1);

    if (projects.length === 0) {
      return null;
    }

    const mapped = await this.mapProjects(projects);

    return mapped[0] ?? null;
  }

  async createPortfolioProject(
    input: PortfolioProjectInput,
  ): Promise<PortfolioProject> {
    const thumbnailMediaId = input.thumbnailMediaId;

    if (!thumbnailMediaId) {
      throw new Error(
        "Portfolio project requires a thumbnail media ID",
      );
    }

    return db.transaction(async (tx) => {
      const [project] = await tx
        .insert(portfolioProjects)
        .values({
          slug: input.slug,
          title: input.title,
          shortDescription: input.shortDescription,
          description: input.description,
          category: input.category,
          client: input.client ?? null,
          industry: input.industry ?? null,
          technologies: input.technologies ?? [],
          thumbnailMediaId,
          challenge: input.challenge ?? null,
          solution: input.solution ?? null,
          outcome: input.outcome ?? null,
          featured: input.featured,
          published: input.published,
          sortOrder: input.order,
        })
        .returning();

      if (!project) {
        throw new Error(
          "Failed to create portfolio project",
        );
      }

      const serviceIds = input.serviceIds ?? [];

      if (serviceIds.length > 0) {
        await tx.insert(portfolioProjectServices).values(
          serviceIds.map((serviceId) => ({
            projectId: project.id,
            serviceId,
          })),
        );
      }

      const imageMediaIds = input.imageMediaIds ?? [];

      if (imageMediaIds.length > 0) {
        await tx.insert(portfolioProjectMedia).values(
          imageMediaIds.map((mediaId, index) => ({
            projectId: project.id,
            mediaId,
            sortOrder: index,
          })),
        );
      }

      const [thumbnail] = await tx
        .select({
          url: media.url,
        })
        .from(media)
        .where(eq(media.id, project.thumbnailMediaId))
        .limit(1);

      if (!thumbnail) {
        throw new Error(
          "Portfolio thumbnail media not found",
        );
      }

      const imageRows = await tx
        .select({
          mediaId: portfolioProjectMedia.mediaId,
          url: media.url,
        })
        .from(portfolioProjectMedia)
        .innerJoin(
          media,
          eq(portfolioProjectMedia.mediaId, media.id),
        )
        .where(
          eq(
            portfolioProjectMedia.projectId,
            project.id,
          ),
        )
        .orderBy(
          asc(portfolioProjectMedia.sortOrder),
        );

      const serviceRows = await tx
        .select({
          serviceId: portfolioProjectServices.serviceId,
          serviceTitle: services.title,
        })
        .from(portfolioProjectServices)
        .innerJoin(
          services,
          eq(portfolioProjectServices.serviceId, services.id),
        )
        .where(
          eq(
            portfolioProjectServices.projectId,
            project.id,
          ),
      );

      return mapProject(
        project,
        serviceRows.map((row) => row.serviceTitle),
        serviceRows.map((row) => row.serviceId),
        imageRows.map((row) => row.mediaId),
        imageRows.map((row) => row.url),
        thumbnail.url,
      );
    });
  }

  async updatePortfolioProject(
    id: string,
    input: Partial<PortfolioProjectInput>,
  ): Promise<PortfolioProject | null> {
    return db.transaction(async (tx) => {
      const existing = await tx
        .select()
        .from(portfolioProjects)
        .where(eq(portfolioProjects.id, id))
        .limit(1);

      if (existing.length === 0) {
        return null;
      }

      const [project] = await tx
        .update(portfolioProjects)
        .set({
          ...(input.slug !== undefined && {
            slug: input.slug,
          }),

          ...(input.title !== undefined && {
            title: input.title,
          }),

          ...(input.shortDescription !== undefined && {
            shortDescription: input.shortDescription,
          }),

          ...(input.description !== undefined && {
            description: input.description,
          }),

          ...(input.category !== undefined && {
            category: input.category,
          }),

          ...(input.client !== undefined && {
            client: input.client ?? null,
          }),

          ...(input.industry !== undefined && {
            industry: input.industry ?? null,
          }),

          ...(input.technologies !== undefined && {
            technologies: input.technologies,
          }),

          ...(input.thumbnailMediaId !== undefined && {
            thumbnailMediaId: input.thumbnailMediaId,
          }),

          ...(input.challenge !== undefined && {
            challenge: input.challenge ?? null,
          }),

          ...(input.solution !== undefined && {
            solution: input.solution ?? null,
          }),

          ...(input.outcome !== undefined && {
            outcome: input.outcome ?? null,
          }),

          ...(input.featured !== undefined && {
            featured: input.featured,
          }),

          ...(input.published !== undefined && {
            published: input.published,
          }),

          ...(input.order !== undefined && {
            sortOrder: input.order,
          }),

          updatedAt: new Date(),
        })
        .where(eq(portfolioProjects.id, id))
        .returning();

      if (!project) {
        return null;
      }

      if (input.serviceIds !== undefined) {
        await tx
          .delete(portfolioProjectServices)
          .where(
            eq(
              portfolioProjectServices.projectId,
              id,
            ),
          );
        
        if (input.serviceIds.length > 0) {
          await tx.insert(portfolioProjectServices).values(
            input.serviceIds.map((serviceId) => ({
              projectId: id,
              serviceId,
            })),
          );
        }
      }

      if (input.imageMediaIds !== undefined) {
        await tx
          .delete(portfolioProjectMedia)
          .where(
            eq(
              portfolioProjectMedia.projectId,
              id,
            ),
          );

        if (input.imageMediaIds.length > 0) {
          await tx.insert(portfolioProjectMedia).values(
            input.imageMediaIds.map((mediaId, index) => ({
              projectId: id,
              mediaId,
              sortOrder: index,
            })),
          );
        }
      }

      const serviceRows = await tx
        .select({
          serviceId: portfolioProjectServices.serviceId,
          serviceTitle: services.title,
        })
        .from(portfolioProjectServices)
        .innerJoin(
          services,
          eq(portfolioProjectServices.serviceId, services.id),
        )
        .where(
          eq(
            portfolioProjectServices.projectId,
            id,
          ),
        );

      const imageRows = await tx
        .select({
          mediaId: portfolioProjectMedia.mediaId,
          url: media.url,
        })
        .from(portfolioProjectMedia)
        .innerJoin(
          media,
          eq(portfolioProjectMedia.mediaId, media.id),
        )
        .where(
          eq(
            portfolioProjectMedia.projectId,
            id,
          ),
        )
        .orderBy(
          asc(portfolioProjectMedia.sortOrder),
        );

      const [thumbnail] = await tx
        .select({
          url: media.url,
        })
        .from(media)
        .where(eq(media.id, project.thumbnailMediaId))
        .limit(1);

      if (!thumbnail) {
        throw new Error(
          "Portfolio thumbnail media not found",
        );
      }

      return mapProject(
        project,
        serviceRows.map((row) => row.serviceTitle),
        serviceRows.map((row) => row.serviceId),
        imageRows.map((row) => row.mediaId),
        imageRows.map((row) => row.url),
        thumbnail.url,
      );
    });
  }

  async deletePortfolioProject(
    id: string,
  ): Promise<boolean> {
    const result = await db
      .delete(portfolioProjects)
      .where(eq(portfolioProjects.id, id))
      .returning({
        id: portfolioProjects.id,
      });

    return result.length > 0;
  }
}

export const portfolioRepository: PortfolioRepository =
  new DbPortfolioRepository();

export const getPortfolioProjects = () =>
  portfolioRepository.getPortfolioProjects();

export const getPublishedPortfolioProjects = () =>
  portfolioRepository.getPublishedPortfolioProjects();

export const getFeaturedPortfolioProjects = () =>
  portfolioRepository.getFeaturedPortfolioProjects();

export const getPortfolioProjectBySlug = (
  slug: string,
) => portfolioRepository.getPortfolioProjectBySlug(slug);

export const getPublishedPortfolioProjectsByServiceId = (
  serviceId: string,
) =>
  portfolioRepository.getPublishedPortfolioProjectsByServiceId(
    serviceId,
  );

export const getPortfolioProjectById = (
  id: string,
) => portfolioRepository.getPortfolioProjectById(id);

export const createPortfolioProject = (
  input: PortfolioProjectInput,
) => portfolioRepository.createPortfolioProject(input);

export const updatePortfolioProject = (
  id: string,
  input: Partial<PortfolioProjectInput>,
) =>
  portfolioRepository.updatePortfolioProject(
    id,
    input,
  );

export const deletePortfolioProject = (
  id: string,
) => portfolioRepository.deletePortfolioProject(id);