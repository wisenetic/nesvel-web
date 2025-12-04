import React from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { sidebarConfig } from "../../config/sidebarConfig";
import { SidebarGroup } from "./SidebarGroup";

interface DynamicSidebarProps {
  variant?: "sidebar" | "floating" | "inset";
  side?: "left" | "right";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
  iconRenderer?: (icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => React.ReactNode;
}

export const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  variant = "sidebar",
  side = "left",
  collapsible = "offcanvas",
  className,
  iconRenderer,
}) => {
  return (
    <ShadcnSidebar variant={variant} side={side} collapsible={collapsible} className={className}>
      <SidebarContent>
        {sidebarConfig.map(group => (
          <SidebarGroup
            key={group.label}
            label={group.label}
            items={group.items}
            collapsible={group.collapsible}
            iconRenderer={iconRenderer}
          />
        ))}
      </SidebarContent>
      <SidebarFooter />
    </ShadcnSidebar>
  );
};
