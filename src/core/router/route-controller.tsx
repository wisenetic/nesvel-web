import React from "react";
import { useLocation, useNavigate, matchPath } from "react-router";

import { Dialog, DialogContent } from "@/core/components/ui/dialog";
import { Sheet, SheetContent } from "@/core/components/ui/sheet";
import { appModules } from "@/core/modules";
import { ScrollArea } from "../components/ui/scroll-area";

export const RouteController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background; //New Changes

  for (const mod of appModules) {
    const resource = mod.resource;
    const presentation = mod.presentation ?? {};

    const routeDefs = {
      list: resource.list,
      show: resource.show,
      create: resource.create,
      edit: resource.edit,
    };

    for (const key in routeDefs) {
      const path = routeDefs[key];
      if (!path) continue;

      const match = matchPath(path, location.pathname);
      if (!match) continue;

      const config = presentation[key] ?? "page";

      // Shorthand support: show: "drawer"
      const view = typeof config === "string" ? config : config.view;

      const className =
        typeof config === "object" ? config.className : undefined;

      const side =
        typeof config === "object" && config.side ? config.side : "right";

      // ===== DRAWER =====
      if (view === "drawer") {
        return (
          <Sheet open onOpenChange={() => navigate(-1)}>
            <SheetContent
              side={side}
              className={`${className} overflow-y-auto`}
            >
              {mod.routes}
            </SheetContent>
          </Sheet>
        );
      }

      if (view === "modal") {
        return (
          <Dialog open onOpenChange={() => navigate(-1)}>
            <DialogContent className={className}>{mod.routes}</DialogContent>
          </Dialog>
        );
      }

      return null;
    }
  }

  return null;
};
