import { Bell } from "lucide-react";
import type { AppModule } from "@/core/types/app-module.type";
import { AlertRoutes } from "./alert.routes";

const AlertResource = {
  name: "alerts", // ✅ plural REST/Refine resource name
  list: "/alerts", // list route
  create: "/alerts/create", // create route
  edit: "/alerts/edit/:id", // edit route
  show: "/alerts/show/:id", // detail route
  meta: {
    label: "Alerts",
    icon: <Bell size={18} />, // lucide-react icon for alerts
  },
};

const AlertModule: AppModule = {
  resource: AlertResource,
  routes: <AlertRoutes />,
  priority: 40, // 👈 lower = higher priority in sidebar
};

export default AlertModule;
