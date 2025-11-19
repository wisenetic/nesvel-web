import { useTranslation } from "@refinedev/core";
import { CircleDot, Video, Wifi, WifiOff } from "lucide-react";

import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import { type ICameraStatusStats } from "@/modules/camera/types";

type CameraStatusProps = {
  stats: ICameraStatusStats;
};

type SummaryKey = keyof ICameraStatusStats;

const summaryItems: {
  key: SummaryKey;
  labelKey: string;
  icon: React.ComponentType<{ size?: number }>;
  iconClassName: string;
}[] = [
  {
    key: "total",
    labelKey: "camera.summary.total",
    icon: Video,
    iconClassName:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  {
    key: "online",
    labelKey: "camera.summary.online",
    icon: Wifi,
    iconClassName:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  {
    key: "offline",
    labelKey: "camera.summary.offline",
    icon: WifiOff,
    iconClassName:
      "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
  {
    key: "recording",
    labelKey: "camera.summary.recording",
    icon: CircleDot,
    iconClassName:
      "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
  },
];

export default function CameraStatus({ stats }: CameraStatusProps) {
  const { translate } = useTranslation();

  const items = summaryItems.map(({ key, labelKey, icon: Icon, iconClassName }) => ({
    label: translate(labelKey),
    value: stats[key] ?? 0,
    icon: <Icon size={24} />,
    iconClassName,
  }));

  return (
    <StatsOverview
      items={items}
      className="mb-6"
      applyToneStyles={false}
      circleIcon
    />
  );
}
