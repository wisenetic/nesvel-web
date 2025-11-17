export type DetectionType = "fire" | "smoke" | "person" | "custom";

export type AlertSeverity = "info" | "warning" | "critical";

export type AlertRule = {
  id: string;
  name: string;
  detectionType: DetectionType;
  minConfidence: number; // 0-100
  emailEnabled: boolean;
  webhookEnabled: boolean;
  webhookUrl?: string | null;
  enabled: boolean;
  severity?: AlertSeverity;
  // Additional metadata from backend can be stored here
  metadata?: Record<string, unknown>;
};
