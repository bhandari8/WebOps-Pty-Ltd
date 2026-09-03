"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceFormDialog } from "@/components/admin/ServiceFormDialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Service, ServiceInput } from "@/types/service";
import {
  createServiceAction,
  updateServiceAction,
} from "@/app/admin/services/actions";

export function AdminServicesClient({
  services,
}: {
  services: Service[];
}) {
  const [editing, setEditing] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(service: Service) {
    setEditing(service);
    setDialogOpen(true);
  }

  async function save(id: string | null, input: ServiceInput) {
    if (id) {
      await updateServiceAction(id, input);
    } else {
      await createServiceAction(input);
    }

    setDialogOpen(false);
  }

  async function toggleActive(id: string, active: boolean) {
    await updateServiceAction(id, { active });
  }

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Manage the services shown on the public site."
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New service
          </Button>
        }
      />

      {!services || services.length === 0 ? (
        <EmptyState
          title="No services yet."
          description="Create your first service to get started."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="font-medium text-text">
                      {service.title}
                    </div>

                    <div className="text-xs text-text-subtle">
                      /services/{service.slug}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Label className="flex items-center gap-2 font-normal">
                      <Switch
                        checked={service.active}
                        onCheckedChange={(value) =>
                          toggleActive(service.id, Boolean(value))
                        }
                        aria-label={`${
                          service.active ? "Disable" : "Enable"
                        } ${service.title}`}
                      />

                      <span className="text-sm text-text-muted">
                        {service.active ? "Active" : "Disabled"}
                      </span>
                    </Label>
                  </TableCell>

                  <TableCell className="text-text-muted">
                    {service.order}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => openEdit(service)}
                    >
                      <Pencil
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ServiceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={editing}
        onSave={save}
      />
    </div>
  );
}