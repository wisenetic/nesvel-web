import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EmployeeForm } from "@/modules/employee/components/employee-form";
import { employeeSchema, type EmployeeFormValues } from "@/modules/employee/schema";
import type { Employee } from "@/modules/employee/types";

export default function EmployeeCreatePage() {
  const navigate = useNavigate();

  const form = useForm<EmployeeFormValues>({
    refineCoreProps: {
      resource: "employees",
    },
    resolver: zodResolver(employeeSchema) as any,
    defaultValues: {
      fullName: "",
      employeeId: "",
      email: "",
      phone: "",
      role: "security_guard",
      shift: "morning",
      location: "",
      status: "active",
    },
  });

  const {
    refineCore: { onFinish },
  } = form;

  const handleSubmit = (values: EmployeeFormValues) => {
    const payload: Partial<Employee> = {
      ...values,
    };

    onFinish(payload as any);
  };

  return (
    <EmployeeForm
      form={form}
      mode="create"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
