import path from "node:path";
import fs from "node:fs/promises";

import { v2 as cloudinary } from "cloudinary";
import { and, eq } from "drizzle-orm";

import { db } from "../src/db";
import {
  aboutContent,
  aboutValues,
  adminUsers,
  enquiries,
  media,
  portfolioProjectMedia,
  portfolioProjectServices,
  portfolioProjects,
  services,
} from "../src/db/schema";

import {
  services as serviceSeedData,
} from "../src/data/services";

import {
  portfolioProjects as portfolioSeedData,
} from "../src/data/portfolio";

import {
  aboutContent as aboutSeedData,
} from "../src/data/about";

import {
  enquiries as enquirySeedData,
} from "../src/data/enquiries";

import { hashPassword } from "../src/lib/password";

// -----------------------------------------------------------------------------
// Environment
// -----------------------------------------------------------------------------


function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return value;
}
const cloudName = requireEnv(
  "CLOUDINARY_CLOUD_NAME",
);

const apiKey = requireEnv(
  "CLOUDINARY_API_KEY",
);

const apiSecret = requireEnv(
  "CLOUDINARY_API_SECRET",
);

const adminEmail =
  requireEnv("ADMIN_EMAIL").toLowerCase();

const adminPassword =
  requireEnv("ADMIN_PASSWORD");

// -----------------------------------------------------------------------------
// Cloudinary
// -----------------------------------------------------------------------------

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// -----------------------------------------------------------------------------
// Paths
// -----------------------------------------------------------------------------

const publicDirectory = path.resolve(
  process.cwd(),
  "public",
);

// -----------------------------------------------------------------------------
// Media
// -----------------------------------------------------------------------------

async function getOrCreateMedia(
  imagePath: string,
  folder: string,
) {
  if (!imagePath) {
    throw new Error(
      "Cannot create media without an image path.",
    );
  }

  const normalizedPath =
    imagePath.replace(/^\/+/, "");

  const filePath = path.join(
    publicDirectory,
    normalizedPath,
  );

  // Make sure the source image actually exists.
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(
      `Local image not found: ${filePath}`,
    );
  }

  /*
   * Convert the local path into a deterministic
   * Cloudinary public ID.
   *
   * Example:
   *
   * /images/portfolio/project.png
   *
   * becomes:
   *
   * webops/portfolio/images/portfolio/project
   */
  const safeName = normalizedPath
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9/_-]/g, "-");

  const publicId =
    `webops/${folder}/${safeName}`;

  // Check our database first.
  const existing = await db
    .select()
    .from(media)
    .where(
      eq(media.publicId, publicId),
    )
    .limit(1);

  if (existing[0]) {
    console.log(
      `  ↳ Media already exists: ${normalizedPath}`,
    );

    return existing[0];
  }

  console.log(
    `  ↳ Uploading image: ${normalizedPath}`,
  );

  const result =
    await cloudinary.uploader.upload(
      filePath,
      {
        public_id: publicId,
        resource_type: "image",
        overwrite: false,
      },
    );

  const [created] = await db
    .insert(media)
    .values({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      mimeType: `image/${result.format}`,
      originalName:
        path.basename(filePath),
      width: result.width ?? null,
      height: result.height ?? null,
      bytes: result.bytes ?? null,
      alt: "",
    })
    .returning();

  if (!created) {
    throw new Error(
      `Failed to create media record for ${imagePath}`,
    );
  }

  console.log(
    `  ↳ Media created: ${created.id}`,
  );

  return created;
}

// -----------------------------------------------------------------------------
// Admin
// -----------------------------------------------------------------------------

async function seedAdmin() {
  console.log("\n👤 Seeding admin...");

  const existing = await db
    .select()
    .from(adminUsers)
    .where(
      eq(adminUsers.email, adminEmail),
    )
    .limit(1);

  if (existing[0]) {
    console.log(
      `  ✓ Admin already exists: ${adminEmail}`,
    );

    return;
  }

  const passwordHash =
    await hashPassword(adminPassword);

  await db.insert(adminUsers).values({
    email: adminEmail,
    passwordHash,
    isActive: true,
  });

  console.log(
    `  ✓ Created admin: ${adminEmail}`,
  );
}

// -----------------------------------------------------------------------------
// About
// -----------------------------------------------------------------------------

