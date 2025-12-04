import type { AppModule } from "@/core/types/app-module.type";

import { AlertRoutes } from "./alert.routes";

const AlertResource = {
  name: "alerts",
  list: "/alerts",
  create: "/alerts/create",
  edit: "/alerts/edit/:id",
  meta: {
    // Use i18n key for menu label, icon picked from lucide set in sidebar
    labelKey: "alert.title",
    icon: "bell",
  },
};

const AlertModule: AppModule = {
  resource: AlertResource,
  routes: <AlertRoutes />,
  priority: 40,
  presentation: {
    list: "page",
    create: {
      view: "drawer",
      side: "right",
    },
    edit: {
      view: "drawer",
      side: "right",
    },
  },
};

export default AlertModule;
