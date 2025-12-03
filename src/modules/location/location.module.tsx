import type { AppModule } from "@/core/types/app-module.type";

import { LocationRoutes } from "./location.routes";

const LocationModule: AppModule = {
  resource: {
    name: "locations",
    list: "/locations",
    meta: {
      labelKey: "location.title",
      icon: "map-pin",
    },
  },
  routes: <LocationRoutes />,
  priority: 40,
  presentation: {
    list: "page",
  },
};

export default LocationModule;
