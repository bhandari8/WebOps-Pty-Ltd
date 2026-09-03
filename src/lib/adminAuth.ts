import { createHash, randomBytes } from "node:crypto";

import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "@/db";
import { adminSessions, adminUsers } from "@/db/schema";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const ADMIN_SESSION_COOKIE = "webops.admin.session";

export function hashSessionToken(token: string): string {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createAdminSession(
  userId: string,
): Promise<void> {
  const token = randomBytes(32).toString("hex");

  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_MS,
  );

  await db.insert(adminSessions).values({
    userId,
    tokenHash,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    ADMIN_SESSION_COOKIE,
  )?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);

  const rows = await db
    .select({
      sessionId: adminSessions.id,
      userId: adminUsers.id,
      email: adminUsers.email,
      isActive: adminUsers.isActive,
      expiresAt: adminSessions.expiresAt,
    })
    .from(adminSessions)
    .innerJoin(
      adminUsers,
      eq(adminSessions.userId, adminUsers.id),
    )
    .where(
      and(
        eq(adminSessions.tokenHash, tokenHash),
        gt(adminSessions.expiresAt, new Date()),
        eq(adminUsers.isActive, true),
      ),
    )
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    ADMIN_SESSION_COOKIE,
  )?.value;

  if (token) {
    const tokenHash = hashSessionToken(token);

    await db
      .delete(adminSessions)
      .where(
        eq(
          adminSessions.tokenHash,
          tokenHash,
        ),
      );
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}