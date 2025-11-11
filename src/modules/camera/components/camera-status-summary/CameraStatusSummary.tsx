import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ICameraStatusSummaryStats } from "@/modules/camera/types";
import { Video, Wifi, WifiOff, CircleDot } from "lucide-react";

interface CameraStatusSummaryProps {
  stats: ICameraStatusSummaryStats;
}

const summaryItems = [
  {
    key: "total",
    label: "Total Cameras",
    icon: Video,
    light: "bg-gray-100 text-gray-700",
    dark: "dark:bg-gray-800 dark:text-gray-300",
    title: "text-gray-700 dark:text-gray-400",
  },
  {
    key: "online",
    label: "Online",
    icon: Wifi,
    light: "bg-green-100 text-green-700",
    dark: "dark:bg-green-900 dark:text-green-300",
    title: "text-green-700 dark:text-green-400",
  },
  {
    key: "offline",
    label: "Offline/Error",
    icon: WifiOff,
    light: "bg-red-100 text-red-700",
    dark: "dark:bg-red-900 dark:text-red-300",
    title: "text-red-700 dark:text-red-400",
  },
  {
    key: "recording",
    label: "Recording",
    icon: CircleDot,
    light: "bg-violet-100 text-violet-700",
    dark: "dark:bg-violet-900 dark:text-violet-300",
    title: "text-violet-700 dark:text-violet-400",
  },
];

export default function CameraStatusSummary({
  stats,
}: CameraStatusSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {summaryItems.map(({ key, label, icon: Icon, light, dark, title }) => (
        <div
          key={key}
          // className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
        >
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
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
