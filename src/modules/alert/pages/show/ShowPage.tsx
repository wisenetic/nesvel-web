import { useShow, useTranslate } from "@refinedev/core";
import { useParams, useNavigate, useLocation } from "react-router";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader } from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import type { AlertRule } from "@/modules/alert/types";

export default function AlertShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslate();

  const { query } = useShow<AlertRule>({
    resource: "alerts",
    id,
  });

  const rule = query.data?.data;

  if (query.isLoading)
    return <div className="p-6">{t("alert.loading", "Loading alerts...")}</div>;
  if (!rule)
    return (
      <div className="p-6">
        {t("alert.show.not_found", "Alert rule not found")}
      </div>
    );

  const handleClose = () => {
    if (location.state && (location.state as any).background) {
      navigate(-1);
      return;
    }

    navigate("/alerts");
  };

  return (
    <div className="space-y-6 pr-2">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{rule.name}</h2>
        <div className="mt-2 flex gap-2">
          <Badge variant="outline">
            {t(`alert.detectionType.${rule.detectionType}` as const, rule.detectionType)}
          </Badge>
          <Badge variant={rule.enabled ? "default" : "secondary"}>
            {rule.enabled
              ? t("alert.status.enabled", "Enabled")
              : t("alert.status.disabled", "Disabled")}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">
            {t("alert.show.details_title", "Alert Rule Details")}
          </h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <InfoItem
            label={t("alert.fields.name", "Rule Name")}
            value={rule.name}
          />
          <InfoItem
            label={t("alert.fields.detection_type", "Detection Type")}
            value={t(
              `alert.detectionType.${rule.detectionType}` as const,
              rule.detectionType,
            )}
          />
          <InfoItem
            label={t("alert.fields.min_confidence", "Minimum Confidence")}
            value={`${rule.minConfidence ?? 70}%`}
          />
          <InfoItem
            label={t("alert.fields.email_notifications", "Email Notifications")}
            value={rule.emailEnabled ? "On" : "Off"}
          />
          <InfoItem
            label={t(
              "alert.fields.webhook_notifications",
              "Webhook Notifications",
            )}
            value={rule.webhookEnabled ? "On" : "Off"}
          />
          <InfoItem
            label={t("alert.fields.webhook_url", "Webhook URL")}
            value={rule.webhookUrl || "--"}
          />
        </CardContent>
      </Card>

      <Separator />

      <Button variant="outline" onClick={handleClose} className="w-full">
        {t("alert.actions.close", "Close")}
      </Button>
    </div>
  );
}

const InfoItem = ({ label, value }: { label: string; value: any }) => (
  <div className="flex flex-col">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium break-all">{value ?? "--"}</span>
  </div>
);
