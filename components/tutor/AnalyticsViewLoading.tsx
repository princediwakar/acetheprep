// Path: components/tutor/AnalyticsViewLoading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsViewLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-4 sm:py-6">
      {/* Quick Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border/70 bg-card p-5 flex items-center gap-4 shadow-sm">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Domain Breakdown Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4 shadow-sm">
        <Skeleton className="h-5 w-44 rounded-md" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2 p-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
