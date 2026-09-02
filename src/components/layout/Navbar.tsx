"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { siteSettings } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {siteSettings.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                isActive(link.href) ? "text-brand-blue" : "text-text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="/contact" marketing={false} className="h-9 px-4">
            Get a Quote
          </LinkButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
            }
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <Logo />
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
              {siteSettings.navLinks.map((link) => (
                <SheetClose key={link.href} nativeButton={false} render={<Link href={link.href} />}>
                  <span
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-base font-medium ${
                      isActive(link.href)
                        ? "bg-blue-50 text-brand-blue"
                        : "text-text hover:bg-surface-muted"
                    }`}
                  >
                    {link.label}
                  </span>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <SheetClose nativeButton={false} render={<LinkButton href="/contact" className="w-full" />}>
                Get a Quote
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
