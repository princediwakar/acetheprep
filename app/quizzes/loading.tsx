import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          From the Community
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover quizzes on all sorts of topics shared by the community.
        </p>
      </div>

      {/* Search Input Skeleton */}
      <div className="max-w-md">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>

      <div className="space-y-8 pt-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="flex justify-between items-center border-b border-border/70 pb-3">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="rounded-2xl border border-border/70 bg-card p-6 space-y-4 shadow-sm">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full rounded" />
                    <Skeleton className="h-3.5 w-4/5 rounded" />
                  </div>
                  <Skeleton className="h-9 w-full rounded-xl mt-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}