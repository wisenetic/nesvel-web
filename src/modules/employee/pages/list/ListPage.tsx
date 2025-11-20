import { useMemo } from "react";

import { useDeleteMany, useList, useTranslation } from "@refinedev/core";
import { useLocation, useNavigate } from "react-router";

import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import type { Employee } from "@/modules/employee/types";
import { CheckCircle2, Clock3, Moon, SunMedium, Trash2, User2, Users } from "lucide-react";

export default function EmployeeListPage() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<Employee>({
    resource: "employees",
  });

  const { mutateAsync: deleteMany } = useDeleteMany();

  const employees = useMemo(() => result?.data ?? [], [result]);

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "active").length;
    const onDuty = employees.filter((e) => e.status === "on_duty").length;
    const onLeave = employees.filter((e) => e.status === "on_leave").length;

    return { total, active, onDuty, onLeave };
  }, [employees]);

  const handleCreate = () => {
    navigate("/employees/create", {
      state: { background: location },
    });
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`, {
      state: { background: location },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteMany({ resource: "employees", ids: [id] });
    await query.refetch();
  };

  if (query.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("employee.loading", "Loading employees...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("employee.list_title", "Security Personnel")}
        description={translate(
          "employee.list_description",
          "Manage security employees and work assignments",
        )}
        rightSlot={
          <Button size="lg" onClick={handleCreate}>
            {translate("employee.actions.add_employee", "Add Employee")}
          </Button>
        }
      />

      <StatsOverview
        items={[
          {
            label: translate(
              "employee.summary.total_employees",
              "Total Employees",
            ),
            value: stats.total,
            icon: <Users className="size-5" />,
          },
          {
            label: translate("employee.summary.active", "Active"),
            value: stats.active,
            icon: <CheckCircle2 className="size-5 text-emerald-500" />,
            tone: "success",
          },
          {
            label: translate("employee.summary.on_duty", "On Duty"),
            value: stats.onDuty,
            icon: <SunMedium className="size-5 text-blue-500" />,
          },
          {
            label: translate("employee.summary.on_leave", "On Leave"),
            value: stats.onLeave,
            icon: <Moon className="size-5 text-amber-500" />,
          },
        ]}
      />

      <div className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2 md:px-4">
        <Input
          placeholder={translate(
            "employee.search_placeholder",
            "Search employees...",
          )}
          className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="space-y-4">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className="flex flex-col gap-3 rounded-xl border bg-background p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User2 className="size-4 text-muted-foreground" />
                <span className="text-sm font-semibold md:text-base">
                  {employee.fullName}
                </span>
                <Badge
                  variant="outline"
                  className="text-[11px] capitalize md:text-xs"
                >
                  {translate(
                    `employee.status.${employee.status}` as const,
                    employee.status,
                  )}
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-medium">
                  {translate("employee.fields.employee_id", "Employee ID")}: 
                </span>
                <span>{employee.employeeId}</span>
              </div>

              <div className="mt-1 grid grid-cols-1 gap-1 text-xs text-muted-foreground md:grid-cols-2">
                <div>
                  <span className="font-medium">
                    {translate("employee.fields.role", "Role")}:
                  </span>{" "}
                  <span>
                    {translate(
                      `employee.role.${employee.role}` as const,
                      employee.role,
                    )}
                  </span>
                </div>
                <div>
                  <span className="font-medium">
                    {translate("employee.fields.phone", "Phone")}:
                  </span>{" "}
                  <span>{employee.phone}</span>
                </div>
                <div>
                  <span className="font-medium">
                    {translate("employee.fields.email", "Email")}:
                  </span>{" "}
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock3 className="size-3" />
                  <span className="font-medium">
                    {translate("employee.fields.shift", "Shift")}:
                  </span>
                  <span>
                    {translate(
                      `employee.shift.${employee.shift}` as const,
                      employee.shift,
                    )}
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-medium">
                  {translate("employee.fields.location", "Location")}:
                </span>{" "}
                <span>{employee.location}</span>
              </div>
            </div>

            <div className="flex gap-2 md:flex-col md:items-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(employee.id)}
              >
                {translate("employee.actions.edit", "Edit")}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDelete(employee.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </Card>
        ))}

        {!employees.length && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            {translate(
              "employee.empty.description",
              "No employees configured yet. Add your first employee to start assigning work.",
            )}
          </div>
        )}
      </div>
    </div>
  );
}
