import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/core/components/ui/card";
import { type ICamera } from "@/modules/camera/types";
import { useNavigate, useLocation } from "react-router";

import CameraActions from "./CameraActions";
import CameraHeader from "./CameraHeader";
import CameraMetrics from "./CameraMetrics";
import CameraStreamInfo from "./CameraStreamInfo";
import { type CameraCardProps } from "../CameraCard";

export function InfoCard({
  camera,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onToggleRecord,
  onFullscreen,
  onSnapshot,
}: CameraCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card>
      <CardHeader>
        <CameraHeader
          name={camera.name}
          status={camera.status}
          selectable={Boolean(onSelect)}
          selected={Boolean(selected)}
          onToggleSelect={() => onSelect?.(camera.id)}
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <CameraMetrics
          fps={camera.fps}
          bitrate={camera.bitrate}
          latency={camera.latency}
        />
        <CameraStreamInfo
          streamUrl={camera.streamUrl}
          isRecording={camera.isRecording}
          lastSeen={camera.lastSeen}
        />
      </CardContent>
      <CardFooter className="block">
        <CameraActions
          onEdit={() => onEdit?.(camera.id)}
          onDelete={() => onDelete?.(camera.id)}
          onView={() =>
            navigate(`/cameras/show/${camera.id}`, {
              state: { background: location }, // optional but recommended
            })
          }
        />
      </CardFooter>
    </Card>
  );
}
