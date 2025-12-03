import { useList, useTranslation } from "@refinedev/core";
import { useEffect, useMemo, useState } from "react";

import { SmartSkeleton } from "@/core/components/shared/smart-skeleton/smart-skeleton";
import { LocationListSkeleton } from "./LocationListSkeleton";
import { PageHeader } from "@/core/components/shared/page-header";
import { LocationTreeTable } from "../../components/LocationTreeTable";
import { LocationToolbar } from "../../components/LocationToolbar";
import { LocationDetailsPanel } from "../../components/LocationDetailsPanel";
import { Dialog, DialogContent } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { LocationForm, type LocationFormValues } from "../../components/LocationForm";
import type { LocationNode } from "../../types";

export default function LocationListPage() {
  const { translate } = useTranslation();

  const { result, query } = useList<LocationNode>({
    resource: "locations",
  });

  const serverLocations = result?.data ?? [];
  const [localLocations, setLocalLocations] = useState<LocationNode[] | null>(null);
  const locations = localLocations ?? serverLocations;
  const isLoading = query.isLoading || query.isFetching;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | null>(null);
  const [dialogParentId, setDialogParentId] = useState<string | null>(null);
  const [editing, setEditing] = useState<LocationNode | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (!serverLocations.length) return;
    setLocalLocations((prev) => prev ?? serverLocations);
  }, [serverLocations]);

  const byId = useMemo(() => {
    const map = new Map<string, LocationNode>();
    locations.forEach((n) => map.set(n.id, n));
    return map;
  }, [locations]);

  const selected = selectedId ? byId.get(selectedId) ?? null : null;

  const parentPath: LocationNode[] = useMemo(() => {
    if (!selected) return [];
    const chain: LocationNode[] = [];
    let current = selected;
    const safety = 10;
    let steps = 0;
    while (current.parentId && steps < safety) {
      const parent = byId.get(current.parentId);
      if (!parent) break;
      chain.unshift(parent);
      current = parent;
      steps += 1;
    }
    return chain;
  }, [selected, byId]);

  const handleAddLocation = () => {
    setDialogMode("create");
    setDialogParentId(selected?.id ?? null);
    setEditing(null);
  };

  const handleEdit = () => {
    if (!selected) return;
    setDialogMode("edit");
    setDialogParentId(selected.parentId ?? null);
    setEditing(selected);
  };

  const handleDelete = () => {
    if (!selected) return;
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selected) return;
    setLocalLocations((prev) =>
      prev ? prev.filter((loc) => loc.id !== selected.id) : prev,
    );
    setSelectedId(null);
    setDeleteConfirmOpen(false);
  };

  const handleMove = (direction: "up" | "down") => {
    if (!selected) return;
    setLocalLocations((prev) => {
      if (!prev) return prev;
      const siblings = prev
        .filter((loc) => loc.parentId === selected.parentId)
        .sort((a, b) => a.orderIndex - b.orderIndex);
      const index = siblings.findIndex((s) => s.id === selected.id);
      if (index === -1) return prev;

      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === siblings.length - 1) return prev;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const current = siblings[index];
      const target = siblings[targetIndex];

      // swap orderIndex
      const updated = prev.map((loc) => {
        if (loc.id === current.id) {
          return { ...loc, orderIndex: target.orderIndex };
        }
        if (loc.id === target.id) {
          return { ...loc, orderIndex: current.orderIndex };
        }
        return loc;
      });

      return updated;
    });
  };

  const handleDialogClose = () => {
    setDialogMode(null);
    setDialogParentId(null);
    setEditing(null);
  };

  const handleDialogSubmit = (values: LocationFormValues) => {
    setLocalLocations((prev) => {
      const base = prev ?? serverLocations;

      if (dialogMode === "edit" && editing) {
        return base.map((loc) =>
          loc.id === editing.id
            ? {
                ...loc,
                name: values.name,
                type: values.type,
                parentId: values.parentId,
                depth: values.parentId
                  ? (byId.get(values.parentId)?.depth ?? 0) + 1
                  : 0,
              }
            : loc,
        );
      }

      const siblings = base.filter(
        (loc) => loc.parentId === values.parentId,
      );

      const newId = `loc_${Date.now()}`;
      const depth = values.parentId
        ? (byId.get(values.parentId)?.depth ?? 0) + 1
        : 0;

      const newLocation: LocationNode = {
        id: newId,
        name: values.name,
        type: values.type,
        parentId: values.parentId,
        depth,
        orderIndex:
          siblings.length > 0
            ? Math.max(...siblings.map((s) => s.orderIndex)) + 1
            : 0,
      };

      return [...base, newLocation];
    });

    handleDialogClose();
  };

  const currentInitial: LocationFormValues = {
    name: editing?.name ?? "",
    type: editing?.type ?? "site",
    parentId: dialogParentId ?? null,
  };

  return (
    <SmartSkeleton
      loading={isLoading}
      ariaLabel={translate("location.loading", "Loading locations")}
      skeleton={<LocationListSkeleton />}
    >
      <div className="space-y-4 md:space-y-6">
        <PageHeader
          title={translate("location.list_title", "Locations")}
          description={translate(
            "location.list_description",
            "Manage sites, buildings, floors, and zones.",
          )}
          rightSlot={
            <Button size="sm" onClick={handleAddLocation}>
              + {translate("location.form.create_title", "Add Location")}
            </Button>
          }
        />

        <LocationToolbar
          search={search}
          onSearchChange={setSearch}
        />

        <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-h-[320px]">
            <LocationTreeTable
              nodes={locations}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
              filter={search}
            />
          </div>

          <div className="min-h-[320px]">
            <LocationDetailsPanel
              selected={selected}
              parentPath={parentPath}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMoveUp={() => handleMove("up")}
              onMoveDown={() => handleMove("down")}
            />
          </div>
        </div>

        {dialogMode && (
          <Dialog open onOpenChange={(open) => !open && handleDialogClose()}>
            <DialogContent>
              <LocationForm
                mode={dialogMode}
                initialValues={currentInitial}
                locations={locations}
                onSubmit={handleDialogSubmit}
                onCancel={handleDialogClose}
              />
            </DialogContent>
          </Dialog>
        )}

        {deleteConfirmOpen && selected && (
          <Dialog
            open
            onOpenChange={(open) => {
              if (!open) setDeleteConfirmOpen(false);
            }}
          >
            <DialogContent className="max-w-sm space-y-4">
              <div className="space-y-1">
                <h2 className="text-base font-semibold">
                  {translate("location.details.delete_confirm_title", "Delete location")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {translate(
                    "location.details.delete_confirm_message",
                    "Are you sure you want to delete this location? This will remove it from the hierarchy for this session.",
                  )}
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteConfirmOpen(false)}
                >
                  {translate(
                    "location.details.delete_confirm_cancel",
                    "Cancel",
                  )}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleConfirmDelete}
                >
                  {translate(
                    "location.details.delete_confirm_confirm",
                    "Delete",
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SmartSkeleton>
  );
}
