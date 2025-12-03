import * as React from "react";
import { Skeleton } from "@/core/components/ui/skeleton";

type GenericListSkeletonProps = {
  withFilters?: boolean;
  withHeaderActions?: boolean;
  rows?: number;
};

export function GenericListSkeleton({
  withFilters = true,
  withHeaderActions = true,
  rows = 6,
}: GenericListSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton variant="title" className="w-40" />
          <Skeleton variant="text" className="w-64" />
        </div>
        {withHeaderActions && (
          <div className="flex items-center gap-2">
            <Skeleton variant="button" className="w-24" />
            <Skeleton variant="button" className="w-24" />
          </div>
        )}
      </div>

      {/* Filters / toolbar */}
      {withFilters && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card/40 p-4">
          <Skeleton variant="chip" className="w-20" />
          <Skeleton variant="chip" className="w-24" />
          <Skeleton variant="chip" className="w-28" />
          <div className="ml-auto flex items-center gap-2">
            <Skeleton variant="button" className="w-24" />
            <Skeleton variant="button" className="w-24" />
          </div>
        </div>
      )}

      {/* Table/list rows */}
      <div className="space-y-2 rounded-xl border bg-card/40 p-4">
        {/* header row */}
        <div className="mb-2 flex items-center gap-4">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-40" />
          <Skeleton variant="text" className="w-24" />
          <Skeleton variant="text" className="w-16" />
        </div>
        {/* body rows */}
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 border-t border-border/40 py-2"
          >
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-32" />
            <Skeleton variant="chip" className="w-20" />
            <Skeleton variant="button" className="w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