async function seedAbout() {
  console.log("\n📄 Seeding About content...");

  const existing = await db
    .select()
    .from(aboutContent)
    .where(
      eq(
        aboutContent.singletonKey,
        "default",
      ),
    )
    .limit(1);

  let content = existing[0];

  if (!content) {
    const [created] = await db
      .insert(aboutContent)
      .values({
        singletonKey: "default",
        title: aboutSeedData.title,
        introduction:
          aboutSeedData.introduction,
        mission:
          aboutSeedData.mission ?? null,
        vision:
          aboutSeedData.vision ?? null,
        capabilities:
          aboutSeedData.capabilities ?? [],
      })
      .returning();

    if (!created) {
      throw new Error(
        "Failed to create About content.",
      );
    }

    content = created;

    console.log(
      "  ✓ Created About content.",
    );
  } else {
    console.log(
      "  ✓ About content already exists.",
    );
  }

  const existingValues = await db
    .select()
    .from(aboutValues)
    .where(
      eq(
        aboutValues.aboutContentId,
        content.id,
      ),
    );

  if (existingValues.length === 0) {
    if (aboutSeedData.values?.length) {
      await db.insert(aboutValues).values(
        aboutSeedData.values.map(
          (value, index) => ({
            aboutContentId: content.id,
            title: value.title,
            description:
              value.description,
            sortOrder: index,
          }),
        ),
      );

      console.log(
        `  ✓ Created ${aboutSeedData.values.length} About values.`,
      );
    }
  } else {
    console.log(
      `  ✓ About values already exist (${existingValues.length}).`,
    );
  }
}

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

async function seedServices() {
  console.log("\n🛠️ Seeding services...");

  const serviceIdMap =
    new Map<string, string>();

  for (const seedService of serviceSeedData) {
    const existing = await db
      .select()
      .from(services)
      .where(
        eq(
          services.slug,
          seedService.slug,
        ),
      )
      .limit(1);

    let service = existing[0];

    let imageMediaId:
      | string
      | null =
      service?.imageMediaId ?? null;

    // Upload service image if needed.
    if (
      seedService.image &&
      !imageMediaId
    ) {
      const image =
        await getOrCreateMedia(
          seedService.image,
          "services",
        );

      imageMediaId = image.id;
    }

    if (!service) {
      const [created] = await db
        .insert(services)
        .values({
          slug: seedService.slug,
          title: seedService.title,
          shortDescription:
            seedService.shortDescription,
          description:
            seedService.description,
          icon:
            seedService.icon ?? null,
          imageMediaId,
          features:
            seedService.features ?? [],
          featured:
            seedService.featured,
          active:
            seedService.active,
          sortOrder:
            seedService.order,
        })
        .returning();

      if (!created) {
        throw new Error(
          `Failed to create service: ${seedService.slug}`,
        );
      }

      service = created;

      console.log(
        `  ✓ Created service: ${service.title}`,
      );
    } else {
      console.log(
        `  ✓ Service already exists: ${service.title}`,
      );
    }

    /*
     * Portfolio projects reference services
     * by database ID, while the old seed data
     * references services by title.
     */
    serviceIdMap.set(
      seedService.title,
      service.id,
    );
  }

  return serviceIdMap;
}

// -----------------------------------------------------------------------------
// Portfolio
// -----------------------------------------------------------------------------

