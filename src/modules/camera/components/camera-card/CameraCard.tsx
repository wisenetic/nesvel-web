import CameraHeader from "./CameraHeader";
import CameraMetrics from "./CameraMetrics";
import CameraStreamInfo from "./CameraStreamInfo";
import CameraActions from "./CameraActions";
import { ICamera } from "@/modules/camera/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/core/components/ui/card";

export interface CameraCardProps {
  camera: ICamera;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleRecord?: (id: string, isRecording: boolean) => void;
}

export default function CameraCard({
  camera,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onToggleRecord,
}: CameraCardProps) {
  return (
    <Card>
      <CardHeader>
        <CameraHeader
          name={camera.name}
          location={camera.location}
          status={camera.status}
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <CameraMetrics
          fps={camera.fps}
          bitrate={camera.bitrate}
          latency={camera.latency}
        />
        <CameraStreamInfo
          rtspUrl={camera.rtspUrl}
          isRecording={camera.isRecording}
          lastSeen={camera.lastSeen}
        />
      </CardContent>
      <CardFooter>
        <CameraActions
          onEdit={() => onEdit?.(camera.id)}
          onDelete={() => onDelete?.(camera.id)}
          onView={() => console.log("View camera", camera.id)}
        />
      </CardFooter>
    </Card>
  );
}
