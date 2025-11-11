import { Settings } from "lucide-react";
import type { AppModule } from "@/core/types/app-module.type";
import { SettingRoutes } from "./setting.routes";

const SettingResource = {
  name: "settings", // ✅ plural REST resource name
  list: "/settings", // list / management page
  edit: "/settings/edit/:id", // optional edit page
  meta: {
    label: "Settings",
    icon: <Settings size={18} />, // lucide-react system config icon
  },
};

const SettingModule: AppModule = {
  resource: SettingResource,
  routes: <SettingRoutes />,
  priority: 90,
};

export default SettingModule;
