import { Activity } from "lucide-react";
import type { AppModule } from "@/core/types/app-module.type";
import { MetricRoutes } from "./metric.routes";

const MetricResource = {
  name: "metrics", // ✅ plural REST resource name
  list: "/metrics", // list page route
  create: "/metrics/create", // create page
  edit: "/metrics/edit/:id", // edit page
  show: "/metrics/show/:id", // detail page
  meta: {
    label: "Metrics", // sidebar label
    icon: <Activity size={18} />, // lucide-react chart icon
  },
};

const MetricModule: AppModule = {
  resource: MetricResource,
  routes: <MetricRoutes />,
  priority: 50,
};

export default MetricModule;
