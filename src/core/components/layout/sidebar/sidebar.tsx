import { useMenu, useTranslation, type TreeMenuItem } from "@refinedev/core";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import { DynamicSidebar } from "@/core/components/shared/dynamic-sidebar";
import i18n from "@/core/i18n/i18n";

import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";
import { mapMenuItemsToSidebarConfig } from "./sidebar-config-mapper";

export type SidebarProps = {
  className?: string;
};

const resolveIconName = (item: TreeMenuItem): IconName => {
  const iconKey = (item.meta?.icon ?? item.icon ?? "list") as string;
  return iconKey as IconName;
};

export const Sidebar = ({ className }: SidebarProps) => {
  const { menuItems, selectedKey } = useMenu();
  const { translate } = useTranslation();

  const sidebarSide: "left" | "right" = i18n.dir() === "rtl" ? "right" : "left";

  const baseConfig = mapMenuItemsToSidebarConfig(menuItems);

  const items = baseConfig.items.map((item, index) => {
    const src = menuItems[index];
    const labelKeyOrText = String(
      src.meta?.labelKey ?? src.label ?? src.name ?? ""
    );
    const translatedTitle = translate(labelKeyOrText);

    const IconComponent: React.FC<React.SVGProps<SVGSVGElement>> = props => (
      <DynamicIcon name={resolveIconName(src)} {...props} />
    );

    return {
      ...item,
      title: translatedTitle,
      icon: IconComponent,
      current: src.key === selectedKey,
    };
  });

  return (
    <DynamicSidebar
      config={{ items }}
      side={sidebarSide}
      variant="sidebar"
      collapsible="icon"
      className={className}
      styles={{
        // Let the shadcn sidebar button control layout/padding so icons stay centered.
        // We only tweak typography and active state.
        item: "h-12 text-sm font-medium",
        itemActive:
          "font-semibold bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
        icon: "!h-6 !w-6",
      }}
      headerSlot={<SidebarHeader className="p-0 border-b border-border" />}
      footerSlot={<SidebarFooter />}
      renderItemContent={({ title, defaultIcon }) => (
        <>
          {defaultIcon}
          {title && <span className="truncate">{title}</span>}
        </>
      )}
    />
  );
};
