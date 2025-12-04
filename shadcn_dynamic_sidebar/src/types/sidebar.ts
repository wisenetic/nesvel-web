export interface SidebarItemConfig {
  title: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: SidebarItemConfig[];
  current?: boolean;
}

export interface SidebarGroupConfig {
  label: string;
  items: SidebarItemConfig[];
  collapsible?: boolean;
}
