import { useMemo, useState } from "react";

import { useList, useTranslation } from "@refinedev/core";
import { useLocation, useNavigate } from "react-router";

import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { DataTablePagination } from "@/core/components/shared/data-table/data-table-pagination";
import { Button } from "@/core/components/ui/button";
import { DetectionCard } from "@/modules/detection/components/detection-card";
import { DetectionFilters } from "@/modules/detection/components/detection-filters";
import type { Detection, DetectionStatus, DetectionType } from "@/modules/detection/types";
import { Activity, AlertTriangle, CheckCircle2, Eye } from "lucide-react";

export default function DetectionListPage() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { result, query } = useList<Detection>({
    resource: "detections",
  });

  const [typeFilter, setTypeFilter] = useState<DetectionType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<DetectionStatus | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const detections = useMemo(() => result?.data ?? [], [result]);

  const filteredDetections = useMemo(
    () =>
      detections.filter((d) => {
        const typeOk = typeFilter === "all" || d.type === typeFilter;
        const statusOk = statusFilter === "all" || d.status === statusFilter;
        return typeOk && statusOk;
      }),
    [detections, typeFilter, statusFilter],
  );

  const total = filteredDetections.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(currentPage, pageCount);
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = filteredDetections.slice(startIndex, endIndex);

  const stats = useMemo(() => {
    const totalAll = detections.length;
    const totalNew = detections.filter((d) => d.status === "new").length;
    const totalAck = detections.filter((d) => d.status === "acknowledged").length;
    const critical = detections.filter((d) => d.severity === "critical").length;

    return {
      totalAll,
      totalNew,
      totalAck,
      critical,
    };
  }, [detections]);

  const handleView = async (id: string) => {
    await navigate(`/detections/show/${id}`, {
      state: { background: location },
    });
  };

  const handleAcknowledge = (id: string) => {
    // For now this is UI-only; real implementation would use useUpdate
    // eslint-disable-next-line no-console
    console.log("ack detection", id);
  };

  if (query.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("detection.loading", "Loading detections...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("detection.list_title", "Detections")}
        description={translate(
          "detection.list_description",
          "View and manage all AI detection events.",
        )}
        rightSlot={
          <Button variant="outline" size="sm">
            <Eye className="mr-1 size-4" />
            {translate("detection.actions.view_details", "View Details")}
          </Button>
        }
      />

      <StatsOverview
        items={[
          {
            label: translate("detection.summary.total", "Total Detections"),
            value: stats.totalAll,
            icon: <Activity className="size-5" />,
          },
          {
            label: translate("detection.summary.new", "New"),
            value: stats.totalNew,
            icon: <Activity className="size-5 text-blue-500" />,
            tone: "default",
          },
          {
            label: translate(
              "detection.summary.acknowledged",
              "Acknowledged",
            ),
            value: stats.totalAck,
            icon: <CheckCircle2 className="size-5 text-emerald-500" />,
            tone: "success",
          },
          {
            label: translate("detection.summary.critical", "Critical Alerts"),
            value: stats.critical,
            icon: <AlertTriangle className="size-5 text-destructive" />,
            tone: "danger",
          },
        ]}
      />

      <DetectionFilters
        type={typeFilter}
        status={statusFilter}
        onTypeChange={(value) => {
          setTypeFilter(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-4">
        {pageItems.map((detection) => (
          <DetectionCard
            key={detection.id}
            detection={detection}
            onView={handleView}
            onAcknowledge={handleAcknowledge}
          />
        ))}

        {!pageItems.length && (
          <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
            {translate(
              "detection.empty.description",
              "No detections to display yet. They will appear here when events are detected.",
            )}
          </div>
        )}
      </div>

      <DataTablePagination
        currentPage={current}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
      />
    </div>
  );
}
