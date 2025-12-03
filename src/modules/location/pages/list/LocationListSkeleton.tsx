import * as React from "react";
import { GenericListSkeleton } from "@/core/components/shared/smart-skeleton/presets/GenericListSkeleton";

export function LocationListSkeleton() {
  return <GenericListSkeleton withFilters={false} rows={8} />;
}
