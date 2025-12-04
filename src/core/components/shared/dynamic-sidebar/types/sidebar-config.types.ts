import type React from "react";

export type SidebarItemKind =
  | "link"
  | "group"
  | "section"
  | "divider"
  | "label"
  | "action";

export interface SidebarItemBase {
  id: string;
  title?: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: SidebarItemConfig[];
  current?: boolean;
  disabled?: boolean;
  badge?: string | number;
  /**
   * For group/section or nested items, controls collapsible behavior.
   */
  collapsible?: boolean;
  defaultOpen?: boolean;
  meta?: Record<string, unknown>;
}

export interface SidebarLinkItem extends SidebarItemBase {
  kind: "link" | "action";
}

export interface SidebarGroupItem extends SidebarItemBase {
  kind: "group";
}

export interface SidebarSectionItem extends SidebarItemBase {
  kind: "section";
  label: string;
}

export interface SidebarDividerItem {
  kind: "divider";
  id: string;
}

export interface SidebarLabelItem extends SidebarItemBase {
  kind: "label";
}

export type SidebarItemConfig =
  | SidebarLinkItem
  | SidebarGroupItem
  | SidebarSectionItem
  | SidebarDividerItem
  | SidebarLabelItem;

export interface SidebarConfig {
  items: SidebarItemConfig[];
  secondaryItems?: SidebarItemConfig[];
  footerItems?: SidebarItemConfig[];
}
