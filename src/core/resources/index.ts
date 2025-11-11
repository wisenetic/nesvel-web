import type { IResourceItem } from "@refinedev/core";
import { appModules } from "../modules";

export const appResources: IResourceItem[] = appModules.map(
  (mod) => mod.resource,
);
