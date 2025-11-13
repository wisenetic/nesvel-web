import { type ICamera } from "@/modules/camera/types";

import { InfoCard } from "./info-card";
import { LiveCard } from "./live-card";

export type CameraCardProps = {
  camera: ICamera;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleRecord?: (id: string, isRecording: boolean) => void;
  mode?: "live" | "info";
  onFullscreen?: (id: string) => void;
  onSnapshot?: (id: string) => void;
};

export default function CameraCard({
  camera,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onToggleRecord,
  mode = "info",
  onFullscreen,
  onSnapshot,
}: CameraCardProps) {
  const isLive = mode === "live";
  return isLive ? (
    <LiveCard
      camera={camera}
      selected={selected}
      onSelect={() => onSelect?.(camera.id)}
      onFullscreen={() => onFullscreen?.(camera.id)}
      onSnapshot={() => onSnapshot?.(camera.id)}
    />
  ) : (
    <InfoCard
      camera={camera}
      selected={selected}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      onToggleRecord={onToggleRecord}
      onFullscreen={onFullscreen}
      onSnapshot={onSnapshot}
    />
  );
}
