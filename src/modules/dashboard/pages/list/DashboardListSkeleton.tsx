import * as React from "react";
import { Skeleton } from "@/core/components/ui/skeleton";

export function DashboardListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <Skeleton variant="title" className="w-40" />
        <Skeleton variant="text" className="w-72" />
      </div>

      {/* Stats overview row */}
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="space-y-3 rounded-xl border bg-card/40 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="avatar" />
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-24" />
                  <Skeleton variant="text" className="w-16" />
                </div>
              </div>
              <Skeleton variant="text" className="w-10" />
            </div>
          </div>
        ))}
      </div>

      {/* First row of charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card/40 p-4 lg:col-span-2">
          <div className="space-y-2 mb-4">
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-64" />
          </div>
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>

        <div className="rounded-xl border bg-card/40 p-4">
          <div className="space-y-2 mb-4">
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-52" />
          </div>
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
      </div>

      {/* Second row of charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {[0, 1].map((idx) => (
          <div key={idx} className="rounded-xl border bg-card/40 p-4">
            <div className="space-y-2 mb-4">
              <Skeleton variant="text" className="w-40" />
              <Skeleton variant="text" className="w-56" />
            </div>
            <Skeleton className="h-56 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Recent detections + camera table */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card/40 p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-64" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Skeleton variant="chip" className="w-20" />
                  <Skeleton variant="text" className="w-24" />
                </div>
                <Skeleton variant="text" className="w-24" />
                <Skeleton variant="chip" className="w-20" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card/40 p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-64" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton variant="text" className="w-24" />
              <Skeleton variant="text" className="w-24" />
              <Skeleton variant="text" className="w-20" />
              <Skeleton variant="text" className="w-16" />
            </div>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Skeleton variant="avatar" />
                  <div className="space-y-1">
                    <Skeleton variant="text" className="w-28" />
                    <Skeleton variant="text" className="w-32" />
                  </div>
                </div>
                <Skeleton variant="chip" className="w-16" />
                <Skeleton variant="button" className="w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
