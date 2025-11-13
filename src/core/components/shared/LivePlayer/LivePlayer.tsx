import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import { Loader2 } from "lucide-react";

interface LivePlayerProps {
  src: string;
  muted?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
  poster?: string;
}

/**
 * Universal Live Player Component
 *
 * ✅ Supports:
 *  - HLS (.m3u8) via native Safari or hls.js (dynamic import)
 *  - MP4 / WebM playback
 *  - MJPEG streams via <img>
 *  - RTSP notice for unsupported browsers
 *
 * ✅ Enhancements:
 *  - TypeScript-safe dynamic import of hls.js
 *  - Error handling + auto-reconnect
 *  - Loading spinner + visual feedback
 *  - Tailwind + shadcn/ui consistent design
 */
export default function LivePlayer({
  src,
  muted = true,
  autoPlay = true,
  controls = false,
  className = "w-full h-full rounded-lg object-cover bg-black",
  poster,
}: LivePlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isHls = /\.m3u8($|\?)/i.test(src);
  const isMjpeg = /(mjpeg|mjpg)/i.test(src);
  const isHttpFile = /\.(mp4|webm|ogg)($|\?)/i.test(src);
  const isRtsp = /^rtsp:\/\//i.test(src);

  // 🧠 HLS setup (dynamic import)
  useEffect(() => {
    if (!isHls || !videoRef.current) return;

    const video = videoRef.current;
    let hlsInstance: Hls | null = null;
    setError(null);

    // Safari supports HLS natively
    if (video.canPlayType("application/vnd.apple.mpegURL")) {
      video.src = src;
      video.play().catch(() => void 0);
      return;
    }

    (async () => {
      try {
        const mod = await import("hls.js");
        const HlsCtor = (mod.default ?? mod) as typeof import("hls.js").default;

        if (!HlsCtor.isSupported()) {
          setError("HLS not supported in this browser.");
          return;
        }

        hlsInstance = new HlsCtor({
          liveSyncDurationCount: 3,
          maxBufferLength: 10,
        });
        hlsInstance.loadSource(src);
        hlsInstance.attachMedia(video);

        hlsInstance.on(HlsCtor.Events.MANIFEST_PARSED, () => {
          setLoading(false);
          video
            .play()
            .catch(() => setError("Autoplay blocked. Click to play."));
        });

        hlsInstance.on(HlsCtor.Events.ERROR, (_, data) => {
          console.warn("HLS.js error:", data);
          if (data.fatal) {
            switch (data.type) {
              case "networkError":
                hlsInstance?.startLoad(); // auto-reconnect
                break;
              case "mediaError":
                hlsInstance?.recoverMediaError();
                break;
              default:
                setError(`Stream error: ${data.type}`);
                hlsInstance?.destroy();
                hlsInstance = null;
            }
          }
        });
      } catch (e) {
        console.error("HLS.js import failed", e);
        setError("Missing dependency: install hls.js (pnpm add hls.js)");
      }
    })();

    return () => {
      hlsInstance?.destroy();
      hlsInstance = null;
    };
  }, [src, isHls]);

  // 🎬 Loading detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlaying = () => setLoading(false);
    const handleWaiting = () => setLoading(true);

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("waiting", handleWaiting);
    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, []);

  // 🟣 RTSP fallback
  if (isRtsp) {
    return (
      <div
        role="alert"
        className="flex h-full w-full items-center justify-center rounded-lg bg-muted/20 p-4 text-center text-sm text-muted-foreground"
      >
        RTSP is not playable directly in browsers. Please expose this feed as
        HLS (.m3u8), WebRTC, or MJPEG.
      </div>
    );
  }

  // 🟠 MJPEG stream
  if (isMjpeg) {
    return (
      <img
        src={src}
        alt="Live MJPEG Stream"
        className={`${className} absolute inset-0 object-cover`}
      />
    );
  }

  // 🟢 HLS / MP4 / WebM
  if (isHls || isHttpFile) {
    return (
      <div className="relative h-full w-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="absolute inset-0 flex items-center justify-center bg-black/40 p-3 text-sm text-red-400 text-center"
          >
            {error}
          </div>
        )}

        <video
          ref={videoRef}
          className={className}
          muted={muted}
          autoPlay={autoPlay}
          controls={controls}
          playsInline
          poster={poster}
          onLoadedData={() => setLoading(false)}
          onError={() => setError("Stream failed to load.")}
        >
          {isHttpFile && <source src={src} />}
        </video>
      </div>
    );
  }

  // ⚫ Unknown type fallback
  return (
    <div
      role="alert"
      className="flex h-full w-full items-center justify-center rounded-lg bg-muted/20 p-4 text-center text-sm text-muted-foreground"
    >
      Unsupported stream format. Use HLS (.m3u8), MP4/WebM, or MJPEG.
      {error && <div className="mt-2 text-destructive">{error}</div>}
    </div>
  );
}
