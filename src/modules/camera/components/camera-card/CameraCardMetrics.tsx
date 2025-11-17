import { useTranslate } from "@refinedev/core";

type CameraMetricsProps = {
  fps?: string;
  bitrate?: string;
  latency?: string;
};

export default function CameraCardMetrics({
  fps,
  bitrate,
  latency,
}: CameraMetricsProps) {
  const translate = useTranslate();
  return (
    <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-lg">
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {translate("camera.metrics.fps")}
        </p>
        <p className="text-sm font-bold">{fps}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {translate("camera.metrics.bitrate")}
        </p>
        <p className="text-sm font-bold">{bitrate}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {translate("camera.metrics.latency")}
        </p>
        <p className="text-sm font-bold">{latency}</p>
      </div>
    </div>
  );
}
