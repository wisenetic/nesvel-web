import { Pencil, Trash2, Eye } from "lucide-react";

interface CameraActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export default function CameraActions({
  onEdit,
  onDelete,
  onView,
}: CameraActionsProps) {
  return (
    <div className="flex justify-between mt-3 border-t pt-2 text-gray-500">
      <button onClick={onView} className="hover:text-blue-600" title="View">
        <Eye size={16} />
      </button>
      <button onClick={onEdit} className="hover:text-green-600" title="Edit">
        <Pencil size={16} />
      </button>
      <button onClick={onDelete} className="hover:text-rose-600" title="Delete">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
