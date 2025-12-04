import * as React from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
} from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/utils";

import { SidebarItemsRenderer } from "./sidebar-items-renderer";
import type { SidebarConfig } from "../types/sidebar-config.types";
import { markCurrentItem } from "../utils/sidebar-utils";

export type DynamicSidebarStyles = {
  root?: string;
  content?: string;
  sectionLabel?: string;
  item?: string;
  itemActive?: string;
  icon?: string;
  iconOnlyWidth?: string;
  footer?: string;
  secondary?: string;
};

export type DynamicSidebarProps = {
  config: SidebarConfig;
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
  styles?: DynamicSidebarStyles;
  currentPath?: string;
  onNavigate?: (href: string) => void;
  /**
   * Optional custom header and footer slots rendered inside the sidebar shell.
   * Useful for logo/title header and user menu footer.
   */
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  renderIcon?: (
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    ctx: { itemId: string }
  ) => React.ReactNode;
  renderItemContent?: (ctx: {
    id: string;
    title?: string;
    href?: string;
    isActive: boolean;
    defaultIcon: React.ReactNode;
  }) => React.ReactNode;
};

export const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  config,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  styles,
  currentPath,
  onNavigate,
  headerSlot,
  footerSlot,
  renderIcon,
  renderItemContent,
}) => {
  const location = useLocation();

  const effectivePath = currentPath ?? location.pathname;
  const computedConfig = React.useMemo(
    () => markCurrentItem(config, effectivePath),
    [config, effectivePath]
  );

  const handleNavigate = React.useCallback(
    (href?: string) => {
      if (!href) return;
      if (onNavigate) {
        onNavigate(href);
      }
    },
    [onNavigate]
  );

  return (
    <ShadcnSidebar
      side={side}
      variant={variant}
      collapsible={collapsible}
      className={cn(styles?.root, className)}
    >
      {headerSlot}

      <SidebarContent className={styles?.content}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarItemsRenderer
              items={computedConfig.items}
              zone="primary"
              styles={styles}
              onNavigate={handleNavigate}
              renderIcon={renderIcon}
              renderItemContent={renderItemContent}
              LinkComponent={RouterLink}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        {computedConfig.secondaryItems &&
          computedConfig.secondaryItems.length > 0 && (
            <div className={cn("mt-4", styles?.secondary)}>
              <SidebarItemsRenderer
                items={computedConfig.secondaryItems}
                zone="secondary"
                styles={styles}
                onNavigate={handleNavigate}
                renderIcon={renderIcon}
                renderItemContent={renderItemContent}
                LinkComponent={RouterLink}
              />
            </div>
          )}
      </SidebarContent>

      {footerSlot ??
        (computedConfig.footerItems &&
          computedConfig.footerItems.length > 0 && (
            <SidebarFooter className={styles?.footer}>
              <SidebarItemsRenderer
                items={computedConfig.footerItems}
                zone="footer"
                styles={styles}
                onNavigate={handleNavigate}
                renderIcon={renderIcon}
                renderItemContent={renderItemContent}
                LinkComponent={RouterLink}
              />
            </SidebarFooter>
          ))}
    </ShadcnSidebar>
  );
};
