"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EnquiryDetailDialog } from "@/components/admin/EnquiryDetailDialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/ui/EmptyState";

import { formatDate } from "@/lib/format";
import {
  ENQUIRY_STATUSES,
  ENQUIRY_STATUS_LABELS,
} from "@/types/enquiry";
import type { Enquiry, EnquiryStatus } from "@/types/enquiry";

import { updateEnquiryStatusAction } from "@/app/admin/enquiries/actions";

interface AdminEnquiriesClientProps {
  enquiries: Enquiry[];
}

export function AdminEnquiriesClient({
  enquiries: initialEnquiries,
}: AdminEnquiriesClientProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [viewing, setViewing] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function changeStatus(id: string, status: EnquiryStatus) {
    const previousEnquiries = enquiries;

    setUpdatingId(id);

    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === id
          ? { ...enquiry, status }
          : enquiry,
      ),
    );

    if (viewing?.id === id) {
      setViewing((current) =>
        current ? { ...current, status } : current,
      );
    }

    try {
      const updated = await updateEnquiryStatusAction(id, status);

      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === id ? updated : enquiry,
        ),
      );

      if (viewing?.id === id) {
        setViewing(updated);
      }
    } catch {
      setEnquiries(previousEnquiries);

      if (viewing?.id === id) {
        const previous = previousEnquiries.find(
          (enquiry) => enquiry.id === id,
        );

        setViewing(previous ?? null);
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Enquiries"
        description="Review and manage incoming enquiries."
      />

      {enquiries.length === 0 ? (
        <EmptyState
          title="No enquiries yet."
          description="Enquiries submitted through the contact form will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    <div className="font-medium text-text">
                      {enquiry.name}
                    </div>
                    <div className="text-xs text-text-subtle">
                      {enquiry.email}
                    </div>
                  </TableCell>

                  <TableCell className="text-text-muted">
                    {enquiry.company || "—"}
                  </TableCell>

                  <TableCell className="text-text-muted">
                    {enquiry.service}
                  </TableCell>

                  <TableCell>
                    <Select
                      value={enquiry.status}
                      disabled={updatingId === enquiry.id}
                      onValueChange={(value) =>
                        changeStatus(
                          enquiry.id,
                          value as EnquiryStatus,
                        )
                      }
                    >
                      <SelectTrigger
                        className="h-8 w-[140px]"
                        aria-label={`Status for ${enquiry.name}`}
                      >
                        <SelectValue>
                          <StatusBadge status={enquiry.status} />
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {ENQUIRY_STATUSES.map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                          >
                            {ENQUIRY_STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-text-muted">
                    {formatDate(enquiry.createdAt)}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setViewing(enquiry)}
                    >
                      <Eye
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <EnquiryDetailDialog
        enquiry={viewing}
        onOpenChange={(open) => {
          if (!open) {
            setViewing(null);
          }
        }}
      />
    </div>
  );
}