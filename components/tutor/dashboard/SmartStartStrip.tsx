// Path: components/tutor/dashboard/SmartStartStrip.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Play } from "lucide-react";
import type { SyllabusDomain } from "@/app/home/page";

interface SmartStartStripProps {
  nextLinearDomain: SyllabusDomain | null;
  onAlgorithmicReview: () => void;
  onLinearNext: () => void;
}

export function SmartStartStrip({
  nextLinearDomain,
  onAlgorithmicReview,
  onLinearNext,
}: SmartStartStripProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary/40 transition-colors">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-lg">AI Pick</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Spaced repetition algorithm. Targets your weakest and overdue topics across all subjects.
            </p>
          </div>
          <Button size="lg" className="w-full cursor-pointer" onClick={onAlgorithmicReview}>
            <Play className="mr-2 h-4 w-4" /> Start Spaced Review
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card hover:border-border/80 transition-colors">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ArrowRight className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-lg">Linear: Next Topic</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {nextLinearDomain
                ? `Next up in curriculum sequence: ${nextLinearDomain.name}.`
                : "You've mastered all topics! Keep up the spaced reviews."}
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={onLinearNext}
            disabled={!nextLinearDomain}
          >
            <Play className="mr-2 h-4 w-4" /> Practice {nextLinearDomain?.name || "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
