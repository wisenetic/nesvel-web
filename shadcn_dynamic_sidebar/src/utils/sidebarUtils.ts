import { SidebarItemConfig, SidebarGroupConfig } from "../types/sidebar";

export function findSidebarItemByHref(groups: SidebarGroupConfig[], href: string): SidebarItemConfig | undefined {
  for (const group of groups) {
    for (const item of group.items) {
      if (item.href === href) return item;
      if (item.children) {
        const found = item.children.find(child => child.href === href);
        if (found) return found;
      }
    }
  }
  return undefined;
}

export function flattenSidebarItems(groups: SidebarGroupConfig[]): SidebarItemConfig[] {
  let result: SidebarItemConfig[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      result.push(item);
      if (item.children) {
        result = result.concat(item.children);
      }
    }
  }
  return result;
}
