import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteSettings } from "@/data/site";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border">
        <Image
          src="/images/photos/workspace-notebook-minimal.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text">Get in touch</h2>
        <p className="mt-2 text-sm text-text-muted">
          Prefer to reach out directly? Use the details below and we&apos;ll respond as soon as
          we can.
        </p>
      </div>

      <ul className="space-y-4 text-sm">
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
          <a href={`mailto:${siteSettings.email}`} className="text-text hover:text-brand-blue">
            {siteSettings.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
          <a
            href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
            className="text-text hover:text-brand-blue"
          >
            {siteSettings.phone}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
          <span className="text-text">{siteSettings.address}</span>
        </li>
      </ul>
    </div>
  );
}
