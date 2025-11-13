import { Camera, Maximize2 } from "lucide-react";

import LivePlayer from "@/core/components/shared/LivePlayer";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import { useTranslate } from "@refinedev/core";

import { type ICamera } from "@/modules/camera/types";

type LiveCardProps = {
  camera: ICamera;
  selected?: boolean;
  onSelect?: () => void;
  onFullscreen?: () => void;
  onSnapshot?: () => void;
};

export function LiveCard({
  camera,
  selected,
  onSelect,
  onFullscreen,
  onSnapshot,
}: LiveCardProps) {
  const translate = useTranslate();
  return (
    <div className="group relative aspect-video overflow-hidden rounded-md border bg-muted/20">
      {/* Simulated video area */}
      {/* Player area */}
      <div className="absolute inset-0">
        <LivePlayer src={camera.streamUrl} />
      </div>

      {/* Top-left checkbox */}
      <div className="absolute left-2 top-2">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onSelect?.()}
          aria-label={translate("camera.select_camera")}
          className="pointer-events-auto"
        />
      </div>

      {/* Top-right REC */}
      {camera.isRecording && (
        <div className="absolute right-2 top-2">
          <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
            {translate("camera.rec")}
          </span>
        </div>
      )}

      {/* Bottom-right location */}
      {camera.location && (
        <div className="absolute bottom-2 right-2">
          <span className="rounded bg-background/80 px-2 py-0.5 text-xs text-foreground shadow">
            {camera.location}
          </span>
        </div>
      )}

      {/* Bottom-left info (fps/bitrate) */}
      <div className="absolute bottom-2 left-2 flex gap-2 text-[11px] text-foreground/90">
        <Badge variant="secondary" className="rounded">
          {camera.fps} FPS
        </Badge>
        <Badge variant="secondary" className="rounded">
          {camera.bitrate}
        </Badge>
      </div>

      {/* Center hover controls: mode toggle + actions */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex items-center gap-3">
          {/* Actions */}
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
    </div>
  );
}
