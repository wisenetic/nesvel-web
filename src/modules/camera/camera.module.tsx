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
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6", // full control
      side: "right",
    },
    create: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[40%]! md:max-w-[40%]! p-6",
      side: "right",
    },
    edit: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6",
      side: "right",
    },
  },
};

export default cameraModule;
