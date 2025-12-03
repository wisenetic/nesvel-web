import { Badge } from "@/core/components/ui/badge";
import type { LocationType } from "../types";

const TYPE_LABELS: Record<LocationType, string> = {
  site: "Site",
  building: "Building",
  floor: "Floor",
  zone: "Zone",
};

export function LocationTypeBadge({ type }: { type: LocationType }) {
  const tone =
    type === "site" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" :
    type === "building" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" :
    type === "floor" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" :
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300";

  return (
    <Badge
      variant="outline"
      className={tone + " border-transparent text-[11px] font-medium"}
    >
      {TYPE_LABELS[type]}
    </Badge>
  );
}
