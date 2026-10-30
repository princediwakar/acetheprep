// Path: app/practice/[exam]/[subject]/[domain]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function PracticePageLoading() {
  return (
    <div className="mx-auto max-w-4xl pt-20 sm:pt-22 pb-16 px-4 sm:px-6" aria-hidden="true">
      {/* 1. Breadcrumb skeleton */}
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-3.5 w-10 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-3.5 w-14 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-3.5 w-16 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-3.5 w-20 rounded" />
        <span className="text-muted-foreground/40 text-xs">/</span>
        <Skeleton className="h-3.5 w-24 rounded" />
      </div>

      {/* 2. Compact Page Heading skeleton */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <Skeleton className="h-8 sm:h-9 w-3/4 max-w-md rounded-lg" />
        <Skeleton className="h-4 w-full max-w-2xl rounded" />
      </div>

      {/* 3. Center-Stage Interactive Topic Practice Drill Card (Matches TopicPracticeDrill) */}
      <div className="mb-8 rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        {/* Drill Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/70 gap-3">
          <div className="space-y-1">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-6 w-56 rounded-md" />
          </div>
          <Skeleton className="h-7 w-28 rounded-lg self-end sm:self-auto" />
        </div>

        {/* Stepper Buttons Row */}
        <div className="flex items-center justify-between gap-2 p-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-8 rounded-lg shrink-0" />
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Skeleton className="h-8 w-14 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>

        {/* Question Stem */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
          <Skeleton className="h-5 w-2/3 rounded-md" />
        </div>

        {/* Options */}
        <div className="space-y-2.5 pt-1">
          {Array.from({ length: 4 }).map((_, j) => (
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

      {/* 4. Core Principles Card Skeleton (Matches DomainCorePrinciples) */}
      <div className="mb-8 rounded-2xl border border-border/70 bg-card p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-5 w-56 rounded-md" />
        </div>
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>
      </div>

      {/* 5. Distractor Trap Card Skeleton */}
      <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-3">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-5 w-64 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
      </div>

      {/* 6. CTA banner skeleton */}
      <div className="mt-10 h-36 rounded-2xl border border-border/70 bg-card p-8 flex items-center justify-between shadow-xs">
        <div className="space-y-2.5">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-11 w-44 rounded-xl" />
      </div>
    </div>
  );
}
