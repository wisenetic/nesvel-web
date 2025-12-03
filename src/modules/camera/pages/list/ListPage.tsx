import { useList, useDeleteMany } from "@refinedev/core";
import { useTranslation } from "@refinedev/core";
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";

import { SmartSkeleton } from "@/core/components/shared/smart-skeleton/smart-skeleton";
import CameraStatus from "@/modules/camera/components/camera-status";
import CameraToolbar from "@/modules/camera/components/camera-toolbar";
import NoCameras from "@/modules/camera/components/empty-states/NoCameras";
import { type ICamera, type IGridSize } from "@/modules/camera/types";

import { CameraListSkeleton } from "./CameraListSkeleton";
import { ListGrid } from "./ListGrid";
import { ListHeader } from "./ListHeader";

export default function ListPage() {
  const [mode, setMode] = useState<"live" | "info">("info");
  const [gridSize, setGridSize] = useState<IGridSize>("3x3");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<ICamera>({
    resource: "cameras",
  });

  const cameras = useMemo(() => result.data ?? [], [result]);

  // derive status & location filter options
  const statusOptions = useMemo(() => {
    const values = [...new Set(cameras.map(c => c.status))];
    return [
      { value: "all", label: translate("camera.filters.all_status") },
      ...values.map(v => ({
        value: v,
        label: translate(`camera.status.${v}`),
      })),
    ];
  }, [cameras, translate]);

  const locationOptions = useMemo(() => {
    const values = [...new Set(cameras.map(c => c.location).filter(Boolean))];
    return [
      { value: "all", label: translate("camera.filters.all_locations") },
      ...values.map(v => ({ value: v, label: v })),
    ];
  }, [cameras, translate]);

  const filteredCameras = useMemo(
    () =>
      cameras.filter(c => {
        const statusOk = statusFilter === "all" || c.status === statusFilter;
        const locationOk =
          locationFilter === "all" || c.location === locationFilter;
        return statusOk && locationOk;
      }),
    [cameras, statusFilter, locationFilter]
  );

  // summary
  const stats = {
    total: cameras.length,
    online: cameras.filter(c => c.status === "online").length,
    offline: cameras.filter(c => c.status === "offline").length,
    recording: cameras.filter(c => c.isRecording).length,
  };

  const selectedOnPage = filteredCameras.filter(c =>
    selectedIds.includes(c.id)
  ).length;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const onView = async (id: string) => {
    await navigate(`/cameras/show/${id}`, {
      state: { background: location }, // 👈 IMPORTANT
    });
  };

  const onCreate = async () => {
    await navigate("/cameras/create", {
      state: { background: location },
    });
  };

  const onEdit = async (id: string) => {
    await navigate(`/cameras/edit/${id}`, {
      state: { background: location },
    });
  };

  const { mutateAsync: deleteMany } = useDeleteMany();

  const onDelete = async (id: string) => {
    await deleteMany({
      resource: "cameras",
      ids: [id],
    });
  };

  const handleDeleteSelected = async () => {
    if (!selectedIds.length) return;
    await deleteMany({
      resource: "cameras",
      ids: selectedIds,
    });
    setSelectedIds([]);
  };

  const onFullscreen = async (id: string) => {};
  const onSnapshot = async (id: string) => {};

  const handleSelectAll = () => {
    const pageIds = filteredCameras.map(c => c.id);
    if (selectedOnPage === filteredCameras.length) {
      // unselect only those on current page
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      // select union of current selection and page ids
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const isLoading = query.isLoading || query.isFetching;

  return (
    <SmartSkeleton
      loading={isLoading}
      ariaLabel={translate("camera.loading", "Loading cameras")}
      skeleton={<CameraListSkeleton />}
    >
      <div className="space-y-6">
        <ListHeader
          selectedIds={selectedIds}
          onAdd={onCreate}
          onDeleteSelected={handleDeleteSelected}
        />

        <CameraToolbar
          mode={mode}
          statusOptions={statusOptions}
          locationOptions={locationOptions}
          onModeChange={setMode}
          gridSize={gridSize}
          statusValue={statusFilter}
          locationValue={locationFilter}
          onStatusChange={setStatusFilter}
          onLocationChange={setLocationFilter}
          filteredCount={filteredCameras.length}
          selectedCount={selectedIds.length}
          totalCount={filteredCameras.length}
          onSelectAll={handleSelectAll}
          cameras={filteredCameras}
          onGridSizeChange={setGridSize}
          selectedIds={selectedIds}
        />
        <CameraStatus stats={stats} />

        {cameras.length === 0 ? (
          <NoCameras onAdd={onCreate} />
        ) : (
          <>
            <ListGrid
              cameras={filteredCameras}
              gridSize={gridSize}
              mode={mode}
              selectedIds={selectedIds}
              onSelect={toggleSelect}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onFullscreen={onFullscreen}
              onSnapshot={onSnapshot}
            />
          </>
        )}
      </div>
    </SmartSkeleton>
  );
}
