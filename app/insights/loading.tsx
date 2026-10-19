// Path: app/insights/loading.tsx

export default function InsightsLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-xl bg-muted animate-pulse mx-auto" />
          <div className="h-8 w-64 bg-muted rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-80 bg-muted/70 rounded animate-pulse mx-auto" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-sm"
            >
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <div className="h-3 w-24 bg-muted/70 rounded animate-pulse" />
              <div className="space-y-2 pt-2">
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
