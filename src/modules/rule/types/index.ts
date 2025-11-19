export type RuleSeverity = "critical" | "high" | "medium" | "low";

export type RuleStatus = "enabled" | "disabled";

export type Rule = {
  id: string;
  name: string;
  description?: string;
  cameraName?: string;
  modelName?: string;
  priority?: number;
  conditionsCount?: number;
  severity: RuleSeverity;
  enabled: boolean;
  // Condition-related fields (optional until backend fully supports them)
  geofencingEnabled?: boolean;
  scheduleEnabled?: boolean;
  confidenceEnabled?: boolean;
  minConfidence?: number;
  classFilterEnabled?: boolean;
  metadata?: Record<string, unknown>;
};
