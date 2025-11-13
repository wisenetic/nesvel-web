import type { AppModule } from "@/core/types/app-module.type";

import { EmployeeRoutes } from "./employee.routes";

const EmployeeResource = {
  name: "employees", // ✅ plural REST resource name
  list: "/employees", // list page route
  create: "/employees/create", // create page
  edit: "/employees/edit/:id", // edit page
  show: "/employees/show/:id", // detail page
  meta: {
    label: "Employees", // sidebar/menu label
    icon: "users", // lucide-react icon
  },
};

const DetectionModule: AppModule = {
  resource: EmployeeResource,
  routes: <EmployeeRoutes />,
  priority: 80,
};

export default DetectionModule;
