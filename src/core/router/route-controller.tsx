import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, matchPath } from "react-router";
import { appModules } from "@/core/modules";

import { Sheet, SheetContent } from "@/core/components/ui/sheet";
import { Dialog, DialogContent } from "@/core/components/ui/dialog";

export const RouteController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hasBackground = !!location.state?.background;
  if (!hasBackground) return null; // 🚀 KEY FIX: prevent drawer on direct navigation

  const [isOpen, setIsOpen] = useState(true);
  const [pendingNavigate, setPendingNavigate] = useState(false);

  useEffect(() => {
    if (!isOpen && pendingNavigate) {
      const timer = setTimeout(() => navigate(-1), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, pendingNavigate, navigate]);

  for (const mod of appModules) {
    const resource = mod.resource;
    const pres = mod.presentation ?? {};

    const routeDefs = {
      list: resource.list,
      show: resource.show,
      edit: resource.edit,
      create: resource.create,
    };

    for (const key in routeDefs) {
      const path = routeDefs[key];
      if (!path) continue;

      const match = matchPath(path, location.pathname);
      if (!match) continue;

      const view = pres[key] ?? "page";

      if (view === "drawer") {
        return (
          <Sheet
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) setPendingNavigate(true);
            }}
          >
            <SheetContent side="right" className="w-[600px] p-0">
              {mod.routes}
            </SheetContent>
          </Sheet>
        );
      }

      if (view === "modal") {
        return (
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) setPendingNavigate(true);
            }}
          >
            <DialogContent className="p-0 max-w-3xl">
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
