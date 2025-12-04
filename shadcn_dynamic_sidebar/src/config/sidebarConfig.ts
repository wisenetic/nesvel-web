import { Home, Inbox, Calendar, Folder, Users, Settings } from "lucide-react";
import { SidebarGroupConfig } from "../types/sidebar";

export const sidebarConfig: SidebarGroupConfig[] = [
  {
    label: "Main",
    items: [
      { title: "Home", href: "/", icon: Home },
      { title: "Inbox", href: "/inbox", icon: Inbox },
      { title: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    label: "Projects",
    collapsible: true,
    items: [
      { title: "Project A", href: "/projects/a", icon: Folder },
      { title: "Project B", href: "/projects/b", icon: Folder },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Profile", href: "/profile", icon: Users },
      { title: "Billing", href: "/billing", icon: Settings },
    ],
  },
];
