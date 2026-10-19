// Path: app/practice/[exam]/[subject]/[domain]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function PracticePageLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-12 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-4 w-16 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-4 w-20 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-4 w-24 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-4 w-28 rounded" />
      </div>

      {/* Page heading skeleton */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>
        <Skeleton className="h-9 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full max-w-2xl rounded" />
      </div>

      {/* Core Principles Card Skeleton */}
      <div className="mb-8 rounded-2xl border border-border/70 bg-card p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-56 rounded-md" />
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>
      </div>

      {/* Distractor Trap Card Skeleton */}
      <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-3">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-64 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
      </div>

      {/* Question card skeleton */}
      <div className="mb-10 rounded-2xl border border-border/80 bg-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
        </div>
        <div className="space-y-2.5 pt-2">
          {[1, 2, 3, 4].map((j) => (
            <div
              key={j}
              className="flex items-center gap-3.5 rounded-xl border border-border/70 p-3.5"
            >
              <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner skeleton */}
      <div className="mt-10 h-40 rounded-2xl border border-border/70 bg-card p-8 flex items-center justify-between">
        <div className="space-y-2.5">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-11 w-44 rounded-xl" />
      </div>
    </div>
  );
}
