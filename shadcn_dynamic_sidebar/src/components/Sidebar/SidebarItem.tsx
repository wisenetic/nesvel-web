import React from "react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarIcon } from "./SidebarIcon";
import { SidebarItemConfig } from "../../types/sidebar";

interface SidebarItemProps {
  item: SidebarItemConfig;
  iconRenderer?: (icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, iconRenderer }) => {
  const { title, href, icon: Icon, current } = item;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={current}>
        <a href={href ?? "#"} className="flex items-center px-2 py-1">
          {Icon && (iconRenderer ? iconRenderer(Icon) : <SidebarIcon icon={Icon} />)}
          <span>{title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
