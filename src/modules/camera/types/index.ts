export type CameraStatus = "online" | "offline" | "error" | "recording";

/**
 * Represents a single camera entity
 */

export type ICamera = {
  id: string;
  name: string;
  location?: string;
  status: CameraStatus;
  fps?: string;
  bitrate?: string;
  latency?: string;
  streamUrl: string; // replace streamUrl
  streamType?: "hls" | "rtsp" | "mjpeg" | "mp4" | "webrtc";
  lastSeen?: string; // ISO
  isRecording?: boolean;
  metadata?: Record<string, unknown>;
};

/**
 * Used in the CameraStatusSummary component
 */
export type ICameraStatusStats = {
  total: number;
  online: number;
  offline: number;
  recording: number;
};

export type IGridSize = "2x2" | "3x3" | "4x4";
