// Path: components/tutor/dashboard/DashboardLoading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function DashboardViewLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-4 sm:py-6" aria-hidden="true">
      {/* 1. Score Prediction Hero Skeleton (Flat horizontal telemetry strip matching ProjectionHero) */}
      <div className="relative py-1 sm:py-2 px-0.5 sm:px-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Projected Score & Tolerance */}
          <div className="space-y-1.5 min-w-0">
            <Skeleton className="h-3.5 w-32 rounded" />
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <Skeleton className="h-8 sm:h-9 w-28 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-3.5 w-16 rounded" />
            </div>
          </div>

          {/* Right: Unified Telemetry Cluster (Readiness, Streak, Sessions) */}
          <div className="flex items-center gap-5 sm:gap-8 pt-2 md:pt-0 shrink-0">
            <div className="space-y-1">
              <Skeleton className="h-3 w-14 rounded" />
              <Skeleton className="h-6 w-12 rounded mt-0.5" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-12 rounded" />
              <Skeleton className="h-6 w-10 rounded mt-0.5" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-14 rounded" />
              <Skeleton className="h-6 w-12 rounded mt-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Smart Start Strip Skeleton (Matches SmartStartStrip Card dimensions & layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Today's Focus */}
        <div className="border border-border/60 bg-card rounded-2xl p-5 flex flex-col justify-between gap-5 shadow-xs">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-3.5 w-20 rounded" />
            </div>
            <div className="divide-y divide-border/30 space-y-2 pt-1">
              <div className="flex items-center justify-between py-1.5">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="flex items-center justify-between py-1.5">
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
              <div className="flex items-center justify-between py-1.5">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-3 w-14 rounded" />
              </div>
            </div>
          </div>
          <Skeleton className="h-9 w-full rounded-xl mt-auto" />
        </div>

        {/* Card 2: Curriculum Pace */}
        <div className="border border-border/60 bg-card rounded-2xl p-5 flex flex-col justify-between gap-5 shadow-xs">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-3.5 w-20 rounded" />
            </div>
            <div className="space-y-2.5 py-0.5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-44 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
          <Skeleton className="h-9 w-full rounded-xl mt-auto" />
        </div>
      </div>

      {/* 3. Syllabus Topics Section Skeleton (Matches SyllabusMap 3-column subject cards) */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col border border-border/60 bg-card rounded-2xl h-fit overflow-hidden shadow-xs"
            >
              {/* Subject Card Header */}
              <div className="pt-4 pb-2 px-4 sm:px-5 flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded shrink-0" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>

              {/* Domain Rows */}
              <div className="p-2 pt-0 space-y-0.5">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="px-3 py-2.5 rounded-xl flex flex-col justify-center min-h-[66px] space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-10 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-1.5 w-20 rounded-full" />
                      <Skeleton className="h-3 w-12 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardViewError({ message }: { message: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
      <p className="text-destructive font-medium">{message}</p>
      <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );
}
