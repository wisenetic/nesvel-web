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
      view: "modal",
      className: "max-w-2xl p-0 bg-white rounded-xl",
    },
    edit: {
      view: "modal",
      className: "max-w-2xl p-0 bg-white rounded-xl",
    },
  },
};

export default AlertModule;
