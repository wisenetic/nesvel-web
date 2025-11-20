import { useShow, useTranslate } from "@refinedev/core";
import { useLocation, useNavigate, useParams } from "react-router";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import type { Employee } from "@/modules/employee/types";
import { Clock3, Mail, MapPin, Phone, User2 } from "lucide-react";

export default function EmployeeShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslate();

  const { query } = useShow<Employee>({
    resource: "employees",
    id,
  });

  const employee = query.data?.data;

  if (query.isLoading)
    return (
      <div className="p-6">{t("employee.loading", "Loading employees...")}</div>
    );
  if (!employee)
    return (
      <div className="p-6">{t("employee.show.not_found", "Employee not found")}</div>
    );

  const handleClose = () => {
    if (location.state && (location.state as any).background) {
      navigate(-1);
      return;
    }

    navigate("/employees");
  };

  return (
    <div className="space-y-6 pr-2">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <User2 className="size-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{employee.fullName}</h2>
            <p className="text-sm text-muted-foreground">
              {t("employee.fields.employee_id", "Employee ID")}: {employee.employeeId}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="capitalize">
          {t(`employee.status.${employee.status}` as const, employee.status)}
        </Badge>
      </div>

      <Card className="space-y-3 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
          <InfoRow
            icon={<Mail className="size-4" />}
            label={t("employee.fields.email", "Email")}
            value={employee.email}
          />
          <InfoRow
            icon={<Phone className="size-4" />}
            label={t("employee.fields.phone", "Phone")}
            value={employee.phone}
          />
          <InfoRow
            icon={<Clock3 className="size-4" />}
            label={t("employee.fields.shift", "Shift")}
            value={t(`employee.shift.${employee.shift}` as const, employee.shift)}
          />
          <InfoRow
            icon={<MapPin className="size-4" />}
            label={t("employee.fields.location", "Location")}
            value={employee.location}
          />
        </div>
      </Card>

      <Separator />

      <Button variant="outline" className="w-full" onClick={handleClose}>
        {t("employee.actions.close", "Close")}
      </Button>
    </div>
  );
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-muted-foreground">{icon}</span>
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  </div>
);
