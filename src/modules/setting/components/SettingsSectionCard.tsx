import type { ReactNode } from "react";

import { Card } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";

interface SettingsSectionCardProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SettingsSectionCard({
  title,
  description,
  icon,
  children,
  className,
}: SettingsSectionCardProps) {
  return (
    <Card
      className={cn(
        "border border-border/80 bg-card/80 backdrop-blur-sm",
        "shadow-sm",
        "dark:border-border/70",
        className,
      )}
    >
      <div className="flex flex-col gap-4 px-6">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="mt-[2px] text-muted-foreground">{icon}</div>
          )}
          <div className="space-y-1">
            <h2 className="text-sm font-semibold md:text-base">{title}</h2>
            {description && (
              <p className="text-xs text-muted-foreground md:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </Card>
  );
}
