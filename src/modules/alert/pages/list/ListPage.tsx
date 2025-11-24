import {
  useDeleteMany,
  useList,
  useTranslation,
  useUpdate,
} from "@refinedev/core";
import { AlertTriangle, Bell, CheckCircle2, Plus, CircleX } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { Button } from "@/core/components/ui/button";
import { AlertRuleCard } from "@/modules/alert/components/alert-rule-card";
import type { AlertRule } from "@/modules/alert/types";

export default function AlertListPage() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<AlertRule>({
    resource: "alerts",
  });

  const { mutateAsync: deleteMany } = useDeleteMany();
  const { mutateAsync: update } = useUpdate();

  const rules = useMemo(() => result?.data ?? [], [result]);

  const stats = useMemo(() => {
    const total = rules.length;
    const active = rules.filter((r) => r.enabled).length;
    const disabled = total - active;
    const critical = rules.filter((r) => r.severity === "critical").length;

    return {
      total,
      active,
      disabled,
      critical,
    };
  }, [rules]);

  const handleCreate = () => {
    void navigate("/alerts/create", {
      state: { background: location },
    });
  };

  const handleEdit = (id: string) => {
    void navigate(`/alerts/edit/${id}`, {
      state: { background: location },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteMany({ resource: "alerts", ids: [id] });
    await query.refetch();
  };

  const handleToggleEnabled = async (rule: AlertRule, enabled: boolean) => {
    await update({
      resource: "alerts",
      id: rule.id,
      values: { enabled },
    });
  };

  if (query.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("alert.loading", "Loading alerts...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("alert.list_title", "Alert Configuration")}
        description={translate(
          "alert.list_description",
          "Configure detection alerts and notification rules",
        )}
        rightSlot={
          <Button size="lg" onClick={handleCreate}>
            <Plus /> {translate("alert.actions.add_rule", "Add Alert Rule")}
          </Button>
        }
      />

      <StatsOverview
        items={[
          {
            label: translate("alert.summary.total_rules", "Total Rules"),
            value: stats.total,
            icon: <Bell className="size-5" />,
            tone: "default",
          },
          {
            label: translate("alert.summary.active_rules", "Active Rules"),
            value: stats.active,
            icon: <CheckCircle2 className="size-5 text-emerald-500" />,
            tone: "success",
          },
          {
            label: translate("alert.summary.disabled_rules", "Disabled Rules"),
            value: stats.disabled,
            icon: <CircleX className="size-5 text-amber-500" />,
            tone: "warning",
          },
          {
            label: translate(
              "alert.summary.critical_alerts",
              "Critical Alerts",
            ),
            value: stats.critical,
            icon: <AlertTriangle className="size-5 text-destructive" />,
            tone: "danger",
          },
        ]}
      />

      <div className="space-y-4">
        {rules.map((rule) => (
          <AlertRuleCard
            key={rule.id}
            rule={rule}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleEnabled={handleToggleEnabled}
          />
        ))}

        {!rules.length && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            <p>
              {translate(
                "alert.empty.description",
                "No alert rules configured yet. Add your first rule to get notified about detections.",
              )}
            </p>
            <Button size="sm" className="mt-4" onClick={handleCreate}>
              <Plus className="mr-1" />
              {translate("alert.actions.add_rule", "Add Alert Rule")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
