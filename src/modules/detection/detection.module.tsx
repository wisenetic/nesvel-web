import type { AppModule } from "@/core/types/app-module.type";

import { DetectionRoutes } from "./detection.routes";

const DetectionResource = {
  name: "detections",
  list: "/detections",
  show: "/detections/show/:id",
  meta: {
    labelKey: "detection.title",
    icon: "activity",
  },
};

const DetectionModule: AppModule = {
  resource: DetectionResource,
  routes: <DetectionRoutes />,
  priority: 30,
  presentation: {
    list: "page",
    show: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6",
      side: "right",
    },
  },
};

export default DetectionModule;
