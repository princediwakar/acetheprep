// Path: app/practice/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function PracticeCatalogLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-12">
      {/* Hero Skeleton */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Skeleton className="h-6 w-60 rounded-full mx-auto" />
        <Skeleton className="h-9 sm:h-11 w-full max-w-lg rounded-xl mx-auto" />
        <Skeleton className="h-4 w-full max-w-xl rounded mx-auto" />
        <div className="flex justify-center gap-3 pt-2">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-8 w-56 rounded-xl" />
        </div>
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="p-3.5 rounded-2xl border border-border/80 bg-card shadow-xs space-y-3">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Blueprint Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-xs flex flex-col justify-between h-64"
          >
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            <div className="space-y-2 pt-4 border-t border-border/50">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-9 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

