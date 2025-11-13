export type CameraStatus = "online" | "offline" | "error" | "recording";

/**
 * Represents a single camera entity
 */
export type ICamera = {
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
};

/**
 * Used in the CameraStatusSummary component
 */
export type ICameraStatusSummaryStats = {
  total: number;
  online: number;
  offline: number;
  recording: number;
};

export type IGridSize = "2x2" | "3x3" | "4x4";
