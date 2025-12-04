import type { AppModule } from "@/core/types/app-module.type";

import { EmployeeRoutes } from "./employee.routes";

const EmployeeResource = {
  name: "employees",
  list: "/employees",
  create: "/employees/create",
  edit: "/employees/edit/:id",
  show: "/employees/show/:id",
  meta: {
    labelKey: "employee.title",
    icon: "users",
  },
};

const EmployeeModule: AppModule = {
  resource: EmployeeResource,
  routes: <EmployeeRoutes />,
  priority: 80,
  presentation: {
    list: "page",
    show: {
      view: "drawer",
      side: "right",
    },
    create: {
      view: "drawer",
      side: "right",
    },
    edit: {
      view: "drawer",
      side: "right",
    },
  },
};

export default EmployeeModule;
