import type { AppModule } from "@/core/types/app-module.type";
import { Video } from "lucide-react";
import { CameraRoutes } from "./camera.routes";

const CameraResource = {
  name: "cameras",
  list: "/cameras",
  create: "/cameras/create",
  edit: "/cameras/edit/:id",
  show: "/cameras/show/:id",
  meta: {
    labelKey: "camera.title",
    icon: <Video size={18} />,
  },
};

const CameraModule: AppModule = {
  resource: CameraResource,
  routes: <CameraRoutes />,
  priority: 20,
};

export default CameraModule;
