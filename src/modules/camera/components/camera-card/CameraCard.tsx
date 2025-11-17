import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/core/components/ui/card";
import { type ICamera } from "@/modules/camera/types";

import CameraCardActions from "./CameraCardActions";
import CameraCardHeader from "./CameraCardHeader";
import CameraCardLive from "./CameraCardLive";
import CameraCardMetrics from "./CameraCardMetrics";
import CameraCardStreamInfo from "./CameraCardStreamInfo";

export type CameraCardProps = {
  camera: ICamera;
  mode?: "live" | "info";
  selected?: boolean;
  onSelect?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFullscreen?: (id: string) => void;
  onSnapshot?: (id: string) => void;
};

export default function CameraCard({
  camera,
  mode = "info",
  selected,
  onSelect,
  onView,
  onEdit,
  onFullscreen,
  onSnapshot,
}: CameraCardProps) {
  const isLive = mode === "live";
  return isLive ? (
    <CameraCardLive
      camera={camera}
      selected={selected}
      onSelect={() => onSelect?.(camera.id)}
      onFullscreen={() => onFullscreen?.(camera.id)}
      onSnapshot={() => onSnapshot?.(camera.id)}
    />
  ) : (
    <>
      <Card>
        <CardHeader>
          <CameraCardHeader
            name={camera.name}
            status={camera.status}
            selectable={Boolean(onSelect)}
            selected={Boolean(selected)}
            onToggleSelect={() => onSelect?.(camera.id)}
          />
        </CardHeader>
        <CardContent className="space-y-3">
          <CameraCardMetrics
            fps={camera.fps}
            bitrate={camera.bitrate}
            latency={camera.latency}
          />
          <CameraCardStreamInfo
            streamUrl={camera.streamUrl}
            isRecording={camera.isRecording}
            lastSeen={camera.lastSeen}
          />
        </CardContent>
        <CardFooter className="block">
          <CameraCardActions
            onEdit={() => onEdit?.(camera.id)}
            onSnapshot={() => onSnapshot?.(camera.id)}
            onView={() => onView?.(camera.id)}
          />
        </CardFooter>
      </Card>
    </>
  );
}
