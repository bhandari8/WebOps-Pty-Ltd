"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checked, signIn, signOut } = useAdminAuth();

  if (!checked) {
    return <div className="min-h-screen bg-surface-muted" />;
  }

  if (!isAuthenticated) {
    return <AdminLoginForm onSignIn={signIn} />;
  }

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <AdminSidebar onSignOut={signOut} />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminMobileNav onSignOut={signOut} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
