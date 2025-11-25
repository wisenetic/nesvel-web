import { useTranslation } from "@refinedev/core";
import { Filter } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";

import type { DetectionStatus, DetectionType } from "@/modules/detection/types";

export type DetectionFiltersProps = {
  type: DetectionType | "all";
  status: DetectionStatus | "all";
  onTypeChange: (value: DetectionType | "all") => void;
  onStatusChange: (value: DetectionStatus | "all") => void;
};

export const DetectionFilters = ({
  type,
  status,
  onTypeChange,
  onStatusChange,
}: DetectionFiltersProps) => {
  const { translate } = useTranslation();

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card px-3 py-2 md:flex-row md:items-center md:justify-between md:px-4">
      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
        <Filter className="size-4" />
        <span>
          {translate(
            "detection.filters.label",
            "Filter and narrow down detection events",
          )}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={type}
          onValueChange={(value) => onTypeChange(value as DetectionType | "all")}
        >
          <SelectTrigger className="h-8 min-w-[140px]">
            <SelectValue
              placeholder={translate("detection.filters.all_types", "All Types")}
            />
          </SelectTrigger>
          <SelectContent side="bottom">
            <SelectItem value="all">
              {translate("detection.filters.all_types", "All Types")}
            </SelectItem>
            <SelectItem value="person">
              {translate("detection.types.person", "Person")}
            </SelectItem>
            <SelectItem value="smoke">
              {translate("detection.types.smoke", "Smoke")}
            </SelectItem>
            <SelectItem value="fire">
              {translate("detection.types.fire", "Fire")}
            </SelectItem>
            <SelectItem value="vehicle">
              {translate("detection.types.vehicle", "Vehicle")}
            </SelectItem>
            <SelectItem value="other">
              {translate("detection.types.other", "Other")}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as DetectionStatus | "all")}
        >
          <SelectTrigger className="h-8 min-w-[140px]">
            <SelectValue
              placeholder={translate("detection.filters.all_status", "All Status")}
            />
          </SelectTrigger>
          <SelectContent side="bottom">
            <SelectItem value="all">
              {translate("detection.filters.all_status", "All Status")}
            </SelectItem>
            <SelectItem value="new">
              {translate("detection.status.new", "New")}
            </SelectItem>
            <SelectItem value="acknowledged">
              {translate("detection.status.acknowledged", "Acknowledged")}
            </SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm" onClick={() => {
          onTypeChange("all");
          onStatusChange("all");
        }}>
          {translate("detection.filters.reset", "Reset")}
        </Button>
      </div>
    </div>
  );
};
