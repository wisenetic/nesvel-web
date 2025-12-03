import * as React from "react";
import { Skeleton } from "@/core/components/ui/skeleton";

export function CameraListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header actions row */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton variant="title" className="w-40" />
          <Skeleton variant="text" className="w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="button" className="w-24" />
          <Skeleton variant="button" className="w-24" />
        </div>
      </div>

      {/* Toolbar / filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card/40 p-4">
        <Skeleton variant="chip" className="w-20" />
        <Skeleton variant="chip" className="w-24" />
        <Skeleton variant="chip" className="w-28" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton variant="button" className="w-24" />
          <Skeleton variant="button" className="w-24" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-3 rounded-xl border bg-card/40 p-4">
            <Skeleton variant="text" className="w-24" />
            <Skeleton variant="title" className="w-16" />
            <Skeleton variant="text" className="w-20" />
          </div>
        ))}
      </div>

      {/* Grid of camera cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 rounded-xl border bg-card/40 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="avatar" />
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-24" />
                  <Skeleton variant="text" className="w-32" />
                </div>
              </div>
              <Skeleton variant="chip" className="w-16" />
            </div>

            <Skeleton className="h-32 w-full rounded-lg" />

            <div className="flex items-center justify-between gap-2">
              <Skeleton variant="button" className="w-20" />
              <div className="flex items-center gap-2">
                <Skeleton variant="button" className="w-9" />
                <Skeleton variant="button" className="w-9" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
