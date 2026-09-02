import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 text-center border border-dashed border-border rounded-lg">
      <Inbox className="mx-auto h-8 w-8 text-text-subtle" aria-hidden="true" />
      <p className="mt-3 text-base font-medium text-text">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-text-muted max-w-md mx-auto">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
