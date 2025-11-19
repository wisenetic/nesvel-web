import { useTranslation } from "@refinedev/core";
import { List, Grid, Filter, Folder } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/core/components/ui/select";

type Option = { value: string; label: string };

type CameraToolbarProps = {
  mode: "live" | "info";
  statusOptions: Option[];
  locationOptions: Option[];
  statusValue: string;
  locationValue: string;
  totalCount: number;
  selectedCount: number;
  onModeChange: (m: "live" | "info") => void;
  onSelectAll?: () => void;

  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;

  gridSize: "2x2" | "3x3" | "4x4";
  onGridSizeChange: (size: "2x2" | "3x3" | "4x4") => void;
};

export default function CameraToolbar({
  mode,
  statusOptions,
  locationOptions,
  statusValue,
  locationValue,
  totalCount,
  selectedCount,
  gridSize,
  onModeChange,
  onSelectAll,
  onStatusChange,
  onLocationChange,
  onGridSizeChange,
}: CameraToolbarProps) {
  const { translate } = useTranslation();
  const allChecked = totalCount > 0 && selectedCount === totalCount;
  const indeterminate = selectedCount > 0 && selectedCount < totalCount;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-6">
      {/* Left Side */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Select All */}
        <label className="inline-flex items-center gap-2 text-sm select-none">
          <Checkbox
            id="select-all"
            checked={
              allChecked ? true : indeterminate ? "indeterminate" : false
            }
            onCheckedChange={() => onSelectAll?.()}
          />
          <span>{translate("camera.select_all")}</span>
        </label>

        {/* Status Select with icon inside trigger */}
        <div className="relative">
          <Select value={statusValue} onValueChange={onStatusChange}>
            <SelectTrigger className="w-44 pl-8">
              <Filter
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <SelectValue
                placeholder={translate("camera.filters.all_status")}
              />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Select with icon inside trigger */}
        <div className="relative">
          <Select value={locationValue} onValueChange={onLocationChange}>
            <SelectTrigger className="w-44 pl-8">
              <Folder
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <SelectValue
                placeholder={translate("camera.filters.all_locations")}
              />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Grid size always visible */}
        <Select
          value={gridSize}
          onValueChange={(v) => {
            onGridSizeChange(v as CameraToolbarProps["gridSize"]);
          }}
        >
          <SelectTrigger className="w-[88px]">
            <SelectValue
              placeholder={translate("camera.grid.placeholder", {
                defaultValue: "3x3",
              })}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2x2">2x2</SelectItem>
            <SelectItem value="3x3">3x3</SelectItem>
            <SelectItem value="4x4">4x4</SelectItem>
          </SelectContent>
        </Select>
        {/* Mode toggle */}
        <div className="flex items-center gap-1">
          <Button
            variant={mode === "info" ? "secondary" : "outline"}
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              onModeChange("info");
            }}
          >
            <List size={16} />
            <span className="hidden md:inline">
              {translate("camera.mode.info")}
            </span>
          </Button>
          <Button
            variant={mode === "live" ? "secondary" : "outline"}
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              onModeChange("live");
            }}
          >
            <Grid size={16} />
            <span className="hidden md:inline">
              {translate("camera.mode.live")}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
