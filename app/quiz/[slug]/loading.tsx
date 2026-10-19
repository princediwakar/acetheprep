import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Title */}
      <Skeleton className="h-9 w-3/4 rounded-lg" />

      {/* Creator */}
      <Skeleton className="h-4 w-1/3 rounded-md" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>

      {/* Grid for Subject, Topic, Difficulty, Questions */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/70 bg-card p-6">
        <div className="flex flex-col space-y-1.5">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-5 w-28 rounded-md" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-5 w-28 rounded-md" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-5 w-28 rounded-md" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-5 w-28 rounded-md" />
        </div>
      </div>

      {/* Action Button */}
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}