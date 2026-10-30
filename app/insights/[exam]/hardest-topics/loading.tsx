// Path: app/insights/[exam]/hardest-topics/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function HardestTopicsLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation links skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>

        {/* Header skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-56 rounded-full" />
          <Skeleton className="h-8 sm:h-9 w-96 max-w-full rounded-lg" />
          <Skeleton className="h-4 w-full max-w-2xl rounded" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
          <div className="border-b border-border/60 bg-muted/30 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              <Skeleton className="col-span-1 h-3 w-4 rounded" />
              <Skeleton className="col-span-5 sm:col-span-4 h-3 w-28 rounded" />
              <Skeleton className="col-span-3 sm:col-span-3 h-3 w-16 rounded ml-auto" />
              <Skeleton className="hidden sm:block sm:col-span-2 h-3 w-14 rounded ml-auto" />
              <Skeleton className="col-span-3 sm:col-span-2 h-3 w-12 rounded ml-auto" />
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center"
              >
                <Skeleton className="col-span-1 h-4 w-4 rounded" />
                <div className="col-span-5 sm:col-span-4 space-y-1.5">
                  <Skeleton className="h-4 w-44 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
                <div className="col-span-3 sm:col-span-3 flex justify-end">
                  <Skeleton className="h-6 w-16 rounded-md" />
                </div>
                <div className="hidden sm:flex sm:col-span-2 justify-end">
                  <Skeleton className="h-4 w-12 rounded" />
                </div>
                <div className="col-span-3 sm:col-span-2 flex justify-end">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
