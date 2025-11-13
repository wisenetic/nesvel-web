import { useList } from "@refinedev/core";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "@refinedev/core";

import { PageHeader } from "@/core/components/shared/page-header";
import { Button } from "@/core/components/ui/button";
import { CameraCard } from "@/modules/camera/components/camera-card";
import { CameraStatusSummary } from "@/modules/camera/components/camera-status-summary";
import NoCameras from "@/modules/camera/components/empty-states/NoCameras";
import { type ICamera, type IGridSize } from "@/modules/camera/types";

import CameraToolbar from "../components/camera-toolbar/CameraToolbar";

const sizeToCols: Record<IGridSize, number> = {
  "2x2": 2,
  "3x3": 3,
  "4x4": 4,
};

export default function CameraListPage() {
  const [mode, setMode] = useState<"live" | "info">("info");
  const [gridSize, setGridSize] = useState<"2x2" | "3x3" | "4x4">("3x3");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const { translate } = useTranslation();

  const { result, query } = useList<ICamera>({
    resource: "cameras",
  });

  const cameras = useMemo(() => result?.data ?? [], [result]);
  const gridCols = sizeToCols[gridSize];
  const gridLimit = gridCols * gridCols;

  // derive unique options from response
  const statusOptions = useMemo(() => {
    const values = Array.from(new Set(cameras.map((c) => c.status)));
    return [
      { value: "all", label: translate("camera.filters.all_status") },
      ...values.map((v) => ({
        value: v,
        label: translate(`camera.status.${v}` as const),
      })),
    ];
  }, [cameras, translate]);

  const locationOptions = useMemo(() => {
    const values = Array.from(
      new Set(cameras.map((c) => c.location).filter(Boolean) as string[]),
    );
    return [
      { value: "all", label: translate("camera.filters.all_locations") },
      ...values.map((v) => ({ value: v, label: v })),
    ];
  }, [cameras, translate]);

  const filteredCameras = useMemo(
    () =>
      cameras.filter((c) => {
        const statusOk = statusFilter === "all" || c.status === statusFilter;
        const locationOk =
          locationFilter === "all" || c.location === locationFilter;
        return statusOk && locationOk;
      }),
    [cameras, statusFilter, locationFilter],
  );

  // after filters are computed, determine how many tiles are visible
  const visibleCount = filteredCameras.length;

  const stats = {
    total: cameras.length,
    online: cameras.filter((c) => c.status === "online").length,
    offline: cameras.filter((c) => c.status === "offline").length,
    recording: cameras.filter((c) => c.isRecording).length,
  };

  const selectedOnPage = filteredCameras.filter((c) =>
    selectedIds.includes(c.id),
  ).length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const pageIds = filteredCameras.map((c) => c.id);
    if (selectedOnPage === filteredCameras.length) {
      // unselect only those on current page
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      // select union of current selection and page ids
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleDelete = () => {
    console.log("Delete", selectedIds);
    setSelectedIds([]);
  };

  const actionButtons = (
    <div className="flex items-center gap-2">
      {selectedIds.length > 0 && (
        <Button
          variant="destructive"
          size="lg"
          onClick={() => {
            console.log("Delete", selectedIds);
          }}
        >
          <Trash2 /> {translate("camera.delete")} ({selectedIds.length})
        </Button>
      )}
      <Button size="lg" className="rounded-md">
        <Plus /> {translate("camera.add_button")}
      </Button>
    </div>
  );

  if (query.isLoading) return <div>{translate("camera.loading")}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("camera.list_title")}
        description={translate("camera.list_description")}
        rightSlot={actionButtons}
      ></PageHeader>
      <CameraToolbar
        mode={mode}
        onModeChange={setMode}
        onSelectAll={handleSelectAll}
        statusOptions={statusOptions}
        locationOptions={locationOptions}
        statusValue={statusFilter}
        locationValue={locationFilter}
        onStatusChange={setStatusFilter}
        onLocationChange={setLocationFilter}
        totalCount={filteredCameras.length}
        selectedCount={selectedOnPage}
        gridSize={gridSize}
        onGridSizeChange={setGridSize}
      />
      <CameraStatusSummary stats={stats} />

      {cameras.length === 0 ? (
        <NoCameras onAdd={() => console.log("add camera")} />
      ) : (
        <div
          className={`${(() => {
            const col =
              gridSize === "2x2"
                ? "md:grid-cols-2"
                : gridSize === "3x3"
                  ? "md:grid-cols-3"
                  : "md:grid-cols-4";
            return `grid gap-4 grid-cols-1 ${col}`;
          })()}`}
        >
          {filteredCameras.map((camera) => (
            <CameraCard
              key={camera.id}
              camera={camera}
              selected={selectedIds.includes(camera.id)}
              onSelect={toggleSelect}
              mode={mode}
              onFullscreen={(id) => console.log("fullscreen", id)}
              onSnapshot={(id) => console.log("snapshot", id)}
            />
          ))}
          {visibleCount < gridLimit &&
            Array.from({
              length: gridLimit - Math.min(visibleCount, gridLimit),
            }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="aspect-video rounded-md border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground"
              >
                {translate("camera.placeholder.no_camera")}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
