import { useRefineOptions } from "@refinedev/core";
import type { ReactNode } from "react";

import { SidebarTrigger, useSidebar } from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/utils";

export type HeaderProps = {
  /**
   * Additional classes for the desktop header container.
   * Only layout-related defaults are kept in the component.
   */
  desktopClassName?: string;
  /**
   * Additional classes for the mobile header container.
   * Only layout-related defaults are kept in the component.
   */
  mobileClassName?: string;
  /**
   * Right-side content for the desktop header (e.g. language switcher, theme toggle).
   */
  desktopRightSlot?: ReactNode;
  /**
   * Right-side content for the mobile header (e.g. compact theme toggle).
   */
  mobileRightSlot?: ReactNode;
};

export const Header = ({
  desktopClassName,
  mobileClassName,
  desktopRightSlot,
  mobileRightSlot,
}: HeaderProps) => {
  const { isMobile } = useSidebar();

  return isMobile ? (
    <MobileHeader className={mobileClassName} rightSlot={mobileRightSlot} />
  ) : (
    <DesktopHeader className={desktopClassName} rightSlot={desktopRightSlot} />
  );
};

type DesktopHeaderProps = {
  className?: string;
  rightSlot?: ReactNode;
};

const DesktopHeader = ({ className, rightSlot }: DesktopHeaderProps) => (
  <header
    className={cn(
      "sticky",
      "top-0",
      "flex",
      "h-16",
      "shrink-0",
      "items-center",
      "gap-4",
      "z-40",
      className
    )}
  >
    {rightSlot}
  </header>
);

type MobileHeaderProps = {
  className?: string;
  rightSlot?: ReactNode;
};

const MobileHeader = ({ className, rightSlot }: MobileHeaderProps) => {
  const { open, isMobile } = useSidebar();

  const { title } = useRefineOptions();

  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-12",
        "shrink-0",
        "items-center",
        "gap-2",
        "z-40",
        className
      )}
    >
      <SidebarTrigger
        className={cn("text-muted-foreground", "rotate-180", "ml-1", {
          "opacity-0": open,
          "opacity-100": !open || isMobile,
          "pointer-events-auto": !open || isMobile,
          "pointer-events-none": open && !isMobile,
        })}
      />

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

      {rightSlot}
    </header>
  );
};
