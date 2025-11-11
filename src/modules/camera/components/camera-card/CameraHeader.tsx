import { Video } from "lucide-react";

import { Badge } from "@/core/components/ui/badge";
import {
  CardAction,
  CardDescription,
  CardTitle,
} from "@/core/components/ui/card";
import { CameraStatus } from "@/modules/camera/types";

interface CameraHeaderProps {
  name: string;
  location?: string;
  status: CameraStatus;
}

const statusColors: Record<CameraStatus, string> = {
  online: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  offline: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  error: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  recording:
    "bg-violet-100 text-violet-800 dark:bg-violet-800 dark:text-violet-100",
};

export default function CameraHeader({
  name,
  location,
  status,
}: CameraHeaderProps) {
  return (
    <>
      <CardTitle>
        <div className="flex gap-2 items-center">
          <Video />
          {name}
        </div>
      </CardTitle>
      <CardDescription>{location}</CardDescription>
      <CardAction>
        <Badge className={` rounded-full ${statusColors[status]}`}>
          {status}
        </Badge>
      </CardAction>
    </>
  );
}
