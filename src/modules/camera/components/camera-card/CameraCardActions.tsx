import { useTranslate } from "@refinedev/core";
import { Download, SquarePen, Trash2, Eye } from "lucide-react";

import { Button } from "@/core/components/ui/button";

type CameraActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onSnapshot?: () => void;
};

export default function CameraActions({
  onView,
  onEdit,
  onSnapshot,
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
        onClick={onSnapshot}
      >
        <Download size={16} />
      </Button>
      <Button
        variant={"outline"}
        title={translate("camera.actions.delete")}
        onClick={onSnapshot}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
