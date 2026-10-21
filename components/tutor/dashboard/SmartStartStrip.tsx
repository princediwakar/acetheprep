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
              <h3 className="font-semibold text-lg">Daily Review</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              10-question mixed set focused on topics you are most likely to forget and recent mistakes.
            </p>
          </div>
          <Button size="lg" className="w-full cursor-pointer" onClick={onAlgorithmicReview}>
            <Play className="mr-2 h-4 w-4" /> Start Daily Review
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card hover:border-border/80 transition-colors">
        <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ArrowRight className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-lg">Next in Syllabus</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {nextLinearDomain
                ? `Next topic in course order: ${nextLinearDomain.name}.`
                : "You've completed all topics! Keep up your daily review."}
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={onLinearNext}
            disabled={!nextLinearDomain}
          >
            <Play className="mr-2 h-4 w-4" /> Practice {nextLinearDomain?.name || "Next Topic"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
