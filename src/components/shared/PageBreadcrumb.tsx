import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export function PageBreadcrumb({
  items,
  dark = false,
}: {
  items: BreadcrumbEntry[];
  dark?: boolean;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className={dark ? "text-slate-400" : undefined}>
        {items.map((item, i) => (
          <span key={item.label} className="contents">
            {i > 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink
                  render={<Link href={item.href} />}
                  className={dark ? "hover:text-white" : undefined}
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className={dark ? "text-white" : undefined}>
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
