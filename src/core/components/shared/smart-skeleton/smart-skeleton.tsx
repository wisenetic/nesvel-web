import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Skeleton } from "@/core/components/ui/skeleton";

type SmartSkeletonProps = {
  loading: boolean;
  children: React.ReactNode;
  /** Optional explicit skeleton layout. */
  skeleton?: React.ReactNode;
  /** Optional ARIA label for screen readers. */
  ariaLabel?: string;
  className?: string;
};

export function SmartSkeleton({
  loading,
  children,
  skeleton,
  ariaLabel = "Loading",
  className,
}: SmartSkeletonProps) {
  if (!loading) {
    return <>{children}</>;
  }

  const content = skeleton ?? (
    <div className="space-y-4">
      <Skeleton variant="title" className="w-48" />
      <Skeleton variant="text" className="w-72" />
      <Skeleton variant="card" className="w-full" />
    </div>
  );

  return (
    <section
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn("space-y-4", className)}
    >
      {content}
      <span className="sr-only">Loading…</span>
    </section>
  );
}
