import { Button } from "@/core/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/core/components/ui/select";
import { Checkbox } from "@/core/components/ui/checkbox";
import { List, Grid, Filter, Folder } from "lucide-react";
import { useState } from "react";

interface CameraToolbarProps {
  viewMode: "list" | "grid";
  onViewChange: (mode: "list" | "grid") => void;
  onSelectAll?: () => void;
}

export default function CameraToolbar({
  viewMode,
  onViewChange,
  onSelectAll,
}: CameraToolbarProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "recording", label: "Recording" },
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "buildingA", label: "Building A" },
    { value: "buildingB", label: "Building B" },
    { value: "warehouse", label: "Warehouse" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
      {/* Left Side */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Select All */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-sm"
          onClick={onSelectAll}
        >
          <Checkbox id="select-all" />
          <span>Select All</span>
        </Button>

        {/* Status Select */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Select */}
        <div className="flex items-center gap-2">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-44">
              <Folder size={16} className="text-muted-foreground" />
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1">
        <Button
          variant={viewMode === "list" ? "secondary" : "outline"}
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onViewChange("list")}
        >
          <List size={16} />
          <span className="hidden sm:inline">List</span>
        </Button>

        <Button
          variant={viewMode === "grid" ? "secondary" : "outline"}
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onViewChange("grid")}
        >
          <Grid size={16} />
          <span className="hidden sm:inline">Grid</span>
        </Button>
      </div>
    </div>
  );
}
