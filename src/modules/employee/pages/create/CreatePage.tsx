import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { DynamicForm, field, form } from "@/core/components/shared/dynamic-form";
import { type EmployeeFormValues } from "@/modules/employee/schema";
import type { Employee } from "@/modules/employee/types";

export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish },
  } = useForm<EmployeeFormValues>({
    refineCoreProps: {
      resource: "employees",
    },
  });

  const defaultValues: EmployeeFormValues = {
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    role: "security_guard",
    shift: "morning",
    location: "",
    status: "active",
  };

  const employeeCreateSchema = form({
    fullName: field.text({
      label: translate("employee.fields.full_name", "Full Name"),
      required: true,
      description: translate(
        "employee.validation.full_name_required",
        "Full name is required",
      ),
    }),
    employeeId: field.text({
      label: translate("employee.fields.employee_id", "Employee ID"),
      required: true,
      description: translate(
        "employee.validation.employee_id_required",
        "Employee ID is required",
      ),
    }),
    status: field.select({
      label: translate("employee.fields.status", "Status"),
      required: true,
      options: [
        { label: translate("employee.status.active", "Active"), value: "active" },
        { label: translate("employee.status.on_duty", "On Duty"), value: "on_duty" },
        { label: translate("employee.status.on_leave", "On Leave"), value: "on_leave" },
      ],
    }),
    email: field.email({
      label: translate("employee.fields.email", "Email"),
      required: true,
    }),
    phone: field.text({
      label: translate("employee.fields.phone", "Phone"),
      required: true,
    }),
    role: field.select({
      label: translate("employee.fields.role", "Role"),
      required: true,
      options: [
        {
          label: translate(
            "employee.role.security_guard",
            "Security Guard",
          ),
          value: "security_guard",
        },
        {
          label: translate("employee.role.supervisor", "Supervisor"),
          value: "supervisor",
        },
        {
          label: translate("employee.role.manager", "Manager"),
          value: "manager",
        },
      ],
    }),
    shift: field.select({
      label: translate("employee.fields.shift", "Shift"),
      required: true,
      options: [
        {
          label: translate(
            "employee.shift.morning",
            "Morning (6AM - 2PM)",
          ),
          value: "morning",
        },
        {
          label: translate(
            "employee.shift.evening",
            "Evening (2PM - 10PM)",
          ),
          value: "evening",
        },
        {
          label: translate(
            "employee.shift.night",
            "Night (10PM - 6AM)",
          ),
          value: "night",
        },
      ],
    }),
    location: field.text({
      label: translate("employee.fields.location", "Location"),
      required: true,
      description: translate(
        "employee.validation.location_required",
        "Location is required",
      ),
    }),
  }).withFormMeta({
    title: translate("employee.create.title", "Add New Employee"),
    description: translate(
      "employee.create.subtitle",
      "Add a new security employee to the system",
    ),
    submitLabel: translate("employee.create.submit", "Add Employee"),
  });

  const handleSubmit = (values: any) => {
    const payload: Partial<Employee> = {
      ...values,
    };

    onFinish(payload as any);
  };

  return (
    <div className="w-full max-w-xl p-6 space-y-6">
      <DynamicForm
        schema={employeeCreateSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="space-y-4"
        showFooterBorder={false}
        extraActions={(
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-1 text-sm font-medium text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground"
            onClick={() => navigate(-1)}
          >
            {translate("buttons.cancel", "Cancel")}
          </button>
        )}
      />
    </div>
  );
}
