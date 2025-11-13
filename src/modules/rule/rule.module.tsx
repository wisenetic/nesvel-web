import type { AppModule } from "@/core/types/app-module.type";

import { RuleRoutes } from "./rule.routes";

const ReportResource = {
  name: "rules", // ✅ plural REST resource name
  list: "/rules", // list route
  create: "/rules/create", // create route
  edit: "/rules/edit/:id", // edit route
  show: "/rules/show/:id", // details route
  meta: {
    label: "Rules",
    icon: "workflow", // lucide-react icon (automation/settings)
  },
};

const RuleModule: AppModule = {
  resource: ReportResource,
  routes: <RuleRoutes />,
  priority: 70,
};

export default RuleModule;
