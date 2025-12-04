import type { TreeMenuItem } from "@refinedev/core";

import type { SidebarConfig, SidebarItemConfig } from "@/core/components/shared/dynamic-sidebar";

// Map a flat list of TreeMenuItem from Refine into a primary-items SidebarConfig.
// Currently we treat each top-level resource as a simple link; you can
// later extend this to nested groups/sections based on resource meta.
export function mapMenuItemsToSidebarConfig(menuItems: TreeMenuItem[]): SidebarConfig {
  const items: SidebarItemConfig[] = menuItems.map((item) => ({
    id: String(item.key ?? item.name ?? item.route ?? Math.random()),
    kind: "link",
    title: String(item.meta?.labelKey ?? item.label ?? item.name ?? ""),
    href: item.route ?? "",
    // icon: left as undefined here; the layout Sidebar will handle dynamic icons
    meta: {
      icon: item.meta?.icon ?? item.icon ?? null,
    },
  }));

  return {
    items,
  };
}
