import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteSettings } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-navy text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-white"
                aria-hidden="true"
              >
                W
              </span>
              {siteSettings.companyName}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-xs">
              {siteSettings.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteSettings.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white">
                  {siteSettings.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                  {siteSettings.phone}
                </a>
              </li>
              <li>{siteSettings.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>
            &copy; {year} {siteSettings.legalName}. All rights reserved.
          </p>
          <p>ABN {siteSettings.abn}</p>
        </div>
      </Container>
    </footer>
  );
}
