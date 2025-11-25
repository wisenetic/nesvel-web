import { useTranslation } from "@refinedev/core";
import {
  Activity,
  AlarmSmoke,
  Flame,
  User2,
  CarFront,
} from "lucide-react";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import type { Detection } from "@/modules/detection/types";

export type DetectionCardProps = {
  detection: Detection;
  onView?: (id: string) => void;
  onAcknowledge?: (id: string) => void;
};

const typeStyles: Record<
  Detection["type"],
  { icon: JSX.Element; cardClass: string; badgeClass: string }
> = {
  person: {
    icon: <User2 className="size-4 text-sky-600" />,
    cardClass: "border-l-sky-200",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  smoke: {
    icon: <AlarmSmoke className="size-4 text-amber-600" />,
    cardClass: "border-l-amber-200",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  fire: {
    icon: <Flame className="size-4 text-red-600" />,
    cardClass: "border-l-red-200",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
  },
  vehicle: {
    icon: <CarFront className="size-4 text-violet-600" />,
    cardClass: "border-l-violet-200",
    badgeClass: "bg-violet-50 text-violet-700 border-violet-200",
  },
  other: {
    icon: <Activity className="size-4 text-muted-foreground" />,
    cardClass: "border-l-muted",
    badgeClass: "bg-muted text-foreground border-muted-foreground/20",
  },
};

const statusVariant: Record<Detection["status"], "default" | "outline"> = {
  new: "default",
  acknowledged: "outline",
};

export const DetectionCard = ({ detection, onView, onAcknowledge }: DetectionCardProps) => {
  const { translate } = useTranslation();
  const style = typeStyles[detection.type] ?? typeStyles.other;

  const handleView = () => onView?.(detection.id);
  const handleAck = () => onAcknowledge?.(detection.id);

  return (
    <Card
      className={`flex flex-col gap-3 rounded-xl border border-l-4 px-4 py-4 md:px-6 ${style.cardClass}`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        {/* Left: main info */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {style.icon}
            <h3 className="text-sm font-semibold md:text-base">
              {translate("detection.card.title", "Detection event")}
            </h3>
            <Badge
              variant="outline"
              className={`text-[11px] uppercase tracking-wide ${style.badgeClass}`}
            >
              {detection.classLabel}
            </Badge>
            <Badge
              variant={statusVariant[detection.status]}
              className="text-[11px]"
            >
              {translate(`detection.status.${detection.status}` as const, detection.status)}
            </Badge>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-muted-foreground md:grid-cols-3 md:text-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] md:text-xs">
                {translate("detection.fields.camera", "Camera")}
              </span>
              <span className="text-xs font-medium text-foreground md:text-sm">
                {detection.cameraName}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] md:text-xs">
                {translate("detection.fields.time", "Time")}
              </span>
              <span className="text-xs font-medium text-foreground md:text-sm">
                {detection.time}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] md:text-xs">
                {translate("detection.fields.confidence", "Confidence")}
              </span>
              <span className="text-xs font-medium text-foreground md:text-sm">
                {detection.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex flex-col items-stretch self-stretch md:w-44 md:self-center">
          <Button
            variant="outline"
            size="sm"
            className="w-full md:w-auto"
            onClick={handleView}
          >
            {translate("detection.actions.view_details", "View Details")}
          </Button>

          <Button
            variant={detection.status === "acknowledged" ? "secondary" : "default"}
            size="sm"
            className="mt-2 w-full md:w-auto"
            onClick={handleAck}
          >
            {translate("detection.actions.acknowledge", "Acknowledge")}
          </Button>
        </div>
      </div>
    </Card>
  );
};
