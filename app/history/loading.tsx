import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryLoading() {
  return (
    <div className="space-y-4">
      {/* Page Title Row Skeleton */}
      <div className="pb-1 border-b border-border/40 space-y-1.5">
        <Skeleton className="h-7 w-56 rounded-lg" />
        <Skeleton className="h-3.5 w-80 max-w-full rounded" />
      </div>

      {/* Tabs List Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-9 w-44 rounded-xl" />
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>

      {/* Sessions Table Skeleton */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs divide-y divide-border/50">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 bg-muted/40 gap-4">
          <Skeleton className="col-span-5 h-3 w-32 rounded" />
          <Skeleton className="col-span-2 h-3 w-16 rounded" />
          <Skeleton className="col-span-3 h-3 w-24 rounded" />
          <Skeleton className="col-span-2 h-3 w-12 rounded ml-auto" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-4 md:px-5 md:py-3.5 flex flex-col md:grid md:grid-cols-12 gap-3 items-start md:items-center"
          >
            <div className="md:col-span-5 space-y-1.5 w-full">
              <Skeleton className="h-4 w-48 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
            <div className="md:col-span-2">
              <Skeleton className="h-3.5 w-20 rounded" />
            </div>
            <div className="md:col-span-3">
              <Skeleton className="h-5 w-28 rounded-md" />
            </div>
            <div className="md:col-span-2 flex justify-end w-full">
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

