import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/core/components/ui/dropdown-menu";
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
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const statuses = ["All Status", "Online", "Offline", "Recording"];
  const locations = ["All Locations", "Building A", "Building B", "Warehouse"];

  return (
    <div
      className="
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        gap-3 sm:gap-4 mb-6
      "
    >
      {/* Left side: Filters */}
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

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              {statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {statuses.map((s) => (
              <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}>
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Location Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Folder size={16} />
              {locationFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {locations.map((l) => (
              <DropdownMenuItem key={l} onClick={() => setLocationFilter(l)}>
                {l}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side: View toggle */}
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
