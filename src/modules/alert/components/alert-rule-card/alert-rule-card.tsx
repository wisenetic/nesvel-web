import { useTranslation } from "@refinedev/core";
import {
  AlarmSmoke,
  Flame,
  Mail,
  PersonStanding,
  Sparkles,
  Webhook,
} from "lucide-react";

import { ConfirmDialog } from "@/core/components/shared/confirm-dialog";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Switch } from "@/core/components/ui/switch";
import type { AlertRule, DetectionType } from "@/modules/alert/types";

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

export type AlertRuleCardProps = {
  rule: AlertRule;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void | Promise<void>;
  onToggleEnabled: (rule: AlertRule, enabled: boolean) => void | Promise<void>;
};

export const AlertRuleCard = ({
  rule,
  onEdit,
  onDelete,
  onToggleEnabled,
}: AlertRuleCardProps) => {
  const { translate } = useTranslation();
  const style = detectionStyles[rule.detectionType ?? "fire"];

  return (
    <Card
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

            {rule.webhookEnabled && rule.webhookUrl && (
              <div className="mt-2 flex flex-col gap-1 text-xs">
                <span className="text-xs text-muted-foreground">
                  {translate("alert.fields.webhook_url", "Webhook URL")}
                </span>
                <div
                  className="inline-flex w-full items-center rounded-md bg-muted px-2 py-1 text-xs font-mono text-foreground/90"
                  title={rule.webhookUrl}
                >
                  <span className="truncate">{rule.webhookUrl}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: status toggle + actions, aligned like Rule page */}
        <div className="flex flex-col items-stretch self-stretch md:w-48 md:self-center">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {rule.enabled
                ? translate("alert.status.enabled", "Enabled")
                : translate("alert.status.disabled", "Disabled")}
            </span>
            <Switch
              checked={rule.enabled}
              onCheckedChange={(checked) =>
                onToggleEnabled(rule, Boolean(checked))
              }
            />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-auto"
              onClick={() => {
                onEdit(rule.id);
              }}
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
              onConfirm={() => onDelete(rule.id)}
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
        </div>
      </div>

    </Card>
  );
};
