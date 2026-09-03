import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

import {
  getAdminSession,
} from "@/lib/adminAuth";

import { logoutAdmin } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <AdminLoginForm />;
  }

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <AdminSidebar
        onSignOut={logoutAdmin}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav
          onSignOut={logoutAdmin}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}