import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionDebateLoading() {
  return (
    <div className="min-h-screen bg-background" aria-hidden="true">
      {/* Sticky Header Skeleton */}
      <header className="border-b border-border/80 bg-background/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-5 w-36 rounded-md" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        {/* Meta Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-md" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        {/* Stem Card (Matches QuestionDebateCard) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-44 rounded" />
            <Skeleton className="h-3.5 w-48 rounded" />
          </div>

          <div className="space-y-2 pt-1">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-4/5 rounded" />
            <Skeleton className="h-5 w-3/4 rounded" />
          </div>

          <div className="space-y-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-border/80 bg-secondary/30 flex items-center gap-3"
              >
                <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Community Callout Banner (Matches ErrorLogInboundCTA / Peer Callout) */}
        <div className="p-4 rounded-xl bg-card border border-indigo-500/20 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-4 w-4 rounded shrink-0" />
            <Skeleton className="h-4 w-80 max-w-full rounded" />
          </div>
          <Skeleton className="h-6 w-24 rounded-md shrink-0" />
        </div>
      </main>
    </div>
  );
}
