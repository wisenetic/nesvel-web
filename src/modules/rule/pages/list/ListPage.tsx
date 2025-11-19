import { useMemo } from "react";

import { useDeleteMany, useList, useTranslation, useUpdate } from "@refinedev/core";
import { useLocation, useNavigate } from "react-router";

import { ConfirmDialog } from "@/core/components/shared/confirm-dialog";
import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Switch } from "@/core/components/ui/switch";
import type { Rule } from "@/modules/rule/types";
import {
  Activity,
  AlertTriangle,
  ArrowDownUp,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Flame,
  Layers3,
  Plus,
} from "lucide-react";

const severityStyles: Record<
  Rule["severity"],
  {
    badgeClass: string;
    labelKey: string;
  }
> = {
  critical: {
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    labelKey: "rule.severity.critical",
  },
  high: {
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    labelKey: "rule.severity.high",
  },
  medium: {
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    labelKey: "rule.severity.medium",
  },
  low: {
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    labelKey: "rule.severity.low",
  },
};

export default function RuleListPage() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<Rule>({
    resource: "rules",
  });

  const { mutateAsync: update } = useUpdate();
  const { mutateAsync: deleteMany } = useDeleteMany();

  const rules = useMemo(() => result?.data ?? [], [result]);

  const stats = useMemo(() => {
    const total = rules.length;
    const active = rules.filter((r) => r.enabled).length;
    const cameras = new Set(rules.map((r) => r.cameraName).filter(Boolean));
    const models = new Set(rules.map((r) => r.modelName).filter(Boolean));

    return {
      total,
      active,
      cameras: cameras.size,
      models: models.size,
    };
  }, [rules]);

  const handleCreate = () => {
    navigate("/rules/create", {
      state: { background: location },
    });
  };

  const handleEdit = (id: string) => {
    navigate(`/rules/edit/${id}`, {
      state: { background: location },
    });
  };

  const handleToggleEnabled = async (rule: Rule, enabled: boolean) => {
    await update({
      resource: "rules",
      id: rule.id,
      values: { enabled },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteMany({ resource: "rules", ids: [id] });
    await query.refetch();
  };

  if (query.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("rule.loading", "Loading rules...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("rule.list_title", "Rules Engine")}
        description={translate(
          "rule.list_description",
          "Configure detection rules with advanced conditions",
        )}
        rightSlot={
          <Button size="lg" onClick={handleCreate}>
            <Plus /> {translate("rule.actions.add_rule", "Create Rule")}
          </Button>
        }
      />

      <StatsOverview
        items={[
          {
            label: translate("rule.summary.total_rules", "Total Rules"),
            value: stats.total,
            icon: <Layers3 className="size-5" />,
          },
          {
            label: translate("rule.summary.active_rules", "Active Rules"),
            value: stats.active,
            tone: "success",
            icon: <CheckCircle2 className="size-5 text-emerald-500" />,
          },
          {
            label: translate(
              "rule.summary.cameras_monitored",
              "Cameras Monitored",
            ),
            value: stats.cameras,
            icon: <Camera className="size-5" />,
          },
          {
            label: translate("rule.summary.models_used", "Models Used"),
            value: stats.models,
            icon: <CircleDot className="size-5" />,
          },
        ]}
      />

      <div className="space-y-4">
        {rules.map((rule) => {
          const severity = severityStyles[rule.severity];

          return (
            <Card
              key={rule.id}
              className="flex flex-col gap-3 rounded-xl border px-4 py-4 md:px-6"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                {/* Left section: title + description + meta */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold md:text-lg">
                      {rule.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs uppercase tracking-wide ${severity.badgeClass}`}
                    >
                      {translate(severity.labelKey)}
                    </Badge>
                    <Badge
                      variant={rule.enabled ? "default" : "outline"}
                      className="text-xs"
                    >
                      {rule.enabled
                        ? translate("rule.status.enabled", "Enabled")
                        : translate("rule.status.disabled", "Disabled")}
                    </Badge>
                  </div>

                  {rule.description && (
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {rule.description}
                    </p>
                  )}

                  <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-muted-foreground md:grid-cols-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {translate("rule.fields.camera", "Camera")}:
                      </span>
                      <span>{rule.cameraName ?? "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {translate("rule.fields.model", "AI Model")}:
                      </span>
                      <span>{rule.modelName ?? "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {translate("rule.fields.priority", "Priority")}:
                      </span>
                      <span>{rule.priority ?? "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {translate("rule.fields.conditions", "Conditions")}:
                      </span>
                      <span>
                        {rule.conditionsCount ?? 0}{" "}
                        {translate("rule.conditions.active", "active")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right section: toggle + actions */}
                <div className="flex flex-col items-stretch gap-2 self-stretch md:w-48 md:self-center">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>
                      {rule.enabled
                        ? translate("rule.status.enabled", "Enabled")
                        : translate("rule.status.disabled", "Disabled")}
                    </span>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={(checked) =>
                        handleToggleEnabled(rule, Boolean(checked))
                      }
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleEdit(rule.id)}
                  >
                    {translate("rule.actions.edit", "Edit Rule")}
                  </Button>

                  <ConfirmDialog
                    title={translate(
                      "rule.actions.confirm_delete_title",
                      "Delete rule",
                    )}
                    description={translate(
                      "rule.actions.confirm_delete_message",
                      "Are you sure you want to delete this rule?",
                    )}
                    confirmLabel={translate("rule.actions.delete", "Delete")}
                    cancelLabel={translate("buttons.cancel", "Cancel")}
                    onConfirm={() => handleDelete(rule.id)}
                    trigger={
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        {translate("rule.actions.delete", "Delete")}
                      </Button>
                    }
                  />
                </div>
              </div>

              {/* Optional bottom row with a subtle arrow to indicate more details */}
              <button
                type="button"
                onClick={() => navigate(`/rules/show/${rule.id}`, { state: { background: location } })}
                className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {translate("rule.actions.view_details", "View details")}
                <ChevronRight className="size-3" />
              </button>
            </Card>
          );
        })}

        {!rules.length && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            <p>
              {translate(
                "rule.empty.description",
                "No rules configured yet. Create your first rule to start automating alerts.",
              )}
            </p>
            <Button size="sm" className="mt-4" onClick={handleCreate}>
              <Plus className="mr-1" />
              {translate("rule.actions.add_rule", "Create Rule")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
