import * as React from "react";
import type { ElementType } from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/core/components/ui/sidebar";
import { cn } from "@/core/lib/utils";

import type { DynamicSidebarStyles } from "./dynamic-sidebar";
import type { SidebarItemConfig } from "../types/sidebar-config.types";

type SidebarItemsRendererProps = {
  items: SidebarItemConfig[];
  zone: "primary" | "secondary" | "footer";
  styles?: DynamicSidebarStyles;
  onNavigate?: (href?: string) => void;
  renderIcon?: (
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    ctx: { itemId: string }
  ) => React.ReactNode;
  renderItemContent?: (ctx: {
    id: string;
    title?: string;
    href?: string;
    isActive: boolean;
    defaultIcon: React.ReactNode;
  }) => React.ReactNode;
  LinkComponent: ElementType;
};

export const SidebarItemsRenderer: React.FC<SidebarItemsRendererProps> = ({
  items,
  zone,
  styles,
  onNavigate,
  renderIcon,
  renderItemContent,
  LinkComponent,
}) => {
  const renderItems = (nodes: SidebarItemConfig[], depth = 0) =>
    nodes.map(item => {
      const isActive = !!item.current;

      if (item.kind === "divider") {
        return <SidebarSeparator key={item.id} />;
      }

      if (item.kind === "label") {
        return (
          <SidebarGroupLabel key={item.id} className={styles?.sectionLabel}>
            {item.title}
          </SidebarGroupLabel>
        );
      }

      const Icon = item.icon;
      const defaultIcon = Icon ? (
        <Icon className={cn("h-4 w-4 mr-2", styles?.icon)} aria-hidden="true" />
      ) : null;

      const content = renderItemContent ? (
        renderItemContent({
          id: item.id,
          title: item.title,
          href: item.href,
          isActive,
          defaultIcon,
        })
      ) : (
        <>
          {Icon &&
            (renderIcon ? renderIcon(Icon, { itemId: item.id }) : defaultIcon)}
          {item.title && <span>{item.title}</span>}
        </>
      );

      const commonButtonClasses = cn(
        "flex items-center px-2 py-1 text-sm rounded-md",
        styles?.item,
        isActive && styles?.itemActive
      );

      const hasChildren = item.children && item.children.length > 0;

      if (item.kind === "section") {
        return (
          <SidebarGroup key={item.id}>
            <SidebarGroupLabel className={styles?.sectionLabel}>
              {item.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.children ? renderItems(item.children, depth + 1) : null}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      }

      if (hasChildren && item.kind === "group") {
        // group / submenu with children
        return (
          <SidebarGroup key={item.id}>
            {item.title && (
              <SidebarGroupLabel className={styles?.sectionLabel}>
                {item.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {renderItems(item.children!, depth + 1)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      }

      if (hasChildren) {
        // Non-group items that still have children become submenu + nested entries.
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={commonButtonClasses}
            >
              <LinkComponent
                to={item.href ?? "#"}
                onClick={() => onNavigate?.(item.href)}
              >
                {content}
              </LinkComponent>
            </SidebarMenuButton>

            <SidebarMenuSub>
              {item.children?.map(child => {
                const childActive = !!child.current;
                const ChildIcon = child.icon;
                const defaultChildIcon = ChildIcon ? (
                  <ChildIcon
                    className={cn("h-4 w-4 mr-2", styles?.icon)}
                    aria-hidden="true"
                  />
                ) : null;

                const childContent = renderItemContent ? (
                  renderItemContent({
                    id: child.id,
                    title: child.title,
                    href: child.href,
                    isActive: childActive,
                    defaultIcon: defaultChildIcon,
                  })
                ) : (
                  <>
                    {ChildIcon &&
                      (renderIcon
                        ? renderIcon(ChildIcon, { itemId: child.id })
                        : defaultChildIcon)}
                    {child.title && <span>{child.title}</span>}
                  </>
                );

                return (
                  <SidebarMenuSubItem key={child.id}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={childActive}
                      className={commonButtonClasses}
                    >
                      <LinkComponent
                        to={child.href ?? "#"}
                        onClick={() => onNavigate?.(child.href)}
                      >
                        {childContent}
                      </LinkComponent>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </SidebarMenuItem>
        );
      }

      // Simple link / action
      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            className={commonButtonClasses}
          >
            <LinkComponent
              to={item.href ?? "#"}
              onClick={() => onNavigate?.(item.href)}
            >
              {content}
            </LinkComponent>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return <SidebarMenu data-zone={zone}>{renderItems(items)}</SidebarMenu>;
};
