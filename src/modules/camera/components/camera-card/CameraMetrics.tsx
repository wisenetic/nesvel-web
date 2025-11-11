interface CameraMetricsProps {
  fps: number;
  bitrate: string;
  latency: string;
}

export default function CameraMetrics({
  fps,
  bitrate,
  latency,
}: CameraMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-lg">
      <div className="text-center">
        <p className="text-xs text-muted-foreground">FPS</p>
        <p className="text-sm font-bold">{fps}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">Bitrate</p>
        <p className="text-sm font-bold">{bitrate}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">Latency</p>
        <p className="text-sm font-bold">{latency}</p>
      </div>
    </div>
  );
}
