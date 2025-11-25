import type { ReactNode } from "react";

import { Switch } from "@/core/components/ui/switch";
import { cn } from "@/core/lib/utils";

type SettingsToggleItemProps = {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  className?: string;
};

export function SettingsToggleItem({
  label,
  description,
  checked,
  onCheckedChange,
  className,
}: SettingsToggleItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/60 px-3 py-3 md:px-4 md:py-3",
        "dark:bg-background/40",
        className,
      )}
    >
      <div className="space-y-0.5">
        <p className="text-xs font-medium md:text-sm">{label}</p>
        {description && (
          <p className="text-[11px] text-muted-foreground md:text-xs">
            {description}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={(value) => {
          onCheckedChange(value);
        }}
      />
    </div>
  );
}
