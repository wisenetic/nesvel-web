import React from "react";
import {
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarGroupConfig } from "../../types/sidebar";
import { SidebarItem } from "./SidebarItem";
import { SidebarIcon } from "./SidebarIcon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarGroupProps extends SidebarGroupConfig {
  iconRenderer?: (icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => React.ReactNode;
  className?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  items,
  collapsible = false,
  iconRenderer,
  className,
}) => {
  const itemsWithChildren = items.filter(i => i.children && i.children.length > 0);
  const itemsWithoutChildren = items.filter(i => !i.children || i.children.length === 0);

  const content = (
    <SidebarGroupContent>
      <SidebarMenu>
        {itemsWithoutChildren.map(item => (
          <SidebarItem key={item.title} item={item} iconRenderer={iconRenderer} />
        ))}
        {itemsWithChildren.map(item => (
          <Collapsible key={item.title} defaultOpen>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <a href={item.href ?? "#"} className="flex items-center px-2 py-1">
                    {item.icon && (iconRenderer ? iconRenderer(item.icon) : <SidebarIcon icon={item.icon} />)}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu>
                  {item.children?.map(child => (
                    <SidebarItem key={child.title} item={child} iconRenderer={iconRenderer} />
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );

  return (
    <ShadcnSidebarGroup className={className}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      {collapsible ? <Collapsible defaultOpen>{content}</Collapsible> : content}
    </ShadcnSidebarGroup>
  );
};
