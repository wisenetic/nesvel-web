import React from "react";

interface SidebarIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

export const SidebarIcon: React.FC<SidebarIconProps> = ({ icon: Icon, className }) => {
  return Icon ? (
    <Icon className={`h-4 w-4 mr-2 ${className || ""}`} aria-hidden="true" />
  ) : null;
};
