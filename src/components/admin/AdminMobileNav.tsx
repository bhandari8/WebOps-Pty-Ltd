"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, ExternalLink } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Services", href: "/admin/services" },
  { label: "Portfolio", href: "/admin/portfolio" },
  { label: "About Content", href: "/admin/about" },
  { label: "Enquiries", href: "/admin/enquiries" },
];

export function AdminMobileNav({ onSignOut }: { onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="lg:hidden sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-4">
      <Logo />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open admin menu" />}>
          <Menu aria-hidden="true" />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-xs">
          <SheetHeader>
            <Logo />
            <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4" aria-label="Admin">
            {LINKS.map((link) => {
              const active =
                link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
              return (
                <SheetClose key={link.href} nativeButton={false} render={<Link href={link.href} />}>
                  <span
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base font-medium",
                      active ? "bg-blue-50 text-brand-blue" : "text-text hover:bg-surface-muted"
                    )}
                  >
                    {link.label}
                  </span>
                </SheetClose>
              );
            })}
          </nav>
          <div className="mt-auto p-4 space-y-1 border-t border-border">
            <SheetClose nativeButton={false} render={<Link href="/" />}>
              <span className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-muted">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                View site
              </span>
            </SheetClose>
            <Button
              variant="ghost"
              onClick={onSignOut}
              className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-sm font-medium text-text-muted"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
