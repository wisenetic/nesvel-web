import { useTranslation } from "@refinedev/core";
import { Plus, Trash2 } from "lucide-react";

import { PageHeader } from "@/core/components/shared/page-header";
import { ConfirmDialog } from "@/core/components/shared/confirm-dialog";
import { Button } from "@/core/components/ui/button";

type ListHeaderProps = {
  selectedIds: string[];
  onAdd?: () => void;
  onDeleteSelected?: () => void;
};

export function ListHeader({ selectedIds, onAdd, onDeleteSelected }: ListHeaderProps) {
  const { translate } = useTranslation();

  return (
    <PageHeader
      title={translate("camera.list_title")}
      description={translate("camera.list_description")}
      rightSlot={
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <ConfirmDialog
              onConfirm={onDeleteSelected}
              title={translate("camera.delete", "Delete")}
              description={translate(
                "camera.delete_confirm",
                "Are you sure you want to delete this camera?",
              )}
              confirmLabel={translate("camera.delete", "Delete")}
              cancelLabel={translate("buttons.cancel", "Cancel")}
              trigger={
                <Button variant="destructive" size="lg">
                  <Trash2 /> {translate("camera.delete")} ({selectedIds.length})
                </Button>
              }
            />
          )}

          <Button size="lg" onClick={onAdd}>
            <Plus /> {translate("camera.add_button")}
          </Button>
        </div>
      }
    ></PageHeader>
  );
}
