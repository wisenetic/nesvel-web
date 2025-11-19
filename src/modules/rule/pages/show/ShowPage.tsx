import { useShow, useTranslate } from "@refinedev/core";
import { useLocation, useNavigate, useParams } from "react-router";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader } from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import type { Rule } from "@/modules/rule/types";

export default function RuleShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslate();

  const { query } = useShow<Rule>({
    resource: "rules",
    id,
  });

  const rule = query.data?.data;

  if (query.isLoading)
    return <div className="p-6">{t("rule.loading", "Loading rules...")}</div>;
  if (!rule)
    return (
      <div className="p-6">{t("rule.show.not_found", "Rule not found")}</div>
    );

  const handleClose = () => {
    if (location.state && (location.state as any).background) {
      navigate(-1);
      return;
    }

    navigate("/rules");
  };

  const severityLabel = t(`rule.severity.${rule.severity}` as const, rule.severity);

  return (
    <div className="space-y-6 pr-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{rule.name}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wide">
            {severityLabel}
          </Badge>
          <Badge variant={rule.enabled ? "default" : "outline"} className="text-xs">
            {rule.enabled
              ? t("rule.status.enabled", "Enabled")
              : t("rule.status.disabled", "Disabled")}
          </Badge>
        </div>
        {rule.description && (
          <p className="text-sm text-muted-foreground">{rule.description}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">
            {t("rule.show.details_title", "Rule Details")}
          </h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <InfoItem
            label={t("rule.fields.camera", "Camera")}
            value={rule.cameraName ?? "-"}
          />
          <InfoItem
            label={t("rule.fields.model", "AI Model")}
            value={rule.modelName ?? "-"}
          />
          <InfoItem
            label={t("rule.fields.priority", "Priority")}
            value={rule.priority ?? "-"}
          />
          <InfoItem
            label={t("rule.fields.conditions", "Conditions")}
            value={`${rule.conditionsCount ?? 0} ${t(
              "rule.conditions.active",
              "active",
            )}`}
          />
        </CardContent>
      </Card>

      <Separator />

      <Button variant="outline" onClick={handleClose} className="w-full">
        {t("rule.actions.close", "Close")}
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
