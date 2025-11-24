import { useShow, useTranslate } from "@refinedev/core";
import { Info } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader } from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import CameraCardLive from "@/modules/camera/components/camera-card/CameraCardLive";

export default function ShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslate();

  const { query } = useShow({
    resource: "cameras",
    id,
  });

  const camera = query.data?.data;

  if (query.isLoading)
    return <div className="p-10">{t("camera.loading", "Loading...")}</div>;
  if (!camera)
    return (
      <div className="p-10">
        {t("camera.show.not_found", "Camera not found")}
      </div>
    );

  const handleClose = () => {
    // If opened from a background route (drawer over list), just go back in history
    if (location.state?.background) {
      void navigate(-1);
      return;
    }

    // If opened directly (no background), go back to the cameras list
    void navigate("/cameras");
  };

  return (
    <div className="space-y-6 pr-2">
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{camera.name}</h2>
        {camera.location && (
          <p className="text-sm text-muted-foreground">{camera.location}</p>
        )}

        <div className="mt-2">
          <Badge
            variant={camera.status === "online" ? "default" : "destructive"}
          >
            {t(`camera.status.${camera.status}` as const, camera.status)}
          </Badge>
        </div>
      </div>

      {/* LIVE Player */}
      <Card>
        <CardContent className="p-0">
          <CameraCardLive
            camera={camera}
            showCheckbox={false}
            showStats={true}
            showBadges={true}
            showHoverActions={true}
            showLocation={true}
            onFullscreen={() => {
              console.log("fullscreen");
            }}
            onSnapshot={() => {
              console.log("snapshot");
            }}
          />
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold flex items-center gap-2">
            <Info size={16} />
            {t("camera.show.details_title", "Camera Details")}
          </h3>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <InfoItem
            label={t("camera.fields.id", "Camera ID")}
            value={camera.id}
          />
          <InfoItem
            label={t("camera.fields.location", "Location")}
            value={camera.location}
          />
          <InfoItem
            label={t("camera.fields.rtsp_url", "RTSP URL")}
            value={camera.streamUrl}
          />
          <InfoItem
            label={t("camera.fields.status", "Status")}
            value={t(`camera.status.${camera.status}` as const, camera.status)}
          />
          <InfoItem
            label={t("camera.fields.resolution", "Resolution")}
            value={camera.resolution}
          />
          <InfoItem
            label={t("camera.fields.last_seen", "Last Seen")}
            value={camera.lastSeen}
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatBox
          label={t("camera.metrics.detections_today", "Detections Today")}
          value={10}
        />
        <StatBox
          label={t("camera.metrics.active_rules", "Active Rules")}
          value={camera.activeRules}
        />
        <StatBox
          label={t("camera.metrics.uptime", "Uptime")}
          value={camera.uptime}
        />
      </div>

      <Separator />

      <Button variant="outline" onClick={handleClose} className="w-full">
        {t("camera.actions.close", "Close")}
      </Button>
    </div>
  );
}

/* -------------------------------------
   Helper Components
------------------------------------- */

const InfoItem = ({ label, value }: { label: string; value: any }) => (
  <div className="flex flex-col">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium break-all">{value ?? "--"}</span>
  </div>
);

const StatBox = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => (
  <Card>
    <CardContent className="p-4 text-center space-y-1">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </CardContent>
  </Card>
);
