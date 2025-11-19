import { useMemo } from "react";

import {
  useDeleteMany,
  useList,
  useTranslation,
  useUpdate,
} from "@refinedev/core";
import { useLocation, useNavigate } from "react-router";

import { ConfirmDialog } from "@/core/components/shared/confirm-dialog";
import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Switch } from "@/core/components/ui/switch";
import { Input } from "@/core/components/ui/input";
import type { AlertRule, DetectionType } from "@/modules/alert/types";
import {
  AlertTriangle,
  AlarmSmoke,
  Bell,
  CheckCircle2,
  Flame,
  Mail,
  PersonStanding,
  Plus,
  Slash,
  Sparkles,
  Webhook,
} from "lucide-react";

const detectionStyles: Record<
  DetectionType,
  {
    icon: JSX.Element;
    cardClass: string;
    badgeClass: string;
  }
> = {
  fire: {
    icon: <Flame className="size-5 text-red-600" />,
    cardClass: "border-l-red-500",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
  },
  smoke: {
    icon: <AlarmSmoke className="size-5 text-amber-600" />,
    cardClass: "border-l-amber-500",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  person: {
    icon: <PersonStanding className="size-5 text-sky-600" />,
    cardClass: "border-l-sky-500",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  custom: {
    icon: <Sparkles className="size-5 text-violet-600" />,
    cardClass: "border-l-violet-500",
    badgeClass: "bg-violet-50 text-violet-700 border-violet-200",
  },
};

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
    navigate("/alerts/create", {
      state: { background: location },
    });
  };

  const handleEdit = (id: string) => {
    navigate(`/alerts/edit/${id}`, {
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
            icon: <Slash className="size-5 text-amber-500" />,
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
        {rules.map((rule) => {
          const style = detectionStyles[rule.detectionType ?? "fire"];

          return (
            <Card
              key={rule.id}
              className={`flex flex-col gap-4 rounded-xl p-4 border border-l-4 shadow-sm transition-shadow ${style.cardClass}`}
            >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3">
                  <div className="mt-0.5">{style.icon}</div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold md:text-lg">
                        {rule.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs uppercase tracking-wide ${style.badgeClass}`}
                      >
                        {translate(
                          `alert.detectionType.${rule.detectionType}` as const,
                          rule.detectionType,
                        )}
                      </Badge>
                    </div>
                  <p className="text-xs text-muted-foreground md:text-sm">
                      {`${translate(
                        "alert.card.min_confidence",
                        "Min confidence",
                      )}: ${rule.minConfidence ?? 70}%`}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 text-xs">
                      {rule.emailEnabled && (
                        <Badge
                          variant="secondary"
                          className="inline-flex items-center gap-1"
                        >
                          <Mail className="size-3" />
                          {translate("alert.badges.email", "Email")}
                        </Badge>
                      )}
                      {rule.webhookEnabled && (
                        <Badge
                          variant="secondary"
                          className="inline-flex items-center gap-1"
                        >
                          <Webhook className="size-3" />
                          {translate("alert.badges.webhook", "Webhook")}
                        </Badge>
                      )}
                      {!rule.emailEnabled && !rule.webhookEnabled && (
                        <span className="text-xs text-muted-foreground">
                          {translate(
                            "alert.badges.no_notifications",
                            "No notifications configured",
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                  <span className="text-xs text-muted-foreground">
                    {rule.enabled
                      ? translate("alert.status.enabled", "Enabled")
                      : translate("alert.status.disabled", "Disabled")}
                  </span>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(checked) =>
                      handleToggleEnabled(rule, Boolean(checked))
                    }
                  />
                </div>
              </div>

              {rule.webhookEnabled && rule.webhookUrl && (
                <div className="mt-1 flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    {translate("alert.fields.webhook_url", "Webhook URL")}
                  </span>
                  <Input value={rule.webhookUrl} readOnly className="text-xs" />
                </div>
              )}

              <div className="mt-3 flex flex-col-reverse md:flex-row md:justify-end gap-2 md:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full md:w-auto"
                  onClick={() => handleEdit(rule.id)}
                >
                  {translate("alert.actions.edit", "Edit")}
                </Button>

                <ConfirmDialog
                  title={translate(
                    "alert.actions.confirm_delete_title",
                    "Delete alert rule",
                  )}
                  description={translate(
                    "alert.actions.confirm_delete_message",
                    "Are you sure you want to delete this alert rule?",
                  )}
                  confirmLabel={translate("alert.actions.delete", "Delete")}
                  cancelLabel={translate("buttons.cancel", "Cancel")}
                  onConfirm={() => handleDelete(rule.id)}
                  trigger={
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full md:w-auto"
                    >
                      {translate("alert.actions.delete", "Delete")}
                    </Button>
                  }
                />
              </div>
            </Card>
          );
        })}

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
