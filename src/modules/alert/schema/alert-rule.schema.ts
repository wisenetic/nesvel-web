import { z } from "zod";

import type { DetectionType } from "@/modules/alert/types";

export const alertRuleSchema = z.object({
  name: z.string().min(1, "Rule name is required"),

  detectionType: z.enum(["fire", "smoke", "person", "custom"], {
    required_error: "Detection type is required",
  }) as z.ZodType<DetectionType>,

  minConfidence: z
    .number()
    .min(0, "Minimum confidence must be >= 0")
    .max(100, "Minimum confidence must be <= 100")
    .default(70),

  emailEnabled: z.boolean().default(false),
  webhookEnabled: z.boolean().default(false),

  webhookUrl: z
    .string()
    .url("Webhook URL must be valid")
    .optional()
    .or(z.literal("")),

  enabled: z.boolean().default(true),
});

export type AlertRuleFormValues = z.infer<typeof alertRuleSchema>;
