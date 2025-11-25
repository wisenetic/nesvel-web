import type { AppModule } from "@/core/types/app-module.type";

import { SettingRoutes } from "./setting.routes";

const SettingResource = {
  name: "settings",
  list: "/settings",
  meta: {
    labelKey: "setting.title",
    icon: "settings",
  },
};

const SettingModule: AppModule = {
  resource: SettingResource,
  routes: <SettingRoutes />,
  priority: 90,
};

export default SettingModule;
