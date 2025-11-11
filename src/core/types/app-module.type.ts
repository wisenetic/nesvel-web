/**
 * src/core/types/app-module.type.ts
 * -------------------------------------------------------------
 * Defines the structure of every feature module in the app.
 * Enforces a consistent contract across Refine + Router modules.
 */

import type { IResourceItem } from "@refinedev/core";
import type { JSX } from "react";

export interface AppModule {
  /** Refine resource definition (name, routes, icon, etc.) */
  resource: IResourceItem;

  /** React route tree (e.g., <Routes> or single <Route> component) */
  routes: JSX.Element;

  /** Optional order or priority — lower = higher priority */
  priority?: number;

  /** Optional grouping label for sidebar or menus */
  group?: string;

  /** Hide from navigation if true */
  hidden?: boolean;
}
