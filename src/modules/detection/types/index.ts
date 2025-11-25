import type { BaseRecord } from "@refinedev/core";

export type DetectionStatus = "new" | "acknowledged";

export type DetectionType = "person" | "smoke" | "fire" | "vehicle" | "other";

export type DetectionSeverity = "info" | "warning" | "critical";

export interface Detection extends BaseRecord {
  id: string;
  cameraName: string;
  cameraId: string;
  time: string; // ISO string or formatted timestamp
  type: DetectionType;
  classLabel: string;
  confidence: number; // 0-100
  status: DetectionStatus;
  severity: DetectionSeverity;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}
