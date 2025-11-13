import { useTranslate } from "@refinedev/core";
import { Download, SquarePen, Trash2, Eye } from "lucide-react";

import { Button } from "@/core/components/ui/button";
type CameraActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  onView?: () => void;
};

export default function CameraActions({
  onEdit,
  onDelete,
  onDownload,
  onView,
}: CameraActionsProps) {
  const translate = useTranslate();
  return (
    <div className="grid grid-cols-4 gap-2 pt-2">
      <Button
        variant={"outline"}
        title={translate("camera.actions.view")}
        onClick={onView}
      >
        <Eye size={16} />
      </Button>
      <Button
        variant={"outline"}
        title={translate("camera.actions.edit")}
        onClick={onEdit}
      >
        <SquarePen size={16} />
      </Button>
      <Button
        variant={"outline"}
        title={translate("camera.actions.download")}
        onClick={onDownload}
      >
        <Download size={16} />
      </Button>
      <Button
        variant={"outline"}
        title={translate("camera.actions.delete")}
        onClick={onDelete}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
