"use client";

import React from "react";
import { ListIcon } from "lucide-react";
import { useTranslation } from "@refinedev/core";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupContent as ShadcnSidebarGroupContent,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarRail as ShadcnSidebarRail,
  useSidebar as useShadcnSidebar,
} from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/utils";
import { useLink, useMenu, type TreeMenuItem } from "@refinedev/core";

import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";

type IconProps = {
  icon: React.ReactNode;
  isSelected?: boolean;
};

const ItemIcon = ({ icon, isSelected }: IconProps) => {
  return (
    <div
      className={cn("w-4", {
        "text-muted-foreground": !isSelected,
        "text-sidebar-primary-foreground": isSelected,
      })}
    >
      {icon ?? <ListIcon />}
    </div>
  );
};
export const Sidebar = () => {
  const { open } = useShadcnSidebar();
  const Link = useLink();
  const { menuItems, selectedKey } = useMenu();
  const { translate } = useTranslation();
  return (
    <ShadcnSidebar collapsible="icon">
      {/* --- Header --- */}
      <SidebarHeader />

      {/* --- Main Sidebar Content --- */}
      <ShadcnSidebarContent>
        <ShadcnSidebarGroup>
          <ShadcnSidebarGroupContent>
            <ShadcnSidebarMenu>
              {menuItems.map((item: TreeMenuItem) => {
                const isSelected = item.key === selectedKey;

                return (
                  <ShadcnSidebarMenuItem key={item.key || item.name}>
                    <ShadcnSidebarMenuButton asChild>
                      <Link
                        to={item.route || ""}
                        className={cn(
                          "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          {
                            "font-semibold bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground":
                              isSelected,
                          },
                        )}
                      >
                        <ItemIcon
                          icon={item.meta?.icon ?? item.icon}
                          isSelected={isSelected}
                        />
                        {open && (
                          <span className="truncate">
                            {translate(getDisplayName(item))}
                          </span>
                        )}
                      </Link>
                    </ShadcnSidebarMenuButton>
                  </ShadcnSidebarMenuItem>
                );
              })}
            </ShadcnSidebarMenu>
          </ShadcnSidebarGroupContent>
        </ShadcnSidebarGroup>
      </ShadcnSidebarContent>

      {/* --- Footer --- */}
      <SidebarFooter />

      {/* --- Sidebar Rail (for icon-only mode) --- */}
      <ShadcnSidebarRail />
    </ShadcnSidebar>
  );
};

// Helper function for display name fallback
const getDisplayName = (item: TreeMenuItem) =>
  item.meta?.labelKey ?? item.label ?? item.name;

Sidebar.displayName = "Sidebar";
