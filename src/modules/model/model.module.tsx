import type { AppModule } from "@/core/types/app-module.type";

import { ModelRoutes } from "./model.routes";

const ModelResource = {
  name: "models",
  list: "/models",
  // We only implement list + show for now; create/edit reserved for future use
  create: "/models/create",
  edit: "/models/edit/:id",
  show: "/models/show/:id",
  meta: {
    labelKey: "model.title",
    icon: "box",
  },
};

const ModelModule: AppModule = {
  resource: ModelResource,
  routes: <ModelRoutes />,
  priority: 60,
  presentation: {
    list: "page",
    show: {
      view: "drawer",
      side: "right",
    },
  },
};

export default ModelModule;
