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
      className: "w-[100%]! max-w-[100%]! md:w-[50%]! md:max-w-[50%]! p-6",
      side: "right",
    },
    create: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[40%]! md:max-w-[40%]! p-6",
      side: "right",
    },
    edit: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[40%]! md:max-w-[40%]! p-6",
      side: "right",
    },
  },
};

export default EmployeeModule;
