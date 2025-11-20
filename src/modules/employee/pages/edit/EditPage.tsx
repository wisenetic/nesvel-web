import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EmployeeForm } from "@/modules/employee/components/employee-form";
import { employeeSchema, type EmployeeFormValues } from "@/modules/employee/schema";
import type { Employee } from "@/modules/employee/types";

export default function EmployeeEditPage() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<EmployeeFormValues>({
    refineCoreProps: {
      resource: "employees",
    },
    resolver: zodResolver(employeeSchema) as any,
  });

  const handleSubmit = (values: EmployeeFormValues) => {
    const payload: Partial<Employee> = {
      ...values,
    };

    onFinish(payload as any);
  };

  if (query?.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("employee.loading", "Loading employees...")}
      </div>
    );
  }

  return (
    <EmployeeForm
      form={form}
      mode="edit"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
