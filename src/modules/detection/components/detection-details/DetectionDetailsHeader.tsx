import { useState, type ReactNode } from "react";

import { useTranslation } from "@refinedev/core";
import { AlertTriangle, CheckCircle2, Clock3, MapPin, Target, XCircle } from "lucide-react";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";

import type { Detection } from "@/modules/detection/types";

export type DetectionDetailsHeaderProps = {
  detection: Detection;
};

type HeaderStatus = "acknowledged" | "escalate" | "false_positive";

const STATUS_CONFIG: Record<
  HeaderStatus,
  { labelKey: string; fallback: string; icon: ReactNode; variant: "secondary" | "destructive" | "outline" }[]
> = {
  acknowledged: [
    {
      labelKey: "detection.details.status.acknowledged",
      fallback: "Acknowledged",
      icon: <CheckCircle2 className="size-4" />,
      variant: "secondary",
    },
    {
      labelKey: "detection.details.status.escalate",
      fallback: "Escalate",
      icon: <AlertTriangle className="size-4" />,
      variant: "destructive",
    },
    {
      labelKey: "detection.details.status.false_positive",
      fallback: "False Positive",
      icon: <XCircle className="size-4" />,
      variant: "outline",
    },
  ],
  escalate: [
    {
      labelKey: "detection.details.status.acknowledged",
      fallback: "Acknowledged",
      icon: <CheckCircle2 className="size-4" />,
      variant: "outline",
    },
    {
      labelKey: "detection.details.status.escalate",
      fallback: "Escalate",
      icon: <AlertTriangle className="size-4" />,
      variant: "destructive",
    },
    {
      labelKey: "detection.details.status.false_positive",
      fallback: "False Positive",
      icon: <XCircle className="size-4" />,
      variant: "outline",
    },
  ],
  false_positive: [
    {
      labelKey: "detection.details.status.acknowledged",
      fallback: "Acknowledged",
      icon: <CheckCircle2 className="size-4" />,
      variant: "outline",
    },
    {
      labelKey: "detection.details.status.escalate",
      fallback: "Escalate",
      icon: <AlertTriangle className="size-4" />,
      variant: "outline",
    },
    {
      labelKey: "detection.details.status.false_positive",
      fallback: "False Positive",
      icon: <XCircle className="size-4" />,
      variant: "secondary",
    },
  ],
};

export const DetectionDetailsHeader = ({ detection }: DetectionDetailsHeaderProps) => {
  const { translate } = useTranslation();
  const [headerStatus, setHeaderStatus] = useState<HeaderStatus>(
    detection.status === "acknowledged" ? "acknowledged" : "escalate",
  );

  const statusButtons = STATUS_CONFIG[headerStatus];

  return (
    <header className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wide">
            {translate(`detection.type.${detection.type}` as const, detection.type)}
          </Badge>
          <h2 className="text-lg font-semibold md:text-xl">
            {translate("detection.details.title", "Detection Details")}
          </h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            {detection.time}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {statusButtons.map((btn) => (
            <Button
              key={btn.labelKey}
              size="sm"
              variant={btn.variant}
              className="rounded-full px-3"
              onClick={() => {
                if (btn.labelKey.endsWith("acknowledged")) setHeaderStatus("acknowledged");
                if (btn.labelKey.endsWith("escalate")) setHeaderStatus("escalate");
                if (btn.labelKey.endsWith("false_positive")) setHeaderStatus("false_positive");
              }}
            >
              {btn.icon}
              <span className="text-xs md:text-sm">
                {translate(btn.labelKey as any, btn.fallback)}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card className="py-4">
          <CardContent className="flex items-center justify-between gap-3 px-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {translate("detection.details.confidence", "Confidence")}
              </p>
              <p className="text-2xl font-semibold">{detection.confidence}%</p>
              <p className="text-[11px] text-muted-foreground">
                {translate("detection.details.confidence_hint", "High certainty")}
              </p>
            </div>
            <Target className="size-8 text-emerald-500" />
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardContent className="flex items-center justify-between gap-3 px-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {translate("detection.details.location", "Location")}
              </p>
              <p className="text-sm font-semibold">{detection.cameraName}</p>
              <p className="text-[11px] text-muted-foreground">
                {translate("detection.details.location_hint", "Camera source")}
              </p>
            </div>
            <MapPin className="size-8 text-sky-500" />
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardContent className="flex items-center justify-between gap-3 px-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {translate("detection.details.duration", "Duration")}
              </p>
              <p className="text-2xl font-semibold">
                {translate("detection.details.duration_value", "12 seconds")}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {translate("detection.details.duration_hint", "Event duration")}
              </p>
            </div>
            <Clock3 className="size-8 text-indigo-500" />
          </CardContent>
        </Card>
      </div>
    </header>
  );
};
