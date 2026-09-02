import type { EnquiryStatus } from "@/types/enquiry";
import { ENQUIRY_STATUS_LABELS } from "@/types/enquiry";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  in_progress: "bg-purple-50 text-purple-700 border-purple-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  archived: "bg-slate-100 text-slate-600 border-slate-200",
};

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full", STATUS_STYLES[status])}>
      {ENQUIRY_STATUS_LABELS[status]}
    </Badge>
  );
}

export function BooleanBadge({
  value,
  trueLabel,
  falseLabel,
}: {
  value: boolean;
  trueLabel: string;
  falseLabel: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full",
        value
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-slate-100 text-slate-600 border-slate-200"
      )}
    >
      {value ? trueLabel : falseLabel}
    </Badge>
  );
}
