import type { AppModule } from "@/core/types/app-module.type";

import { RuleRoutes } from "./rule.routes";

const RuleResource = {
  name: "rules",
  list: "/rules",
  create: "/rules/create",
  edit: "/rules/edit/:id",
  show: "/rules/show/:id",
  meta: {
    labelKey: "rule.title",
    icon: "workflow",
  },
};

const RuleModule: AppModule = {
  resource: RuleResource,
  routes: <RuleRoutes />,
  priority: 70,
  presentation: {
    list: "page",
    show: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6",
      side: "right",
    },
    create: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6",
      side: "right",
    },
    edit: {
      view: "drawer",
      className: "w-[100%]! max-w-[100%]! md:w-[60%]! md:max-w-[60%]! p-6",
      side: "right",
    },
  },
};

export default RuleModule;
