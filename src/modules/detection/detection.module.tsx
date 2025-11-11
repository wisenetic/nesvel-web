import { TriangleAlert } from "lucide-react";
import type { AppModule } from "@/core/types/app-module.type";
import { DetectionRoutes } from "./detection.routes";

const DetectionResource = {
  name: "detections", // ✅ plural REST resource name
  list: "/detections", // list route
  create: "/detections/create", // create route (optional)
  edit: "/detections/edit/:id", // edit route
  show: "/detections/show/:id", // details route
  meta: {
    label: "Detections",
    icon: <TriangleAlert size={18} />, // lucide-react “AI vision” icon
  },
};

const DetectionModule: AppModule = {
  resource: DetectionResource,
  routes: <DetectionRoutes />,
  priority: 30,
};

export default DetectionModule;
