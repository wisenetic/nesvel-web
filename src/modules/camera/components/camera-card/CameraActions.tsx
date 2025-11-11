import { Button } from "@/core/components/ui/button";
import { Download, SquarePen, Trash2, Eye } from "lucide-react";

interface CameraActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  onView?: () => void;
}

export default function CameraActions({
  onEdit,
  onDelete,
  onDownload,
  onView,
}: CameraActionsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 pt-2">
      <Button variant={"outline"} title="View" onClick={onView}>
        <Eye size={16} />
      </Button>
      <Button variant={"outline"} title="Edit" onClick={onEdit}>
        <SquarePen size={16} />
      </Button>
      <Button variant={"outline"} title="Download" onClick={onDownload}>
        <Download size={16} />
      </Button>
      <Button variant={"outline"} title="Delete" onClick={onDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
