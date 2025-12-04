import type { SidebarConfig, SidebarItemConfig } from "../types/sidebar-config.types";

export function flattenSidebarItems(config: SidebarConfig): SidebarItemConfig[] {
  const result: SidebarItemConfig[] = [];

  const walk = (items?: SidebarItemConfig[]) => {
    if (!items) return;
    for (const item of items) {
      if (item.kind !== "divider") {
        result.push(item);
      }
      if (item.children && item.children.length > 0) {
        walk(item.children);
      }
    }
  };

  walk(config.items);
  walk(config.secondaryItems);
  walk(config.footerItems);

  return result;
}

export function findSidebarItemByHref(
  config: SidebarConfig,
  href: string,
): SidebarItemConfig | undefined {
  const all = flattenSidebarItems(config);
  return all.find((item) => item.href === href);
}

export function markCurrentItem(
  config: SidebarConfig,
  currentPath: string,
): SidebarConfig {
  const mark = (items: SidebarItemConfig[] | undefined): SidebarItemConfig[] | undefined => {
    if (!items) return items;

    return items.map((item) => {
      const children = mark(item.children);
      const isLeafMatch = !!item.href && currentPath.startsWith(item.href);
      const hasActiveChild = children?.some((c) => c.current) ?? false;

      return {
        ...item,
        current: isLeafMatch || hasActiveChild,
        children,
      };
    });
  };

  return {
    ...config,
    items: mark(config.items) ?? [],
    secondaryItems: mark(config.secondaryItems),
    footerItems: mark(config.footerItems),
  };
}
