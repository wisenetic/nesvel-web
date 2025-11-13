import type { AppModule } from "@/core/types/app-module.type";

import { ReportRoutes } from "./report.routes";

const ReportResource = {
  name: "reports", // ✅ plural REST resource name
  list: "/reports", // list page route
  create: "/reports/create", // create page route
  edit: "/reports/edit/:id", // edit page route
  show: "/reports/show/:id", // details page route
  meta: {
    label: "Reports", // sidebar label
    icon: "file-text", // lucide-react icon for reports
  },
};

const ReportModule: AppModule = {
  resource: ReportResource,
  routes: <ReportRoutes />,
  priority: 60,
};

export default ReportModule;
