import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-4 lg:space-y-0 lg:flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-56 rounded-lg" />
            <Skeleton className="h-4 w-40 rounded" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="grid w-full grid-cols-2 gap-1 p-1 rounded-xl bg-muted/60">
          <Skeleton className="h-8 rounded-lg" />
          <Skeleton className="h-8 rounded-lg" />
        </div>

        {/* Details Content Card */}
        <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
