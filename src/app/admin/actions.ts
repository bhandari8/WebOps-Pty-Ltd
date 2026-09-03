"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import {
  createAdminSession,
  destroyAdminSession,
} from "@/lib/adminAuth";

import {
  verifyPassword,
} from "@/lib/password";
export type AdminLoginState = {
  error?: string;
};

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  const email =
    typeof emailValue === "string"
      ? emailValue.trim().toLowerCase()
      : "";

  const password =
    typeof passwordValue === "string"
      ? passwordValue
      : "";

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  /*
   * Deliberately use the same public error for:
   * - unknown email
   * - incorrect password
   *
   * This avoids revealing which email addresses
   * have admin accounts.
   */
  if (
    !user ||
    !user.isActive ||
    !(await verifyPassword(
      password,
      user.passwordHash,
    ))
  ) {
    return {
      error: "Invalid email or password.",
    };
  }

  await createAdminSession(user.id);

  await db
    .update(adminUsers)
    .set({
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(adminUsers.id, user.id));

  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await destroyAdminSession();

  redirect("/admin");
}