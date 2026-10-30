import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Title Skeleton */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-7 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-96 max-w-full rounded" />
      </div>

      {/* Filter & Search Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/80 bg-card shadow-2xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Skeleton className="h-7 w-12 rounded-md" />
          <Skeleton className="h-7 w-36 rounded-md" />
          <Skeleton className="h-7 w-28 rounded-md" />
          <Skeleton className="h-7 w-24 rounded-md" />
          <Skeleton className="h-7 w-16 rounded-md" />
        </div>
        <Skeleton className="h-8 w-full sm:w-64 rounded-lg" />
      </div>

      {/* Quiz Grid Skeleton (matches QuizList) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card p-5 space-y-3 shadow-xs"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-10 rounded" />
              </div>
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-2/3 rounded" />
            </div>
            <div className="pt-2 flex justify-between items-center">
              <Skeleton className="h-4 w-14 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
