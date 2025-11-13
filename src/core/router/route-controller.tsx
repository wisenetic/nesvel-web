import React from "react";
import { useLocation, useNavigate, matchPath } from "react-router";

import { Dialog, DialogContent } from "@/core/components/ui/dialog";
import { Sheet, SheetContent } from "@/core/components/ui/sheet";
import { appModules } from "@/core/modules";

export const RouteController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  for (const mod of appModules) {
    const resource = mod.resource;
    const pres = mod.presentation ?? {};

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

      const view = pres[key] ?? "page";

      if (view === "drawer") {
        return (
          <Sheet open onOpenChange={() => navigate(-1)}>
            <SheetContent
              side="right"
              className="w-[600px] p-0 overflow-y-auto"
            >
              {mod.routes}
            </SheetContent>
          </Sheet>
        );
      }

      if (view === "modal") {
        return (
          <Dialog open onOpenChange={() => navigate(-1)}>
            <DialogContent className="p-0 max-w-3xl w-full overflow-y-auto">
              {mod.routes}
            </DialogContent>
          </Dialog>
        );
      }

      return null;
    }
  }

  return null;
};
