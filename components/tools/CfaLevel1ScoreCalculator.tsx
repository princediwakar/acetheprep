"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Award,
  Sparkles,
  AlertTriangle,
  Info,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  name: string;
  weight: number; // percentage (e.g. 17.5)
  weightLabel: string;
}

const TOPICS: Topic[] = [
  { id: "ethics", name: "Ethical & Professional Standards", weight: 17.5, weightLabel: "15-20%" },
  { id: "fsa", name: "Financial Statement Analysis", weight: 12.5, weightLabel: "11-14%" },
  { id: "equity", name: "Equity Investments", weight: 12.5, weightLabel: "11-14%" },
  { id: "fixed_income", name: "Fixed Income", weight: 12.5, weightLabel: "11-14%" },
  { id: "portfolio", name: "Portfolio Management", weight: 9.5, weightLabel: "8-11%" },
  { id: "quant", name: "Quantitative Methods", weight: 7.5, weightLabel: "6-9%" },
  { id: "econ", name: "Economics", weight: 7.5, weightLabel: "6-9%" },
  { id: "corporate", name: "Corporate Issuers", weight: 7.5, weightLabel: "6-9%" },
  { id: "derivatives", name: "Derivatives", weight: 6.5, weightLabel: "5-8%" },
  { id: "alternatives", name: "Alternative Investments", weight: 6.5, weightLabel: "5-8%" },
];

export function CfaLevel1ScoreCalculator() {
  // Accuracy percentage for each topic (0-100)
  const [topicScores, setTopicScores] = useState<Record<string, number>>({
    ethics: 75,
    fsa: 70,
    equity: 72,
    fixed_income: 68,
    portfolio: 70,
    quant: 74,
    econ: 66,
    corporate: 72,
    derivatives: 65,
    alternatives: 68,
  });

  const handleScoreChange = (id: string, value: number) => {
    setTopicScores((prev) => ({ ...prev, [id]: value }));
  };

  const calculations = useMemo(() => {
    // Weighted overall percentage
    let totalWeightedScore = 0;
    let totalWeight = 0;

    TOPICS.forEach((t) => {
      const score = topicScores[t.id] ?? 70;
      totalWeightedScore += (score * t.weight);
      totalWeight += t.weight;
    });

    const overallPercentage = Math.round((totalWeightedScore / totalWeight) * 10) / 10;
    const ethicsScore = topicScores["ethics"] ?? 70;

    // Historical CFA Level 1 MPS is ~69%
    const estimatedMPS = 69.0;
    const delta = overallPercentage - estimatedMPS;

    let verdict = "Likely PASS";
    let verdictColor = "text-emerald-500";
    let ethicsNote = "";

    if (overallPercentage >= 72.0) {
      verdict = "Comfortable PASS (>90th Percentile Buffer)";
      verdictColor = "text-emerald-500";
      ethicsNote = "Safely above the historical Minimum Passing Score (MPS) threshold.";
    } else if (overallPercentage >= 69.0) {
      verdict = "Borderline PASS";
      verdictColor = "text-emerald-400";
      if (ethicsScore >= 70) {
        ethicsNote = "Strong Ethics score (+70%) triggers favorable CFA Ethics Adjustment.";
      } else {
        ethicsNote = "Caution: Low Ethics (<70%) on a borderline score creates failure risk.";
      }
    } else if (overallPercentage >= 66.0) {
      verdict = "Borderline at Risk";
      verdictColor = "text-amber-500";
      if (ethicsScore >= 75) {
        ethicsNote = "Exceptional Ethics performance might tip borderline results favorably.";
      } else {
        ethicsNote = "Currently below the ~69% estimated MPS line. High risk of failure.";
      }
    } else {
      verdict = "Likely DID NOT PASS";
      verdictColor = "text-destructive";
      ethicsNote = "Substantial gap to estimated MPS. Focus on Big 4: Ethics, FSA, Equity, Fixed Income.";
    }

    return {
      overallPercentage,
      estimatedMPS,
      delta,
      verdict,
      verdictColor,
      ethicsScore,
      ethicsNote,
    };
  }, [topicScores]);

  return (
    <div className="space-y-8">
      {/* Metric Display */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Estimated Weighted Composite
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-foreground font-heading">
                {calculations.overallPercentage}%
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                (MPS ~{calculations.estimatedMPS}%)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official CFA Institute 10-Topic Weighted Curriculum
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background/80 p-5 text-center w-full md:w-auto min-w-[220px]">
            <span className="text-[11px] font-semibold uppercase text-muted-foreground block">
              Estimated Outcome
            </span>
            <span className={`text-xl sm:text-2xl font-black font-heading block mt-1 ${calculations.verdictColor}`}>
              {calculations.verdict}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-1">
              {calculations.delta >= 0 ? `+${calculations.delta.toFixed(1)}%` : `${calculations.delta.toFixed(1)}%`} vs Historical MPS
            </span>
          </div>
        </div>

        {/* Ethics Adjustment Warning */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                Ethics Adjustment Factor: {calculations.ethicsScore}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {calculations.ethicsNote}
            </p>
          </div>

          <Link
            href="/practice/cfa-level-1"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-95 transition-all shrink-0"
          >
            <span>Practice CFA Traps</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 10 Topic Sliders Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-foreground">
            Topic Accuracy Percentages
          </h3>
          <span className="text-xs text-muted-foreground font-mono">
            Weighted by Official Exam Syllabus
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOPICS.map((topic) => {
            const score = topicScores[topic.id] ?? 70;
            return (
              <div
                key={topic.id}
                className="rounded-2xl border border-border bg-card p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-foreground">
                      {topic.name}
                    </h4>
                    <span className="text-[11px] text-muted-foreground">
                      Exam Weight: {topic.weightLabel}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground font-mono">
                      {score}%
                    </span>
                  </div>
                </div>

                <Slider
                  value={[score]}
                  onValueChange={([val]) => handleScoreChange(topic.id, val)}
                  min={30}
                  max={100}
                  step={1}
                  className="py-1"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* CFA Institute MPS Insight */}
      <div className="rounded-2xl border border-border/80 bg-muted/20 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <h4 className="font-bold text-sm text-foreground">
            How the CFA Institute Sets the Minimum Passing Score (MPS)
          </h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The CFA Institute does not publish a fixed passing score or enforce a pre-set curve. Instead, a Board of Governors establishes the MPS for each testing window using the <strong>Modified Angoff Standard-Setting Method</strong>. Historically:
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
          <li>The Level 1 MPS typically hovers between <strong>67% and 70%</strong>.</li>
          <li>Candidates scoring above <strong>70%</strong> across all major topics almost never fail.</li>
          <li>The <strong>Ethics Adjustment</strong> is critical: CFA Institute explicitly states that candidate performance on Ethical and Professional Standards can be a tie-breaker for candidates hovering directly on the passing borderline.</li>
        </ul>
      </div>
    </div>
  );
}
