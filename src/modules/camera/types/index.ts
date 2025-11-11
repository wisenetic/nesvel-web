export type CameraStatus = "online" | "offline" | "error" | "recording";

/**
 * Represents a single camera entity
 */
export interface ICamera {
  id: string;
  name: string;
  location?: string;
  status: CameraStatus;
  fps: number;
  bitrate: string;
  latency: string;
  rtspUrl: string;
  lastSeen: string;
  isRecording: boolean;
}

/**
 * Used in the CameraStatusSummary component
 */
export interface ICameraStatusSummaryStats {
  total: number;
  online: number;
  offline: number;
  recording: number;
}
