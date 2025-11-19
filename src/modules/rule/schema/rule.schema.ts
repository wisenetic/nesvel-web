import { z } from "zod";

import type { RuleSeverity } from "@/modules/rule/types";

export const ruleSchema = z.object({
  name: z.string().min(1, "Rule name is required"),
  description: z
    .string()
    .max(512, "Description is too long")
    .optional()
    .or(z.literal("")),
  cameraName: z
    .string()
    .max(128, "Camera label is too long")
    .optional()
    .or(z.literal("")),
  modelName: z
    .string()
    .max(128, "Model label is too long")
    .optional()
    .or(z.literal("")),
  priority: z
    .number()
    .int("Priority must be an integer")
    .min(0, "Priority must be >= 0")
    .max(1000, "Priority must be <= 1000")
    .default(0),
  conditionsCount: z
    .number()
    .int("Conditions must be an integer")
    .min(0)
    .default(0),
  severity: z.enum(["critical", "high", "medium", "low"] as [RuleSeverity, ...RuleSeverity[]]),
  enabled: z.boolean().default(true),
  // Conditions tab fields
  geofencingEnabled: z.boolean().default(false),
  scheduleEnabled: z.boolean().default(false),
  confidenceEnabled: z.boolean().default(true),
  minConfidence: z
    .number()
    .min(0, "Minimum confidence must be >= 0")
    .max(100, "Minimum confidence must be <= 100")
    .default(70),
  classFilterEnabled: z.boolean().default(false),
});

export type RuleFormValues = z.infer<typeof ruleSchema>;
