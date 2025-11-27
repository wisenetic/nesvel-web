import { useRefineOptions } from "@refinedev/core";

import {
  SidebarHeader as ShadcnSidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/utils";

type SidebarHeaderProps = {
  /**
   * Additional classes for the sidebar header container.
   * Use this for borders, padding, background, etc.
   */
  className?: string;
};

export const SidebarHeader = ({ className }: SidebarHeaderProps) => {
  const { title } = useRefineOptions();
  const { open, isMobile } = useSidebar();

  return (
    <ShadcnSidebarHeader
      className={cn(
        "h-16",
        "flex-row",
        "items-center",
        "justify-between",
        "overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "whitespace-nowrap",
          "flex",
          "flex-row",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          {
            "pl-3": !open,
            "pl-5": open,
          }
        )}
      >
        <div>{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-bold",
            "transition-opacity",
            "duration-200",
            {
              "opacity-0": !open,
              "opacity-100": open,
            }
          )}
        >
          {title.text}
        </h2>
      </div>

      <SidebarTrigger
        className={cn("text-muted-foreground", "mr-1.5", {
          "opacity-0": !open,
          "opacity-100": open || isMobile,
          "pointer-events-auto": open || isMobile,
          "pointer-events-none": !open && !isMobile,
        })}
      />
    </ShadcnSidebarHeader>
  );
};
