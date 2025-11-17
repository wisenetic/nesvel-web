import { useTranslation } from "@refinedev/core";

import CameraCard from "@/modules/camera/components/camera-card";
import { type ICamera, type IGridSize } from "@/modules/camera/types";

const sizeToCols = {
  "2x2": 2,
  "3x3": 3,
  "4x4": 4,
};

type ListGridProps = {
  cameras: ICamera[];
  gridSize: IGridSize;
  mode?: "live" | "info";
  selectedIds: string[];
  onSelect?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFullscreen?: (id: string) => void;
  onSnapshot?: (id: string) => void;
};
export function ListGrid({
  cameras,
  gridSize,
  mode,
  selectedIds,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onFullscreen,
  onSnapshot,
}: ListGridProps) {
  const { translate } = useTranslation();
  const cols = sizeToCols[gridSize];
  const limit = cols * cols;

  return (
    <div
      className={`grid gap-4 grid-cols-1 ${
        cols === 2
          ? "md:grid-cols-2"
          : cols === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-4"
      }`}
    >
      {cameras.map((camera: ICamera) => (
        <CameraCard
          key={camera.id}
          camera={camera}
          mode={mode}
          selected={selectedIds.includes(camera.id)}
          onSelect={onSelect}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onFullscreen={onFullscreen}
          onSnapshot={onSnapshot}
        />
      ))}

      {cameras.length < limit &&
        Array.from({ length: limit - cameras.length }).map((_, i) => (
          <div
            key={i}
            className="aspect-video rounded-md border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground"
          >
            {translate("camera.placeholder.no_camera")}
          </div>
        ))}
    </div>
  );
}
