"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Award,
  Sparkles,
  BookOpen,
  Volume2,
  PenTool,
  Mic,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function IeltsBandScoreCalculator() {
  // Raw listening score out of 40
  const [listeningRaw, setListeningRaw] = useState<number>(33);
  // Raw reading score out of 40 (Academic)
  const [readingRaw, setReadingRaw] = useState<number>(32);
  // Writing band (0 to 9.0)
  const [writingBand, setWritingBand] = useState<number>(7.0);
  // Speaking band (0 to 9.0)
  const [speakingBand, setSpeakingBand] = useState<number>(7.0);

  const calculations = useMemo(() => {
    // Listening conversion
    let lBand = 4.0;
    if (listeningRaw >= 39) lBand = 9.0;
    else if (listeningRaw >= 37) lBand = 8.5;
    else if (listeningRaw >= 35) lBand = 8.0;
    else if (listeningRaw >= 32) lBand = 7.5;
    else if (listeningRaw >= 30) lBand = 7.0;
    else if (listeningRaw >= 26) lBand = 6.5;
    else if (listeningRaw >= 23) lBand = 6.0;
    else if (listeningRaw >= 18) lBand = 5.5;
    else if (listeningRaw >= 16) lBand = 5.0;
    else if (listeningRaw >= 13) lBand = 4.5;
    else lBand = 4.0;

    // Reading Academic conversion
    let rBand = 4.0;
    if (readingRaw >= 39) rBand = 9.0;
    else if (readingRaw >= 37) rBand = 8.5;
    else if (readingRaw >= 35) rBand = 8.0;
    else if (readingRaw >= 33) rBand = 7.5;
    else if (readingRaw >= 30) rBand = 7.0;
    else if (readingRaw >= 27) rBand = 6.5;
    else if (readingRaw >= 23) rBand = 6.0;
    else if (readingRaw >= 19) rBand = 5.5;
    else if (readingRaw >= 15) rBand = 5.0;
    else if (readingRaw >= 13) rBand = 4.5;
    else rBand = 4.0;

    // Exact raw average
    const exactAverage = (lBand + rBand + writingBand + speakingBand) / 4;

    // Official IELTS Rounding Algorithm:
    // Fraction < 0.25 -> round down to whole (e.g. 6.125 -> 6.0)
    // 0.25 <= Fraction < 0.75 -> round to 0.5 (e.g. 6.25 -> 6.5, 6.375 -> 6.5)
    // Fraction >= 0.75 -> round up to next whole (e.g. 6.75 -> 7.0, 6.875 -> 7.0)
    const whole = Math.floor(exactAverage);
    const fraction = exactAverage - whole;
    let roundedBand = whole;
    if (fraction < 0.25) {
      roundedBand = whole;
    } else if (fraction >= 0.25 && fraction < 0.75) {
      roundedBand = whole + 0.5;
    } else {
      roundedBand = whole + 1.0;
    }

    // CEFR Level & Target University Range
    let cefr = "B2 (Vantage)";
    let description = "Independent user capable of effective communication in familiar environments.";
    let visaStatus = "Accepted for undergraduate admissions and general employment visas.";

    if (roundedBand >= 8.5) {
      cefr = "C2 (Mastery)";
      description = "Expert user with fully operational command of the English language.";
      visaStatus = "Exceeds requirements for Oxford, Cambridge, Harvard, and all global visa streams.";
    } else if (roundedBand >= 7.0) {
      cefr = "C1 (Effective Operational Proficiency)";
      description = "Good user with operational command in complex academic and professional contexts.";
      visaStatus = "Meets the direct entry requirement for Tier 1 UK, Canadian, and Australian universities.";
    } else if (roundedBand >= 6.0) {
      cefr = "B2 (Vantage)";
      description = "Competent user with generally effective command despite some inaccuracies.";
      visaStatus = "Standard threshold for most UK/Canadian undergraduate admissions and Express Entry PR.";
    } else {
      cefr = "B1 (Threshold)";
      description = "Modest user requiring pre-sessional language training.";
      visaStatus = "May require foundation year or conditional language courses.";
    }

    return {
      lBand,
      rBand,
      exactAverage,
      roundedBand,
      cefr,
      description,
      visaStatus,
    };
  }, [listeningRaw, readingRaw, writingBand, speakingBand]);

  return (
    <div className="space-y-8">
      {/* Metric Card */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Estimated Overall IELTS Band
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-foreground font-heading">
                {calculations.roundedBand.toFixed(1)}
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                / 9.0 Band (Raw: {calculations.exactAverage.toFixed(2)})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official IELTS Half-Band Upward Rounding Algorithm
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="rounded-2xl border border-border bg-background/80 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground block">
                CEFR Benchmark
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
                {calculations.cefr.split(" ")[0]}
              </span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                {calculations.cefr.split(" ").slice(1).join(" ")}
              </span>
            </div>
            <div className="rounded-2xl border border-border bg-background/80 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground block">
                Section Scores
              </span>
              <span className="text-base sm:text-lg font-bold text-foreground font-heading block mt-1">
                L {calculations.lBand} | R {calculations.rBand} | W {writingBand} | S {speakingBand}
              </span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                Equally weighted (25% each)
              </span>
            </div>
          </div>
        </div>

        {/* CEFR & Admission Outlook */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                {calculations.visaStatus}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {calculations.description}
            </p>
          </div>

          <Link
            href="/home?autostart=first_test&exam=IELTS%20Academic"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-95 transition-all shrink-0 cursor-pointer"
          >
            <span>Take your first test</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Skill Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listening */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Volume2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Listening</h3>
                <p className="text-xs text-muted-foreground">40 questions total</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary font-heading">
                {calculations.lBand.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground block">Band</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Raw Correct Answers:</span>
              <span className="font-bold text-foreground">{listeningRaw} / 40</span>
            </div>
            <Slider
              value={[listeningRaw]}
              onValueChange={([val]) => setListeningRaw(val)}
              min={10}
              max={40}
              step={1}
              className="py-1"
            />
          </div>
        </div>

        {/* Reading Academic */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Reading (Academic)</h3>
                <p className="text-xs text-muted-foreground">40 questions total</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary font-heading">
                {calculations.rBand.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground block">Band</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Raw Correct Answers:</span>
              <span className="font-bold text-foreground">{readingRaw} / 40</span>
            </div>
            <Slider
              value={[readingRaw]}
              onValueChange={([val]) => setReadingRaw(val)}
              min={10}
              max={40}
              step={1}
              className="py-1"
            />
          </div>
        </div>

        {/* Writing */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <PenTool className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Writing</h3>
                <p className="text-xs text-muted-foreground">Task 1 (33%) & Task 2 (67%)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary font-heading">
                {writingBand.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground block">Band</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Estimated Band:</span>
              <span className="font-bold text-foreground">Band {writingBand.toFixed(1)}</span>
            </div>
            <Slider
              value={[writingBand]}
              onValueChange={([val]) => setWritingBand(val)}
              min={4.0}
              max={9.0}
              step={0.5}
              className="py-1"
            />
          </div>
        </div>

        {/* Speaking */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Mic className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Speaking</h3>
                <p className="text-xs text-muted-foreground">Parts 1, 2, and 3 interview</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary font-heading">
                {speakingBand.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground block">Band</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Estimated Band:</span>
              <span className="font-bold text-foreground">Band {speakingBand.toFixed(1)}</span>
            </div>
            <Slider
              value={[speakingBand]}
              onValueChange={([val]) => setSpeakingBand(val)}
              min={4.0}
              max={9.0}
              step={0.5}
              className="py-1"
            />
          </div>
        </div>
      </div>

      {/* Explainer Box */}
      <div className="rounded-2xl border border-border/80 bg-muted/20 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <h4 className="font-bold text-sm text-foreground">
            The Official IELTS Upward Rounding Rule Explained
          </h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          IELTS overall scores are calculated as the simple arithmetic mean of the four individual components. The final result is rounded to the nearest half or whole band:
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
          <li>If the average ends in <strong>.25</strong>, it is rounded up to the next half band (e.g., 6.25 becomes <strong>6.5</strong>).</li>
          <li>If the average ends in <strong>.75</strong>, it is rounded up to the next whole band (e.g., 6.75 becomes <strong>7.0</strong>).</li>
          <li>If the average ends in <strong>.125</strong>, it drops to the whole band (e.g., 6.125 becomes <strong>6.0</strong>).</li>
          <li>If the average ends in <strong>.375</strong>, it rounds up to the half band (e.g., 6.375 becomes <strong>6.5</strong>).</li>
        </ul>
      </div>
    </div>
  );
}
