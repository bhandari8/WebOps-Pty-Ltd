import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/format";
import type { Enquiry } from "@/types/enquiry";

export function EnquiryDetailDialog({
  enquiry,
  onOpenChange,
}: {
  enquiry: Enquiry | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!enquiry} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {enquiry ? (
          <>
            <DialogHeader>
              <DialogTitle>{enquiry.name}</DialogTitle>
              <DialogDescription>Submitted {formatDateTime(enquiry.createdAt)}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <StatusBadge status={enquiry.status} />
              </div>

              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${enquiry.email}`} className="text-brand-blue hover:underline">
                      {enquiry.email}
                    </a>
                  </dd>
                </div>
                {enquiry.phone ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                      Phone
                    </dt>
                    <dd className="mt-1 text-text">{enquiry.phone}</dd>
                  </div>
                ) : null}
                {enquiry.company ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                      Company
                    </dt>
                    <dd className="mt-1 text-text">{enquiry.company}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                    Service
                  </dt>
                  <dd className="mt-1 text-text">{enquiry.service}</dd>
                </div>
              </dl>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
                  Message
                </dt>
                <dd className="mt-1.5 whitespace-pre-wrap rounded-md bg-surface-muted p-3 text-text-muted">
                  {enquiry.message}
                </dd>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
