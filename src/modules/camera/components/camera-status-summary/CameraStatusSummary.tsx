import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ICameraStatusSummaryStats } from "@/modules/camera/types";
import { Video, Wifi, WifiOff, CircleDot } from "lucide-react";
import { useTranslation } from "@refinedev/core";

interface CameraStatusSummaryProps {
  stats: ICameraStatusSummaryStats;
}

const summaryItems = [
  {
    key: "total",
    labelKey: "camera.summary.total",
    icon: Video,
    light: "bg-gray-100 text-gray-700",
    dark: "dark:bg-gray-800 dark:text-gray-300",
    title: "text-gray-700 dark:text-gray-400",
  },
  {
    key: "online",
    labelKey: "camera.summary.online",
    icon: Wifi,
    light: "bg-green-100 text-green-700",
    dark: "dark:bg-green-900 dark:text-green-300",
    title: "text-green-700 dark:text-green-400",
  },
  {
    key: "offline",
    labelKey: "camera.summary.offline",
    icon: WifiOff,
    light: "bg-red-100 text-red-700",
    dark: "dark:bg-red-900 dark:text-red-300",
    title: "text-red-700 dark:text-red-400",
  },
  {
    key: "recording",
    labelKey: "camera.summary.recording",
    icon: CircleDot,
    light: "bg-violet-100 text-violet-700",
    dark: "dark:bg-violet-900 dark:text-violet-300",
    title: "text-violet-700 dark:text-violet-400",
  },
];

export default function CameraStatusSummary({
  stats,
}: CameraStatusSummaryProps) {
  const { translate } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {summaryItems.map(({ key, labelKey, icon: Icon, light, dark, title }) => (
        <div
          key={key}
          // className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
        >
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>
                {labelKey ? translate(labelKey) : null}
              </CardDescription>
              <CardTitle
                className={`text-2xl font-semibold tabular-nums md:card:text-3xl ${title}`}
              >
                {stats[key as keyof ICameraStatusSummaryStats] ?? 0}
              </CardTitle>
              <CardAction>
                <div className={`p-4 rounded-full ${light} ${dark}`}>
                  <Icon size={24} />
                </div>
              </CardAction>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
