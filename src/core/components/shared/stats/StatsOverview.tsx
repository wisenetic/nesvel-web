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
  /** Optional tone used to highlight a stat card (border/background/text). */
  tone?: StatTone;
  /** Optional extra classes for the icon wrapper (e.g. color utilities). */
  iconClassName?: string;
};

const toneClasses: Record<StatTone, string> = {
  default: "border-muted bg-muted/20 text-foreground",
  success:
    "border-emerald-500/60 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-amber-500/60 bg-amber-500/5 text-amber-700 dark:text-amber-300",
  danger: "border-destructive/60 bg-destructive/5 text-destructive",
};

export type StatsOverviewProps = {
  items: StatItem[];
  className?: string;
  /**
   * When true, applies tone-based border/background/text classes.
   * Set to false to keep default card styling even if tones are provided.
   */
  applyToneStyles?: boolean;
  /**
   * When true, icons are rendered inside a circular container.
   * When false, icons are rendered inline without the circle.
   */
  circleIcon?: boolean;
};

export function StatsOverview({
  items,
  className,
  applyToneStyles = true,
  circleIcon = true,
}: StatsOverviewProps) {
  if (!items.length) return null;

  return (
    <div
      className={cn(
        "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => {
        const toneClass =
          applyToneStyles && item.tone ? toneClasses[item.tone] : undefined;

        const iconWrapperClass = circleIcon
          ? cn(
              "ml-3 flex h-10 w-10 items-center justify-center rounded-full",
              item.iconClassName ?? "bg-muted text-muted-foreground",
            )
          : cn("ml-3 text-muted-foreground", item.iconClassName);

        return (
          <Card
            key={index}
            className={cn(
              "border-2 flex flex-row items-center justify-between px-4 py-4 md:px-6 md:py-5",
              toneClass,
            )}
          >
            <CardContent className="p-0 space-y-1">
              <CardDescription className="text-xs md:text-sm">
                {item.label}
              </CardDescription>
              <CardTitle className="text-xl md:text-2xl font-semibold">
                {item.value}
              </CardTitle>
            </CardContent>
            {item.icon && <div className={iconWrapperClass}>{item.icon}</div>}
          </Card>
        );
      })}
    </div>
  );
}

export default StatsOverview;
