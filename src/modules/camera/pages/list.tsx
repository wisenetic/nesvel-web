import { useState } from "react";
import { useList, HttpError } from "@refinedev/core";

import { CameraGrid } from "@/modules/camera/components/camera-grid";
import { CameraStatusSummary } from "@/modules/camera/components/camera-status-summary";
import { ICamera } from "@/modules/camera/types";
import { Button } from "@/core/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/core/components/shared/page-header";
import CameraToolbar from "../components/camera-toolbar/CameraToolbar";

export default function CameraListPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const { t } = useTranslation();

  const { result, query } = useList<ICamera, HttpError>({
    resource: "cameras",
  });

  if (query.isLoading) return <div>Loading...</div>;

  const cameras = result.data ?? [];

  const stats = {
    total: cameras.length,
    online: cameras.filter((c) => c.status === "online").length,
    offline: cameras.filter((c) => c.status === "offline").length,
    recording: cameras.filter((c) => c.isRecording).length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("camera.list_title")}
        description={t("camera.list_description")}
        rightSlot={
          <Button size="lg">
            <Plus /> {t("camera.add_button")}
          </Button>
        }
      ></PageHeader>
      <CameraToolbar
        viewMode={viewMode}
        onViewChange={setViewMode}
        onSelectAll={() => console.log("Select All clicked")}
      />
      <CameraStatusSummary stats={stats} />
      <CameraGrid cameras={cameras} />
    </div>
  );
}
