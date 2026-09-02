"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Info,
  Inbox,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
  { label: "About Content", href: "/admin/about", icon: Info },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
];

export function AdminSidebar({ onSignOut }: { onSignOut: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col border-r border-border bg-white">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin">
        {LINKS.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-brand-blue"
                  : "text-text-muted hover:bg-surface-muted hover:text-text"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted hover:text-text"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View site
        </Link>
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-sm font-medium text-text-muted hover:text-text"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
