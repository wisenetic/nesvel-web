import { useShow, useTranslation } from "@refinedev/core";
import { useLocation, useNavigate, useParams } from "react-router";

import { Button } from "@/core/components/ui/button";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { DetectionDetailsHeader, DetectionDetailsTabs } from "@/modules/detection/components/detection-details";
import type { Detection } from "@/modules/detection/types";

export default function DetectionShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useTranslation();

  const { query } = useShow<Detection>({
    resource: "detections",
    id,
  });

  const detection = query.data?.data;

  const handleClose = () => {
    if (location.state?.background) {
      void navigate(-1);
      return;
    }

    void navigate("/detections");
  };

  if (query.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("detection.details.loading", "Loading detection details...")}
      </div>
    );
  }

  if (!detection) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("detection.details.not_found", "Detection not found.")}
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 pb-6 pr-2">
        <DetectionDetailsHeader detection={detection} />
        <DetectionDetailsTabs detection={detection} />

        <div className="flex justify-end pt-4">
          <Button
            variant="outline"
            className="inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium"
            onClick={handleClose}
          >
            {translate("detection.details.close", "Close")}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
