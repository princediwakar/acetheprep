// Path: app/insights/[exam]/hardest-topics/loading.tsx

export default function HardestTopicsLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />

        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-36 bg-muted/80 rounded-full animate-pulse" />
          <div className="h-8 w-80 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-muted/70 rounded animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border/60 bg-muted/30 px-6 py-4">
            <div className="flex gap-8">
              <div className="h-3 w-8 bg-muted rounded animate-pulse" />
              <div className="h-3 w-28 bg-muted rounded animate-pulse" />
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center gap-6"
              >
                <div className="h-4 w-6 bg-muted rounded animate-pulse shrink-0" />
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                <div className="flex-1 max-w-[120px]">
                  <div className="h-2 w-full bg-muted rounded-full animate-pulse" />
                </div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse shrink-0" />
                <div className="h-4 w-12 bg-muted rounded animate-pulse shrink-0 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
