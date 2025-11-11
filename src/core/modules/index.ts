import type { AppModule } from "@/core/types/app-module.type";

/**
 * Auto-imports all @.module.tsx files from `src/modules/@/`
 * Each must export an `AppModule` (default export recommended)
 */
const moduleFiles = import.meta.glob<AppModule>("@/modules/*/*.module.tsx", {
  eager: true,
});

/**
 * Extract all modules into an array
 */
const loadedModules: AppModule[] = Object.values(moduleFiles).map((mod: any) =>
  mod.default ? mod.default : Object.values(mod)[0],
);

/**
 * Filter out hidden modules and sort by priority
 */
export const appModules: AppModule[] = loadedModules
  .filter((m) => !m.hidden)
  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));

/**
 * Optional: Grouped modules (for sidebar sections)
 */
export const groupedModules = appModules.reduce((acc, module) => {
  const groupName = module.group || "General";
  if (!acc[groupName]) acc[groupName] = [];
  acc[groupName].push(module);
  return acc;
}, {} as Record<string, AppModule[]>);
