export type EmployeeStatus = "active" | "on_duty" | "on_leave";

export type EmployeeRole =
  | "security_guard"
  | "supervisor"
  | "manager";

export type EmployeeShift =
  | "morning"
  | "evening"
  | "night";

export type Employee = {
  id: string;
  fullName: string;
  employeeId: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  shift: EmployeeShift;
  location: string;
  status: EmployeeStatus;
};
