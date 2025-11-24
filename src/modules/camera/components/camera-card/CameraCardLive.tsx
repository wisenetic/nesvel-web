import { useTranslate } from "@refinedev/core";
import { Camera, Maximize2 } from "lucide-react";

import LivePlayer from "@/core/components/shared/LivePlayer";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import { type ICamera } from "@/modules/camera/types";

type CameraCardLiveProps = {
  camera: ICamera;
  // UI Controls
  showCheckbox?: boolean;
  showBadges?: boolean;
  showLocation?: boolean;
  showStats?: boolean;
  showHoverActions?: boolean;
  selected?: boolean;

  onSelect?: () => void;
  onFullscreen?: () => void;
  onSnapshot?: () => void;
};

export default function CameraCardLive({
  camera,
  showCheckbox = true,
  showBadges = true,
  showLocation = true,
  showStats = true,
  showHoverActions = true,
  selected,
  onSelect,
  onFullscreen,
  onSnapshot,
}: CameraCardLiveProps) {
  const translate = useTranslate();
  return (
    <div className="group relative aspect-video overflow-hidden rounded-md border bg-muted/20">
      {/* Video Player */}
      <div className="absolute inset-0">
        <LivePlayer src={camera.streamUrl} />
      </div>
      {/* Checkbox */}
      {showCheckbox && (
        <div className="absolute left-2 top-2">
          <Checkbox
            checked={selected}
            onCheckedChange={onSelect}
            aria-label={translate("camera.select_camera")}
            className="pointer-events-auto"
          />
        </div>
      )}
      {/* Badges (Online & Recording) */}
      {showBadges && (
        <>
          {/* Online/Offline */}
          {/* <div className="absolute right-12 top-2">
            <Badge
              className="rounded px-2 py-0.5 text-xs"
              variant={camera.status === "online" ? "default" : "destructive"}
            >
              {camera.status}
            </Badge>
          </div> */}

          {/* Recording REC badge */}
          {camera.isRecording && (
            <div className="absolute right-2 top-2">
              <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
                {translate("camera.rec")}
              </span>
            </div>
          )}
        </>
      )}
      {/* Location */}
      {showLocation && camera.location && (
        <div className="absolute bottom-2 right-2">
          <span className="rounded bg-background/80 px-2 py-0.5 text-xs text-foreground shadow">
            {camera.location}
          </span>
        </div>
      )}
      {/* FPS / Bitrate */}
      {showStats && (
        <div className="absolute bottom-2 left-2 flex gap-2 text-[11px] text-foreground/90">
          <Badge variant="secondary" className="rounded">
            {camera.fps} FPS
          </Badge>
          <Badge variant="secondary" className="rounded">
            {camera.bitrate}
          </Badge>
        </div>
      )}
      {/* Hover Actions */}
      {showHoverActions && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="pointer-events-auto rounded-full shadow-md"
              onClick={onFullscreen}
              title={translate("camera.tooltip.fullscreen")}
            >
              <Maximize2 size={18} />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="pointer-events-auto rounded-full shadow-md"
              onClick={onSnapshot}
              title={translate("camera.tooltip.snapshot")}
            >
              <Camera size={18} />
            </Button>
          </div>
        </div>
      )}
      s
    </div>
  );
}
