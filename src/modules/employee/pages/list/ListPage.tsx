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
import {
  CheckCircle2,
  Clock3,
  Moon,
  SunMedium,
  Trash2,
  User2,
  Users,
} from "lucide-react";

const statusStyles: Record<
  Employee["status"],
  {
    badgeClass: string;
  }
> = {
  active: {
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  on_duty: {
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  on_leave: {
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

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

      {/* Simple search input without heavy card border/shadow */}
      <div className="max-w-sm">
        <Input
          placeholder={translate(
            "employee.search_placeholder",
            "Search employees...",
          )}
        />
      </div>

      <div className="space-y-4">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className="flex flex-col gap-3 rounded-xl border px-4 py-4 md:px-6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              {/* Left section: primary info + meta */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <User2 className="size-4 text-muted-foreground" />
                  <span className="text-base font-semibold md:text-lg">
                    {employee.fullName}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[11px] capitalize md:text-xs ${statusStyles[employee.status].badgeClass}`}
                  >
                    {translate(
                      `employee.status.${employee.status}` as const,
                      employee.status,
                    )}
                  </Badge>
                </div>

                {(() => {
                  const metaItems = [
                    {
                      key: "employeeId",
                      label: translate(
                        "employee.fields.employee_id",
                        "Employee ID",
                      ),
                      value: employee.employeeId,
                    },
                    {
                      key: "role",
                      label: translate("employee.fields.role", "Role"),
                      value: translate(
                        `employee.role.${employee.role}` as const,
                        employee.role,
                      ),
                    },
                    {
                      key: "phone",
                      label: translate("employee.fields.phone", "Phone"),
                      value: employee.phone,
                    },
                    {
                      key: "email",
                      label: translate("employee.fields.email", "Email"),
                      value: employee.email,
                    },
                    {
                      key: "shift",
                      label: translate("employee.fields.shift", "Shift"),
                      value: translate(
                        `employee.shift.${employee.shift}` as const,
                        employee.shift,
                      ),
                    },
                    {
                      key: "location",
                      label: translate(
                        "employee.fields.location",
                        "Location",
                      ),
                      value: employee.location,
                    },
                  ];

                  return (
      <div className="mt-1 grid grid-cols-1 gap-3 text-xs md:grid-cols-3 lg:grid-cols-4 md:text-sm">
                      {metaItems.map((item) => (
                        <div
                          key={item.key}
                          className="flex flex-col gap-0.5"
                        >
                          <span className="text-[11px] text-muted-foreground md:text-xs">
                            {item.label}
                          </span>
                          <span className="text-xs font-medium text-foreground md:text-sm">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Right section: actions, aligned like Rule page */}
              <div className="flex flex-col items-stretch self-stretch md:w-48 md:self-center">
                <div className="mt-4 flex flex-col gap-3 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full md:w-auto"
                    onClick={() => handleEdit(employee.id)}
                  >
                    {translate("employee.actions.edit", "Edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full md:w-auto"
                    onClick={() => handleDelete(employee.id)}
                  >
                    {translate("employee.actions.delete", "Delete")}
                  </Button>
                </div>
              </div>
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
