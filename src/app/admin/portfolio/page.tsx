"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PortfolioFormDialog } from "@/components/admin/PortfolioFormDialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminPortfolio } from "@/hooks/useAdminPortfolio";
import { useAdminServices } from "@/hooks/useAdminServices";
import type { PortfolioProject } from "@/types/portfolio";

export default function AdminPortfolioPage() {
  const { projects, loading, error, refetch, save, togglePublished, toggleFeatured, remove } =
    useAdminPortfolio();
  const { services } = useAdminServices();

  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioProject | null>(null);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(project: PortfolioProject) {
    setEditing(project);
    setDialogOpen(true);
  }

  return (
    <div>
      <AdminPageHeader
        title="Portfolio Projects"
        description="Create, edit, and publish portfolio work."
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Button>
        }
      />

      {loading ? (
        <LoadingState label="Loading portfolio projects" rows={4} />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : !projects || projects.length === 0 ? (
        <EmptyState title="No portfolio projects yet." description="Create your first project to get started." />
      ) : (
        <div className="rounded-lg border border-border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium text-text">{project.title}</div>
                    <div className="text-xs text-text-subtle">/portfolio/{project.slug}</div>
                  </TableCell>
                  <TableCell className="text-text-muted">{project.category}</TableCell>
                  <TableCell>
                    <Switch
                      checked={project.published}
                      onCheckedChange={(v) => togglePublished(project.id, Boolean(v))}
                      aria-label={`${project.published ? "Unpublish" : "Publish"} ${project.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={project.featured}
                      onCheckedChange={(v) => toggleFeatured(project.id, Boolean(v))}
                      aria-label={`${project.featured ? "Unfeature" : "Feature"} ${project.title}`}
                    />
                  </TableCell>
                  <TableCell className="text-text-muted">{project.order}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => openEdit(project)}>
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-red-600 hover:text-red-700"
                      onClick={() => setDeleteTarget(project)}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <PortfolioFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editing}
        availableServices={services ?? []}
        onSave={save}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.title}" will be permanently removed from local storage. This can't be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (deleteTarget) remove(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
