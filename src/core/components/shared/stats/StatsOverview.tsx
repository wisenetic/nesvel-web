import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";

export type StatTone = "default" | "success" | "warning" | "danger";

export type StatItem = {
  label: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  tone?: StatTone;
};

const toneClasses: Record<StatTone, string> = {
  default:
    "border-muted bg-muted/20 text-foreground",
  success:
    "border-emerald-500/60 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-amber-500/60 bg-amber-500/5 text-amber-700 dark:text-amber-300",
  danger:
    "border-destructive/60 bg-destructive/5 text-destructive",
};

export type StatsOverviewProps = {
  items: StatItem[];
  className?: string;
};

export function StatsOverview({ items, className }: StatsOverviewProps) {
  if (!items?.length) return null;

  return (
    <div
      className={cn(
        "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => {
        const tone = item.tone ?? "default";
        const toneClass = toneClasses[tone];

        return (
          <Card
            key={index}
            className={cn(
              "border-2 flex flex-row items-center justify-between px-4 py-4 sm:px-6 sm:py-5",
              toneClass,
            )}
          >
            <CardContent className="p-0 space-y-1">
              <CardDescription className="text-xs sm:text-sm">
                {item.label}
              </CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-semibold">
                {item.value}
              </CardTitle>
            </CardContent>
            {item.icon && <div className="ml-3 text-muted-foreground">{item.icon}</div>}
          </Card>
        );
      })}
    </div>
  );
}

export default StatsOverview;
