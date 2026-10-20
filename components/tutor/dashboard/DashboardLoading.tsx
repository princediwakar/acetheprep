// Path: components/tutor/dashboard/DashboardLoading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function DashboardViewLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-4 sm:py-6">
      {/* Smart Start Strip Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-primary/20 bg-card p-5 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>

      {/* Projection / Readiness Hero Skeleton */}
      <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>

      {/* Syllabus Topics Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40 rounded-md" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-card p-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 rounded-lg" />
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
