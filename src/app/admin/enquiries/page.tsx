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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useEnquiries } from "@/hooks/useEnquiries";
import { formatDate } from "@/lib/format";
import { ENQUIRY_STATUSES, ENQUIRY_STATUS_LABELS } from "@/types/enquiry";
import type { Enquiry } from "@/types/enquiry";

export default function AdminEnquiriesPage() {
  const { enquiries, loading, error, refetch, changeStatus } = useEnquiries();
  const [viewing, setViewing] = useState<Enquiry | null>(null);

  return (
    <div>
      <AdminPageHeader title="Enquiries" description="Review and manage incoming enquiries." />

      {loading ? (
        <LoadingState label="Loading enquiries" rows={4} />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : !enquiries || enquiries.length === 0 ? (
        <EmptyState
          title="No enquiries yet."
          description="Enquiries submitted through the contact form will appear here."
        />
      ) : (
        <div className="rounded-lg border border-border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    <div className="font-medium text-text">{enquiry.name}</div>
                    <div className="text-xs text-text-subtle">{enquiry.email}</div>
                  </TableCell>
                  <TableCell className="text-text-muted">{enquiry.company || "—"}</TableCell>
                  <TableCell className="text-text-muted">{enquiry.service}</TableCell>
                  <TableCell>
                    <Select
                      value={enquiry.status}
                      onValueChange={(v) => changeStatus(enquiry.id, v as Enquiry["status"])}
                    >
                      <SelectTrigger className="h-8 w-[140px]" aria-label={`Status for ${enquiry.name}`}>
                        <SelectValue>
                          <StatusBadge status={enquiry.status} />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {ENQUIRY_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {ENQUIRY_STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-text-muted">{formatDate(enquiry.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setViewing(enquiry)}
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <EnquiryDetailDialog enquiry={viewing} onOpenChange={(open) => !open && setViewing(null)} />
    </div>
  );
}
