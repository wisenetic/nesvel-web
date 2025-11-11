import { cn } from "@/core/lib/utils";
interface CameraStreamInfoProps {
  rtspUrl: string;
  isRecording: boolean;
  lastSeen: string;
}

export default function CameraStreamInfo({
  rtspUrl,
  isRecording,
  lastSeen,
}: CameraStreamInfoProps) {
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between p-2 rounded",
          isRecording
            ? "bg-violet-100 dark:bg-violet-500/10"
            : "bg-red-100 dark:bg-red-500/10",
        )}
      >
        <div className="flex items-center gap-2">
          {isRecording ? (
            <>
              <div className="w-2 h-2 bg-violet-700 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Recording</span>
            </>
          ) : (
            <span className="text-sm font-medium">Not recording</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">2.4 GB / 50 GB</span>
      </div>
      <div className="text-sm">
        <p className="text-muted-foreground mb-1">RTSP URL:</p>
        <p className="font-mono text-xs break-all bg-muted p-2 rounded">
          {rtspUrl}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">{lastSeen}</p>
    </>
  );
}
