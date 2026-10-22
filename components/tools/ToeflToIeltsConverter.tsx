"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeftRight,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Info,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function ToeflToIeltsConverter() {
  // Total TOEFL iBT score (0 to 120)
  const [toeflTotal, setToeflTotal] = useState<number>(102);

  const conversion = useMemo(() => {
    let ieltsBand = "7.5";
    let cefr = "C1 (Advanced)";
    let percentileEstimate = 82;
    let universityReadiness = "Direct unconditional entry for Tier 1 US and UK institutions.";
    let usCompetitiveness = "Meets graduate requirement for Columbia, Cornell, UCLA, Michigan.";

    if (toeflTotal >= 118) {
      ieltsBand = "9.0";
      cefr = "C2 (Mastery)";
      percentileEstimate = 99;
      universityReadiness = "Exceptional English mastery. Exceeds requirements for all global programs.";
      usCompetitiveness = "Exceeds Stanford, MIT, Harvard, Oxford requirements.";
    } else if (toeflTotal >= 115) {
      ieltsBand = "8.5";
      cefr = "C2 (Mastery)";
      percentileEstimate = 96;
      universityReadiness = "Expert academic fluency across technical and conversational writing.";
      usCompetitiveness = "Fully competitive for Ivy League admissions and top fellowships.";
    } else if (toeflTotal >= 110) {
      ieltsBand = "8.0";
      cefr = "C1 (Effective Proficiency)";
      percentileEstimate = 92;
      universityReadiness = "Comfortably exceeds cutoffs for virtually all US/UK graduate schools.";
      usCompetitiveness = "Meets Harvard Business School, Stanford, and Oxford cutoffs.";
    } else if (toeflTotal >= 102) {
      ieltsBand = "7.5";
      cefr = "C1 (Effective Proficiency)";
      percentileEstimate = 82;
      universityReadiness = "Strong command of academic English. Standard cutoff for selective colleges.";
      usCompetitiveness = "Standard cutoff for Berkeley, NYU, Chicago, and Ivy League master's.";
    } else if (toeflTotal >= 94) {
      ieltsBand = "7.0";
      cefr = "C1 (Effective Proficiency)";
      percentileEstimate = 71;
      universityReadiness = "Meets the universal baseline threshold for direct undergraduate admission.";
      usCompetitiveness = "Meets standard cutoffs for Top 50 US universities and STEM programs.";
    } else if (toeflTotal >= 79) {
      ieltsBand = "6.5";
      cefr = "B2 (Vantage)";
      percentileEstimate = 50;
      universityReadiness = "Satisfies admission for many national universities and undergraduate courses.";
      usCompetitiveness = "Accepted by most regional universities; some may require placement tests.";
    } else if (toeflTotal >= 60) {
      ieltsBand = "6.0";
      cefr = "B2 (Vantage)";
      percentileEstimate = 32;
      universityReadiness = "Borderline for direct entry. May trigger pre-sessional ESL requirements.";
      usCompetitiveness = "Often requires conditional admission or English bridge coursework.";
    } else {
      ieltsBand = "5.5 or below";
      cefr = "B1 (Threshold)";
      percentileEstimate = 15;
      universityReadiness = "Requires intensive language preparation prior to university matriculation.";
      usCompetitiveness = "Below direct academic study threshold.";
    }

    return {
      ieltsBand,
      cefr,
      percentileEstimate,
      universityReadiness,
      usCompetitiveness,
    };
  }, [toeflTotal]);

  return (
    <div className="space-y-8">
      {/* Metric Display */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/70">
          {/* TOEFL Input Display */}
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              TOEFL iBT Input Score
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-foreground font-heading">
                {toeflTotal}
              </span>
              <span className="text-muted-foreground text-sm font-medium">/ 120 Total</span>
            </div>
            <p className="text-xs text-muted-foreground">ETS Standard Academic Scale</p>
          </div>

          <div className="flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
            <ArrowLeftRight className="h-6 w-6" />
          </div>

          {/* IELTS Equivalent Output */}
          <div className="text-center md:text-right space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Estimated IELTS Academic Equivalent
            </span>
            <div className="flex items-baseline justify-center md:justify-end gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-primary font-heading">
                Band {conversion.ieltsBand}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Official ETS Concordance Table
            </p>
          </div>
        </div>

        {/* Global Admissions Outlook */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                {conversion.usCompetitiveness}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {conversion.universityReadiness}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tools/ielts-band-score-calculator"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors shrink-0"
            >
              <span>IELTS Calculator</span>
            </Link>
            <Link
              href="/compare/ielts-vs-toefl"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
            >
              <span>Compare Tests</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Slider Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-foreground">
              Select Your TOEFL iBT Composite Score
            </h3>
            <p className="text-xs text-muted-foreground">
              Drag the slider from 40 to 120 to see the exact IELTS Academic band equivalence.
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-primary font-heading">
              {toeflTotal}
            </span>
            <span className="text-xs text-muted-foreground block">/ 120</span>
          </div>
        </div>

        <Slider
          value={[toeflTotal]}
          onValueChange={([val]) => setToeflTotal(val)}
          min={40}
          max={120}
          step={1}
          className="py-2"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 text-center">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Reading (Avg)</span>
            <span className="text-sm font-bold text-foreground font-mono">
              ~{Math.min(30, Math.round(toeflTotal * 0.26))} / 30
            </span>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 text-center">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Listening (Avg)</span>
            <span className="text-sm font-bold text-foreground font-mono">
              ~{Math.min(30, Math.round(toeflTotal * 0.25))} / 30
            </span>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 text-center">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Speaking (Avg)</span>
            <span className="text-sm font-bold text-foreground font-mono">
              ~{Math.min(30, Math.round(toeflTotal * 0.24))} / 30
            </span>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 text-center">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Writing (Avg)</span>
            <span className="text-sm font-bold text-foreground font-mono">
              ~{Math.min(30, Math.round(toeflTotal * 0.25))} / 30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
