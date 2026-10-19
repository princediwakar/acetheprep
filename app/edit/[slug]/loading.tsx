import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/2 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Tabs */}
      <div className="grid w-full grid-cols-2 gap-2">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
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
  );
}