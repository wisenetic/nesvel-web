import type { AppModule } from "@/core/types/app-module.type";

/**
 * Auto-import module definition files (*.module.tsx)
 */
const moduleFiles = import.meta.glob<AppModule>("@/modules/*/*.module.tsx", {
  eager: true,
});

/**
 * Convert module exports to array
 */
const loadedModules: AppModule[] = Object.values(moduleFiles).map((mod: any) =>
  mod.default ? mod.default : Object.values(mod)[0],
);

/**
 * Filter + Sort
 */
export const appModules: AppModule[] = loadedModules
  .filter((m) => !m.hidden)
  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));

/**
 * Optional grouping
 */
export const groupedModules = appModules.reduce(
  (acc, module) => {
    const groupName = module.group || "General";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(module);
    return acc;
  },
  {} as Record<string, AppModule[]>,
);
