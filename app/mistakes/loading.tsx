import { Skeleton } from "@/components/ui/skeleton";

export default function MistakesLoading() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      {/* In-Page Navigation Bar */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-3 sm:pt-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-28 rounded" />
            <span className="text-border">&bull;</span>
            <Skeleton className="h-4 w-32 rounded" />
          </div>
          <Skeleton className="h-4 w-28 rounded" />
        </div>
      </div>

      {/* Main Focus Arena */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-5 sm:py-7 space-y-4">
        {/* Memory Trigger Banner Skeleton */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-card border border-rose-500/20 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 flex-1">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-48 rounded" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        {/* Question Card Skeleton */}
        <div className="p-5 sm:p-7 rounded-2xl bg-card border border-border/80 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-4/5 rounded" />
            <Skeleton className="h-5 w-2/3 rounded" />
          </div>

          <div className="space-y-3 pt-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="pt-2 flex justify-between items-center">
            <Skeleton className="h-10 w-36 rounded-xl" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}
