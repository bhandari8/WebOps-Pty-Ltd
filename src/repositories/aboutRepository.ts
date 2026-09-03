import { asc, eq } from "drizzle-orm";

import type { AboutContent } from "@/types/about";
import type { AboutRepository } from "./types";

import { db } from "@/db";
import { aboutContent, aboutValues } from "@/db/schema";

const SINGLETON_KEY = "default";

class DbAboutRepository implements AboutRepository {
  async getAboutContent(): Promise<AboutContent> {
    const [content] = await db
      .select()
      .from(aboutContent)
      .where(eq(aboutContent.singletonKey, SINGLETON_KEY))
      .limit(1);
    
    if (!content) {
      throw new Error(
        "About content has not been initialized",
      );
    }

    const values = await db
      .select({
        title: aboutValues.title,
        description: aboutValues.description,
      })
      .from(aboutValues)
      .where(eq(aboutValues.aboutContentId, content.id))
      .orderBy(asc(aboutValues.sortOrder));

    return {
      title: content.title,
      introduction: content.introduction,
      mission: content.mission ?? undefined,
      vision: content.vision ?? undefined,
      capabilities: content.capabilities,
      values,
    };
  }

  async updateAboutContent(
    input: Partial<AboutContent>,
  ): Promise<AboutContent> {
    return db.transaction(async (tx) => {
      const [current] = await tx
        .select()
        .from(aboutContent)
        .where(
          eq(
            aboutContent.singletonKey,
            SINGLETON_KEY,
          ),
        )
        .limit(1);

      if (!current) {
        throw new Error(
          "About content has not been initialized",
        );
      }

      const [updated] = await tx
        .update(aboutContent)
        .set({
          ...(input.title !== undefined && {
            title: input.title,
          }),

          ...(input.introduction !== undefined && {
            introduction: input.introduction,
          }),

          ...(input.mission !== undefined && {
            mission: input.mission ?? null,
          }),

          ...(input.vision !== undefined && {
            vision: input.vision ?? null,
          }),

          ...(input.capabilities !== undefined && {
            capabilities: input.capabilities,
          }),

          updatedAt: new Date(),
        })
        .where(eq(aboutContent.id, current.id))
        .returning();

      if (!updated) {
        throw new Error(
          "Failed to update about content",
        );
      }

      if (input.values !== undefined) {
        await tx
          .delete(aboutValues)
          .where(
            eq(
              aboutValues.aboutContentId,
              current.id,
            ),
          );

        if (input.values.length > 0) {
          await tx.insert(aboutValues).values(
            input.values.map((value, index) => ({
              aboutContentId: current.id,
              title: value.title,
              description: value.description,
              sortOrder: index,
            })),
          );
        }
      }

      const values = await tx
        .select({
          title: aboutValues.title,
          description: aboutValues.description,
        })
        .from(aboutValues)
        .where(
          eq(
            aboutValues.aboutContentId,
            current.id,
          ),
        )
        .orderBy(asc(aboutValues.sortOrder));

      return {
        title: updated.title,
        introduction: updated.introduction,
        mission: updated.mission ?? undefined,
        vision: updated.vision ?? undefined,
        capabilities: updated.capabilities,
        values,
      };
    });
  }
}

export const aboutRepository: AboutRepository =
  new DbAboutRepository();

export const getAboutContent = () =>
  aboutRepository.getAboutContent();

export const updateAboutContent = (
  input: Partial<AboutContent>,
) => aboutRepository.updateAboutContent(input);