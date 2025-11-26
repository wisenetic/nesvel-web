import type { AppModule } from "@/core/types/app-module.type";

import { DashboardRoutes } from "./dashboard.routes";

const DashboardResource = {
  name: "dashboard",
  // The main landing page of the app
  list: "/dashboard",
  meta: {
    labelKey: "dashboard.title",
    icon: "layout-dashboard",
  },
};

const DashboardModule: AppModule = {
  resource: DashboardResource,
  routes: <DashboardRoutes />,
  // Keep dashboard at the very top of the sidebar
  priority: 10,
};

export default DashboardModule;
