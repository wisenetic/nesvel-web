import { useTranslate } from "@refinedev/core";
import { Video } from "lucide-react";

import { Badge } from "@/core/components/ui/badge";
import { CardAction, CardTitle } from "@/core/components/ui/card";
import { Checkbox } from "@/core/components/ui/checkbox";
import { type CameraStatus } from "@/modules/camera/types";

type CameraHeaderProps = {
  name: string;
  status: CameraStatus;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (checked: boolean) => void;
};

const statusColors: Record<CameraStatus, string> = {
  online: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  offline: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  error: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  recording:
    "bg-violet-100 text-violet-800 dark:bg-violet-800 dark:text-violet-100",
};

export default function CameraHeader({
  name,
  status,
  selectable = true,
  selected = false,
  onToggleSelect,
}: CameraHeaderProps) {
  const translate = useTranslate();
  return (
    <>
      <CardTitle>
        <div className="flex gap-2 items-center">
          {selectable ? (
            <Checkbox
              checked={selected}
              onCheckedChange={(v) => onToggleSelect?.(Boolean(v))}
              aria-label={translate("camera.select_camera")}
            />
          ) : null}
          <Video />
          {name}
        </div>
      </CardTitle>
      <CardAction>
        <Badge className={` rounded-full ${statusColors[status]}`}>
          {status}
        </Badge>
      </CardAction>
    </>
  );
}
