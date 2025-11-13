import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";

export function useHls(src?: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src || !videoRef.current) return;
    const video = videoRef.current;
    if (video.canPlayType("application/vnd.apple.mpegURL")) {
      video.src = src;
      setLoading(false);
      return;
    }
    let hls: Hls | null = null;
    (async () => {
      try {
        const mod = await import("hls.js");
        const HlsCtor = (mod.default ?? mod) as typeof import("hls.js").default;
        hls = new HlsCtor();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(HlsCtor.Events.MANIFEST_PARSED, () => setLoading(false));
        hls.on(HlsCtor.Events.ERROR, (_, data) => {
          if (data.fatal) setError("Stream error");
        });
      } catch (e) {
        setError("hls.js import failed");
      }
    })();
    return () => {
      hls?.destroy();
      hls = null;
    };
  }, [src]);

  return { videoRef, loading, error };
}
