import { Box } from "lucide-react";

import type { AppModule } from "@/core/types/app-module.type";
import { ModelRoutes } from "./model.routes";

const MetricResource = {
  name: "models", // ✅ plural (REST/Refine resource name)
  list: "/models", // list route
  create: "/models/create", // create route
  edit: "/models/edit/:id", // edit route
  show: "/models/show/:id", // details route
  meta: {
    label: "Models", // sidebar label
    icon: <Box size={18} />, // lucide-react icon (AI/ML brain)
  },
};

const MetricModule: AppModule = {
  resource: MetricResource,
  routes: <ModelRoutes />,
  priority: 60,
};

export default MetricModule;
