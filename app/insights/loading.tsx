// Path: app/insights/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function InsightsLoading() {
  return (
    <div className="min-h-screen pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Page Hero Skeleton */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Skeleton className="h-6 w-64 rounded-full mx-auto" />
          <Skeleton className="h-9 sm:h-10 w-full max-w-md rounded-xl mx-auto" />
          <Skeleton className="h-4 w-full max-w-lg rounded mx-auto" />
        </div>

        {/* Exam Tabs Strip Skeleton */}
        <div className="flex justify-center gap-2 flex-wrap max-w-2xl mx-auto pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-xl" />
          ))}
        </div>

        {/* Active Exam Spotlight Skeleton Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-8 shadow-xs max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-44 rounded-full" />
              <Skeleton className="h-8 w-80 max-w-full rounded-lg" />
              <Skeleton className="h-4 w-96 max-w-full rounded" />
            </div>
            <Skeleton className="h-9 w-36 rounded-xl shrink-0" />
          </div>

          {/* Hardest Topics Rows */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-6 rounded-md" />
                    <Skeleton className="h-5 w-56 rounded-md" />
                  </div>
                  <Skeleton className="h-3.5 w-72 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                  <Skeleton className="h-8 w-28 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
