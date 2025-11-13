import type { AppModule } from "@/core/types/app-module.type";

import { DashboardRoutes } from "./dashboard.routes";

const DashboardResource = {
  name: "dashboard",
  list: "/",
  meta: {
    label: "Dashboard",
    icon: "layout-dashboard",
  },
};

const DashboardModule: AppModule = {
  resource: DashboardResource,
  routes: <DashboardRoutes />,
  priority: 10,
};

export default DashboardModule;
