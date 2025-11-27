// list-skeleton.tsx
import { Skeleton } from "@/core/components/ui/skeleton";

export function ListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" /> {/* Page Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-3 bg-white">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
