import { CameraCard } from "../camera-card";
import { ICamera } from "@/modules/camera/types";

interface CameraGridProps {
  cameras: ICamera[];
  selectedIds?: string[];
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleRecord?: (id: string, isRecording: boolean) => void;
  viewMode?: "grid" | "list";
}

export default function CameraGrid({
  cameras,
  selectedIds = [],
  onSelect,
  onEdit,
  onDelete,
  onToggleRecord,
  viewMode = "grid",
}: CameraGridProps) {
  if (!cameras.length) {
    return (
      <div className="text-center text-gray-500 p-8">
        No cameras found. Add one to get started.
      </div>
    );
  }

  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      : "flex flex-col gap-4";

  return (
    <div className={gridClass}>
      {cameras.map((camera) => (
        <CameraCard
          key={camera.id}
          camera={camera}
          selected={selectedIds.includes(camera.id)}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleRecord={onToggleRecord}
        />
      ))}
    </div>
  );
}
