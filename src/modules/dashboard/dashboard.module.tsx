import type { AppModule } from "@/core/types/app-module.type";
import { LayoutDashboard } from "lucide-react";
import { DashboardRoutes } from "./dashboard.routes";

const DashboardResource = {
  name: "dashboard",
  list: "/",
  meta: {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
};

const DashboardModule: AppModule = {
  resource: DashboardResource,
  routes: <DashboardRoutes />,
  priority: 10,
};

export default DashboardModule;
