import { Home, Inbox, Calendar, Folder, Settings, Users } from "lucide-react";

import type { SidebarConfig } from "../types/sidebar-config.types";

export const exampleSidebarConfig: SidebarConfig = {
  items: [
    {
      id: "main-section",
      kind: "section",
      label: "Main",
      children: [
        { id: "home", kind: "link", title: "Home", href: "/", icon: Home },
        { id: "inbox", kind: "link", title: "Inbox", href: "/inbox", icon: Inbox },
        {
          id: "calendar-group",
          kind: "group",
          title: "Calendar",
          collapsible: true,
          defaultOpen: true,
          children: [
            {
              id: "calendar-overview",
              kind: "link",
              title: "Overview",
              href: "/calendar",
              icon: Calendar,
            },
            {
              id: "calendar-team",
              kind: "link",
              title: "Team",
              href: "/calendar/team",
              icon: Users,
            },
          ],
        },
      ],
    },
    {
      id: "projects-section",
      kind: "section",
      label: "Projects",
      children: [
        {
          id: "project-a",
          kind: "link",
          title: "Project A",
          href: "/projects/a",
          icon: Folder,
        },
        {
          id: "project-b",
          kind: "link",
          title: "Project B",
          href: "/projects/b",
          icon: Folder,
        },
      ],
    },
  ],
  secondaryItems: [
    {
      id: "settings",
      kind: "link",
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ],
  footerItems: [
    {
      id: "profile",
      kind: "action",
      title: "Profile",
      href: "/profile",
      icon: Users,
    },
  ],
};
