"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PortfolioFormDialog } from "@/components/admin/PortfolioFormDialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

import {
  createPortfolioProjectAction,
  updatePortfolioProjectAction,
  deletePortfolioProjectAction,
} from "@/app/admin/portfolio/actions";

import type {
  PortfolioProject,
  PortfolioProjectInput,
} from "@/types/portfolio";
import type { Service } from "@/types/service";

export function AdminPortfolioClient({
  projects,
  services,
}: {
  projects: PortfolioProject[];
  services: Service[];
}) {
  const router = useRouter();

  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] =
    useState<PortfolioProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(project: PortfolioProject) {
    setEditing(project);
    setDialogOpen(true);
  }

  async function save(
    id: string | null,
    input: PortfolioProjectInput,
  ) {
    setSaving(true);

    try {
      if (id) {
        await updatePortfolioProjectAction(id, input);
      } else {
        await createPortfolioProjectAction(input);
      }

      setDialogOpen(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(
    id: string,
    published: boolean,
  ) {
    setUpdatingId(id);

    try {
      await updatePortfolioProjectAction(id, { published });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  async function toggleFeatured(
    id: string,
    featured: boolean,
  ) {
    setUpdatingId(id);

    try {
      await updatePortfolioProjectAction(id, { featured });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  async function remove(id: string) {
    setDeleting(true);

    try {
      await deletePortfolioProjectAction(id);
      setDeleteTarget(null);
      router.refresh();
    } finally {
      setDeleting(false);
    }
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

      {!projects || projects.length === 0 ? (
        <EmptyState
          title="No portfolio projects yet."
          description="Create your first project to get started."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium text-text">
                      {project.title}
                    </div>

                    <div className="text-xs text-text-subtle">
                      /portfolio/{project.slug}
                    </div>
                  </TableCell>

                  <TableCell className="text-text-muted">
                    {project.category}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={project.published}
                      disabled={updatingId === project.id}
                      onCheckedChange={(value) =>
                        togglePublished(
                          project.id,
                          Boolean(value),
                        )
                      }
                      aria-label={`${
                        project.published
                          ? "Unpublish"
                          : "Publish"
                      } ${project.title}`}
                    />
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={project.featured}
                      disabled={updatingId === project.id}
                      onCheckedChange={(value) =>
                        toggleFeatured(
                          project.id,
                          Boolean(value),
                        )
                      }
                      aria-label={`${
                        project.featured
                          ? "Unfeature"
                          : "Feature"
                      } ${project.title}`}
                    />
                  </TableCell>

                  <TableCell className="text-text-muted">
                    {project.order}
                  </TableCell>

                  <TableCell className="space-x-1 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => openEdit(project)}
                    >
                      <Pencil
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      Edit
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-red-600 hover:text-red-700"
                      onClick={() => setDeleteTarget(project)}
                    >
                      <Trash2
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
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
        availableServices={services}
        onSave={save}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) =>
          !open && setDeleteTarget(null)
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this project?
            </AlertDialogTitle>

            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.title}" will be permanently removed from the database. This can't be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deleting}
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (deleteTarget) {
                  void remove(deleteTarget.id);
                }
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}