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
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6",
      side: "right",
    },
    edit: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[50%]! md:max-w-[50%]! p-6",
      side: "right",
    },
  },
};

export default AlertModule;
