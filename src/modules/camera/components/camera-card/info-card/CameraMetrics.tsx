type CameraMetricsProps = {
  fps: number;
  bitrate: string;
  latency: string;
};

import { useTranslation } from "@refinedev/core";

export default function CameraMetrics({
  fps,
  bitrate,
  latency,
}: CameraMetricsProps) {
  const { translate } = useTranslation();
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
