import type { AppModule } from "@/core/types/app-module.type";

import { CameraRoutes } from "./camera.routes";

const cameraModule: AppModule = {
  resource: {
    name: "cameras",
    list: "/cameras",
    show: "/cameras/show/:id",
    create: "/cameras/create",
    edit: "/cameras/edit/:id",
    meta: {
      labelKey: "camera.title",
      icon: "video",
    },
  },
  routes: <CameraRoutes />,
  priority: 20,
  presentation: {
    list: "page",
    show: {
      view: "drawer",
      side: "right",
    },
    create: {
      view: "modal",
      side: "right",
    },
    edit: {
      view: "drawer",
      side: "right",
    },
  },
};

export default cameraModule;
