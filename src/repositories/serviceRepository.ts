import { and, asc, eq } from "drizzle-orm";
import type { Service, ServiceInput } from "@/types/service";
import type { ServiceRepository } from "./types";

import { db } from "@/db";
import { media, services } from "@/db/schema";

function mapService(
  row: typeof services.$inferSelect,
  imageUrl?: string,
): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.shortDescription,
    description: row.description,
    icon: row.icon ?? undefined,
    image: imageUrl,
    imageMediaId: row.imageMediaId ?? undefined,
    features: row.features,
    featured: row.featured,
    active: row.active,
    order: row.sortOrder,
  };
}

async function getImageUrl(
  imageMediaId: string | null,
): Promise<string | undefined> {
  if (!imageMediaId) {
    return undefined;
  }

  const [image] = await db
    .select({
      url: media.url,
    })
    .from(media)
    .where(eq(media.id, imageMediaId))
    .limit(1);

  return image?.url;
}

class DbServiceRepository implements ServiceRepository {
  async getServices(): Promise<Service[]> {
    const rows = await db
      .select({
        service: services,
        imageUrl: media.url,
      })
      .from(services)
      .leftJoin(media, eq(services.imageMediaId, media.id))
      .orderBy(asc(services.sortOrder));

    return rows.map((row) =>
      mapService(row.service, row.imageUrl ?? undefined),
    );
  }

  async getActiveServices(): Promise<Service[]> {
    const rows = await db
      .select({
        service: services,
        imageUrl: media.url,
      })
      .from(services)
      .leftJoin(media, eq(services.imageMediaId, media.id))
      .where(eq(services.active, true))
      .orderBy(asc(services.sortOrder));

    return rows.map((row) =>
      mapService(row.service, row.imageUrl ?? undefined),
    );
  }

  async getFeaturedServices(): Promise<Service[]> {
  const rows = await db
    .select({
      service: services,
      imageUrl: media.url,
    })
    .from(services)
    .leftJoin(media, eq(services.imageMediaId, media.id))
    .where(
      and(
        eq(services.active, true),
        eq(services.featured, true),
      ),
    )
    .orderBy(asc(services.sortOrder));

  return rows.map((row) =>
    mapService(row.service, row.imageUrl ?? undefined),
  );
}
  
  async getServiceBySlug(slug: string): Promise<Service | null> {
    const [row] = await db
      .select({
        service: services,
        imageUrl: media.url,
      })
      .from(services)
      .leftJoin(media, eq(services.imageMediaId, media.id))
      .where(eq(services.slug, slug))
      .limit(1);

    if (!row) {
      return null;
    }

    return mapService(
      row.service,
      row.imageUrl ?? undefined,
    );
  }

  async getServiceById(id: string): Promise<Service | null> {
    const [row] = await db
      .select({
        service: services,
        imageUrl: media.url,
      })
      .from(services)
      .leftJoin(media, eq(services.imageMediaId, media.id))
      .where(eq(services.id, id))
      .limit(1);

    if (!row) {
      return null;
    }

    return mapService(
      row.service,
      row.imageUrl ?? undefined,
    );
  }

  async createService(input: ServiceInput): Promise<Service> {
    const [row] = await db
      .insert(services)
      .values({
        slug: input.slug,
        title: input.title,
        shortDescription: input.shortDescription,
        description: input.description,
        icon: input.icon ?? null,
        imageMediaId: input.imageMediaId ?? null,
        features: input.features,
        featured: input.featured,
        active: input.active,
        sortOrder: input.order,
      })
      .returning();

    if (!row) {
      throw new Error("Failed to create service");
    }

    const imageUrl = await getImageUrl(row.imageMediaId);

    return mapService(row, imageUrl);
  }

  async updateService(
    id: string,
    input: Partial<ServiceInput>,
  ): Promise<Service | null> {
    const [row] = await db
      .update(services)
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

        ...(input.icon !== undefined && {
          icon: input.icon ?? null,
        }),

        ...(input.imageMediaId !== undefined && {
          imageMediaId: input.imageMediaId ?? null,
        }),

        ...(input.features !== undefined && {
          features: input.features,
        }),

        ...(input.featured !== undefined && {
          featured: input.featured,
        }),

        ...(input.active !== undefined && {
          active: input.active,
        }),

        ...(input.order !== undefined && {
          sortOrder: input.order,
        }),

        updatedAt: new Date(),
      })
      .where(eq(services.id, id))
      .returning();

    if (!row) {
      return null;
    }

    const imageUrl = await getImageUrl(row.imageMediaId);

    return mapService(row, imageUrl);
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning({
        id: services.id,
      });

    return result.length > 0;
  }
}

export const serviceRepository: ServiceRepository =
  new DbServiceRepository();

export const getServices = () =>
  serviceRepository.getServices();

export const getActiveServices = () =>
  serviceRepository.getActiveServices();

export const getFeaturedServices = () =>
  serviceRepository.getFeaturedServices();

export const getServiceBySlug = (slug: string) =>
  serviceRepository.getServiceBySlug(slug);

export const getServiceById = (id: string) =>
  serviceRepository.getServiceById(id);

export const createService = (input: ServiceInput) =>
  serviceRepository.createService(input);

export const updateService = (
  id: string,
  input: Partial<ServiceInput>,
) => serviceRepository.updateService(id, input);

export const deleteService = (id: string) =>
  serviceRepository.deleteService(id);