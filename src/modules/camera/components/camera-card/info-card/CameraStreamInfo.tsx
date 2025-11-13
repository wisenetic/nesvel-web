import { useTranslation } from "@refinedev/core";

import { cn } from "@/core/lib/utils";

type CameraStreamInfoProps = {
  rtspUrl: string;
  isRecording: boolean;
  lastSeen: string;
};

export default function CameraStreamInfo({
  rtspUrl,
  isRecording,
  lastSeen,
}: CameraStreamInfoProps) {
  const { translate } = useTranslation();
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between p-2 rounded",
          isRecording
            ? "bg-green-100 dark:bg-green-500/10"
            : "bg-red-100 dark:bg-red-500/10",
        )}
      >
        <div className="flex items-center gap-2">
          {isRecording ? (
            <>
              <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {translate("camera.stream.recording")}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium">
              {translate("camera.stream.not_recording")}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {translate("camera.stream.storage_placeholder")}
        </span>
      </div>
      <div className="text-sm">
        <p className="text-muted-foreground mb-1">
          {translate("camera.stream.rtsp_label")}
        </p>
        <p className="font-mono text-xs break-all bg-muted p-2 rounded">
          {rtspUrl}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">{lastSeen}</p>
    </>
  );
}
