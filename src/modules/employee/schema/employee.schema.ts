import { z } from "zod";

import type {
  EmployeeRole,
  EmployeeShift,
  EmployeeStatus,
} from "@/modules/employee/types";

export const employeeSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(120, "Full name is too long"),
  employeeId: z.string().min(1, "Employee ID is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is required"),
  role: z.enum(
    ["security_guard", "supervisor", "manager"] as [
      EmployeeRole,
      ...EmployeeRole[],
    ],
  ),
  shift: z.enum(
    ["morning", "evening", "night"] as [EmployeeShift, ...EmployeeShift[]],
  ),
  location: z.string().min(1, "Location is required"),
  status: z.enum(
    ["active", "on_duty", "on_leave"] as [EmployeeStatus, ...EmployeeStatus[]],
  ),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
