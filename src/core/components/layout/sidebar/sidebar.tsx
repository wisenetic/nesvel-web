import { useTranslation } from "@refinedev/core";
import { useLink, useMenu, type TreeMenuItem } from "@refinedev/core";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

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
import i18n from "@/core/i18n/i18n";
import { cn } from "@/core/lib/utils";

import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";

type IconProps = {
  // We accept arbitrary icon keys from resources and narrow to IconName internally.
  icon?: string | null;
  isSelected?: boolean;
};

type SidebarProps = {
  /**
   * Optional classes for the root sidebar shell (ShadcnSidebar).
   */
  className?: string;
  /**
   * Base classes applied to every menu link.
   * Use this to control padding, typography, hover behavior, etc.
   */
  menuItemClassName?: string;
  /**
   * Classes applied only to the selected menu item.
   * If omitted, a sensible default highlight style is used.
   */
  selectedMenuItemClassName?: string;
};

const ItemIcon = ({ icon, isSelected }: IconProps) => {
  const resolvedIcon = (icon ?? "list") as IconName;

  return (
    <div
      className={cn("w-4", {
        "text-muted-foreground": !isSelected,
        "text-sidebar-primary-foreground": isSelected,
      })}
    >
      <DynamicIcon name={resolvedIcon} size={18} />
    </div>
  );
};

// Helper function for display name fallback
const getDisplayName = (item: TreeMenuItem): string =>
  String(item.meta?.labelKey ?? item.label ?? item.name ?? "");

const baseMenuItemClasses =
  "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors";
const selectedMenuItemDefaultClasses =
  "font-semibold bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground";

export const Sidebar = ({
  className,
  menuItemClassName,
  selectedMenuItemClassName,
}: SidebarProps) => {
  const { open } = useShadcnSidebar();
  const Link = useLink();
  const { menuItems, selectedKey } = useMenu();
  const { translate } = useTranslation();

  const sidebarSide: "left" | "right" = i18n.dir() === "rtl" ? "right" : "left";

  return (
    <ShadcnSidebar collapsible="icon" side={sidebarSide} className={className}>
      {/* --- Header --- */}
      <SidebarHeader className="p-0 border-b border-border" />

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
                        to={item.route ?? ""}
                        className={cn(
                          baseMenuItemClasses,
                          "hover:bg-accent hover:text-accent-foreground",
                          menuItemClassName,
                          isSelected &&
                            (selectedMenuItemClassName ??
                              selectedMenuItemDefaultClasses)
                        )}
                      >
                        <ItemIcon
                          icon={item.meta?.icon ?? item.icon} //TODO: FIX TYPE ISSUE
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