async function seedPortfolio(
  serviceIdMap: Map<string, string>,
) {
  console.log("\n💼 Seeding portfolio...");

  for (
    const seedProject of portfolioSeedData
  ) {
    const existing = await db
      .select()
      .from(portfolioProjects)
      .where(
        eq(
          portfolioProjects.slug,
          seedProject.slug,
        ),
      )
      .limit(1);

    let project = existing[0];

    /*
     * Portfolio projects require a thumbnail,
     * so make sure its media record exists first.
     */
    const thumbnail =
      await getOrCreateMedia(
        seedProject.thumbnail,
        "portfolio",
      );

    if (!project) {
      const [created] = await db
        .insert(portfolioProjects)
        .values({
          slug: seedProject.slug,
          title: seedProject.title,
          shortDescription:
            seedProject.shortDescription,
          description:
            seedProject.description,
          category:
            seedProject.category,
          client:
            seedProject.client ?? null,
          industry:
            seedProject.industry ?? null,
          technologies:
            seedProject.technologies ?? [],
          thumbnailMediaId:
            thumbnail.id,
          challenge:
            seedProject.challenge ?? null,
          solution:
            seedProject.solution ?? null,
          outcome:
            seedProject.outcome ?? null,
          featured:
            seedProject.featured,
          published:
            seedProject.published,
          sortOrder:
            seedProject.order,
        })
        .returning();

      if (!created) {
        throw new Error(
          `Failed to create portfolio project: ${seedProject.slug}`,
        );
      }

      project = created;

      console.log(
        `  ✓ Created project: ${project.title}`,
      );
    } else {
      console.log(
        `  ✓ Project already exists: ${project.title}`,
      );
    }

    // -------------------------------------------------------------------------
    // Project → Services
    // -------------------------------------------------------------------------

    const existingProjectServices =
      await db
        .select()
        .from(
          portfolioProjectServices,
        )
        .where(
          eq(
            portfolioProjectServices.projectId,
            project.id,
          ),
        );

    if (
      existingProjectServices.length === 0 &&
      seedProject.services.length > 0
    ) {
      const serviceRelations =
        seedProject.services
          .map((serviceName) => {
            const serviceId =
              serviceIdMap.get(
                serviceName,
              );

            if (!serviceId) {
              console.warn(
                `  ⚠ Service not found for "${project!.title}": ${serviceName}`,
              );

              return null;
            }

            return {
              projectId: project!.id,
              serviceId,
            };
          })
          .filter(
            (
              value,
            ): value is {
              projectId: string;
              serviceId: string;
            } =>
              value !== null,
          );

      if (
        serviceRelations.length > 0
      ) {
        await db
          .insert(
            portfolioProjectServices,
          )
          .values(serviceRelations);

        console.log(
          `  ✓ Added ${serviceRelations.length} service relationship(s).`,
        );
      }
    }

    // -------------------------------------------------------------------------
    // Project → Gallery Media
    // -------------------------------------------------------------------------

    const existingProjectMedia =
      await db
        .select()
        .from(
          portfolioProjectMedia,
        )
        .where(
          eq(
            portfolioProjectMedia.projectId,
            project.id,
          ),
        );

    if (
      existingProjectMedia.length === 0 &&
      seedProject.images.length > 0
    ) {
      const imageRelations: Array<{
        projectId: string;
        mediaId: string;
        sortOrder: number;
      }> = [];

      for (
        let index = 0;
        index <
        seedProject.images.length;
        index++
      ) {
        const image =
          await getOrCreateMedia(
            seedProject.images[index],
            "portfolio",
          );

        imageRelations.push({
          projectId: project.id,
          mediaId: image.id,
          sortOrder: index,
        });
      }

      if (
        imageRelations.length > 0
      ) {
        await db
          .insert(
            portfolioProjectMedia,
          )
          .values(imageRelations);

        console.log(
          `  ✓ Added ${imageRelations.length} gallery image(s).`,
        );
      }
    }
  }
}

// -----------------------------------------------------------------------------
// Enquiries
// -----------------------------------------------------------------------------

async function seedEnquiries() {
  console.log("\n📨 Seeding enquiries...");

  const existing = await db
    .select({
      id: enquiries.id,
    })
    .from(enquiries)
    .limit(1);

  if (existing.length > 0) {
    console.log(
      "  ✓ Enquiries already exist. Skipping sample enquiries.",
    );

    return;
  }

  if (enquirySeedData.length === 0) {
    console.log(
      "  ✓ No sample enquiries to seed.",
    );

    return;
  }

  await db.insert(enquiries).values(
    enquirySeedData.map((enquiry) => ({
      name: enquiry.name,
      email: enquiry.email,
      phone:
        enquiry.phone ?? null,
      company:
        enquiry.company ?? null,
      service: enquiry.service,
      message: enquiry.message,
      status: enquiry.status,
      createdAt:
        new Date(enquiry.createdAt),
    })),
  );

  console.log(
    `  ✓ Created ${enquirySeedData.length} sample enquiries.`,
  );
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
  console.log(
    "\n🌱 Starting WebOps database seed...\n",
  );

  await seedAdmin();

  await seedAbout();

  const serviceIdMap =
    await seedServices();

  await seedPortfolio(
    serviceIdMap,
  );

  /*
   * Sample enquiries are useful during development
   * for testing the admin dashboard.
   */
  await seedEnquiries();

  console.log(
    "\n✅ WebOps database seed completed successfully.\n",
  );
}

main().catch((error) => {
  console.error(
    "\n❌ Seed failed:\n",
    error,
  );

  process.exit(1);
});