// Path: components/compare/ExamDecisionQuiz.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionStep {
  title: string;
  options: {
    label: string;
    description: string;
    lean: "gmat" | "gre" | "neutral";
  }[];
}

const STEPS: QuestionStep[] = [
  {
    title: "1. How do you feel about mental math & quantitative problem solving?",
    options: [
      {
        label: "I rely heavily on a calculator; algebra under time pressure stresses me.",
        description: "The GRE provides an on-screen calculator for ALL quantitative problems.",
        lean: "gre",
      },
      {
        label: "I have strong foundational arithmetic and prefer logic puzzles over raw calculation.",
        description: "GMAT Focus Quant has zero calculator, but tests conceptual number properties and reasoning.",
        lean: "gmat",
      },
    ],
  },
  {
    title: "2. How strong is your advanced academic English vocabulary?",
    options: [
      {
        label: "My vocabulary is average; I prefer reading arguments and analyzing logical flaws.",
        description: "GMAT Focus eliminated Sentence Correction; it tests only Critical Reasoning and Reading Comp.",
        lean: "gmat",
      },
      {
        label: "I have strong vocabulary memory and excel at obscure words and nuance in context.",
        description: "GRE Verbal features Text Completion and Sentence Equivalence requiring advanced vocabulary.",
        lean: "gre",
      },
    ],
  },
  {
    title: "3. How do you approach test-taking navigation & pacing?",
    options: [
      {
        label: "I like jumping around: skipping hard questions and coming back at the end of the section.",
        description: "GRE is section-adaptive; you can freely skip and review any question in the current section.",
        lean: "gre",
      },
      {
        label: "I focus strictly one question at a time; changing up to 3 answers at the end is enough.",
        description: "GMAT Focus is question-adaptive; you proceed sequentially and can edit up to 3 answers per section.",
        lean: "gmat",
      },
    ],
  },
];

export function ExamDecisionQuiz() {
  const [answers, setAnswers] = useState<Record<number, "gmat" | "gre" | "neutral">>({});
  const [currentStep, setCurrentStep] = useState(0);

  const isComplete = Object.keys(answers).length === STEPS.length;

  const gmatScore = Object.values(answers).filter((a) => a === "gmat").length;
  const greScore = Object.values(answers).filter((a) => a === "gre").length;

  const recommendation =
    gmatScore > greScore
      ? {
          exam: "GMAT Focus Edition",
          reason:
            "Your profile matches the GMAT Focus: you benefit from logic-driven Quant without memorizing vocabulary, and you are comfortable with sequential problem-solving.",
          href: "/practice/gmat-focus",
          cta: "Practice GMAT Focus Drills",
          slug: "gmat-focus",
        }
      : {
          exam: "ETS GRE General",
          reason:
            "Your profile matches the GRE: you benefit from having an on-screen calculator in Quant, the ability to freely skip and review questions, and strong vocabulary retention.",
          href: "/practice/gre",
          cta: "Practice GRE Drills",
          slug: "gre",
        };

  const handleSelect = (lean: "gmat" | "gre" | "neutral") => {
    setAnswers((prev) => ({ ...prev, [currentStep]: lean }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((c) => c + 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-bold text-base sm:text-lg text-foreground">
            30-Second Test Recommender: GMAT Focus vs GRE
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Step {Math.min(currentStep + 1, STEPS.length)} of {STEPS.length}
        </span>
      </div>

      {!isComplete ? (
        <div className="space-y-6">
          <h4 className="text-base sm:text-lg font-semibold text-foreground">
            {STEPS[currentStep].title}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STEPS[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(opt.lean)}
                className="rounded-2xl border border-border/90 bg-background/60 p-5 text-left hover:border-primary hover:bg-primary/5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-2">
                    {opt.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {opt.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Select this profile</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              Recommendation Result
            </span>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Retake Quiz
            </button>
          </div>

          <div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-foreground font-heading">
              You should focus on: <span className="text-primary">{recommendation.exam}</span>
            </h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {recommendation.reason}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={recommendation.href}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-95 transition-all"
            >
              <span>{recommendation.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/gmat-focus-score-calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:border-primary/50 transition-all"
            >
              <span>Calibrate Target Score</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
