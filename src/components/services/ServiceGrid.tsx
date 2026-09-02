import type { Service } from "@/types/service";
import { ServiceCard } from "./ServiceCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ServiceGrid({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="No services available."
        description="Please check back shortly, or get in touch to discuss what you need."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, i) => (
        <ServiceCard key={service.id} service={service} priority={i === 0} />
      ))}
    </div>
  );
}
