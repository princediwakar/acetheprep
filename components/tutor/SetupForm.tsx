// Path: components/tutor/SetupForm.tsx
"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronRight, Sparkles, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTimeMode } from "@/lib/sm2";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { createExamProfile } from "@/lib/actions/tutor";
import type { TimeMode, SelfAssessment } from "@/types/tutor";

import { Step1RealityAnchor } from "./setup/Step1RealityAnchor";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDefaultTargetDateISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  return Math.ceil(
    (new Date(a).getTime() - new Date(b).getTime()) / (1000 * 60 * 60 * 24),
  );
}

function readLandingPrefill(): { exam?: string; targetDate?: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("landingPrefill");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SetupFormPrefill {
  exam: string;
  targetDate: string;
  assessments: Record<string, SelfAssessment>;
  isExisting: boolean;
  activeTargets?: string[];
}

interface SetupFormProps {
  prefill: SetupFormPrefill | null;
  examNames: string[];
  examSubjects: Record<string, string[]>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export function SetupForm({ prefill, examNames, examSubjects }: SetupFormProps) {
  const router = useRouter();

  // ---- Form state ----
  const [exam, setExam] = useState<string>(() => {
    if (prefill?.exam) return prefill.exam;
    const landing = readLandingPrefill();
    return landing?.exam ?? "";
  });

  const [targetDate, setTargetDate] = useState<string>(() => {
    if (prefill?.targetDate) return prefill.targetDate;
    const landing = readLandingPrefill();
    return landing?.targetDate ?? getDefaultTargetDateISO();
  });

  const [assessments, setAssessments] = useState<Record<string, SelfAssessment>>(() => {
    return prefill?.assessments ?? {};
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);
  const isExisting = prefill?.isExisting ?? false;

  useEffect(() => {
    const timer = setTimeout(() => selectRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, []);

  // Consume landing page prefill from localStorage, then clear it
  useEffect(() => {
    try {
      localStorage.removeItem("landingPrefill");
    } catch {
      /* ignore */
    }
  }, []);

  // ---- Derived ----
  const subjects = useMemo<string[]>(() => {
    if (!exam) return [];
    return examSubjects[exam] ?? [];
  }, [exam, examSubjects]);

  const timeMode = useMemo<TimeMode | null>(() => {
    if (!targetDate) return null;
    const days = daysBetween(targetDate, getTodayISO());
    return getTimeMode(days);
  }, [targetDate]);

  // Handlers
  const handleExamChange = useCallback((value: string) => {
    setExam(value);
    // Pre-populate default assessments to 'okay' so zero friction is needed to start
    const subs = examSubjects[value] ?? [];
    const defaults: Record<string, SelfAssessment> = {};
    for (const s of subs) {
      defaults[s] = "okay";
    }
    setAssessments(defaults);
    if (!targetDate) {
      setTargetDate(getDefaultTargetDateISO());
    }
  }, [examSubjects, targetDate]);

  const handleAssessmentChange = (subject: string, level: SelfAssessment) => {
    setAssessments((prev) => ({ ...prev, [subject]: level }));
  };

  // Resolved assessments: fallback any untouched subject to "okay"
  const resolvedAssessments = useMemo(() => {
    const res: Record<string, SelfAssessment> = {};
    for (const s of subjects) {
      res[s] = assessments[s] ?? "okay";
    }
    return res;
  }, [subjects, assessments]);

  const isValid = Boolean(exam && targetDate && subjects.length > 0);

  // ---- Save profile helper ----
  const saveProfile = useCallback(async () => {
    if (!isValid) return null;

    return createExamProfile({
      exam_name: exam,
      target_date: targetDate,
      self_assessments: resolvedAssessments,
      active_targets: [],
    });
  }, [isValid, exam, targetDate, resolvedAssessments]);

  // ---- Complete Setup (1-Click) ----
  const handleCompleteSetup = useCallback(async () => {
    setIsSubmitting(true);

    const result = await saveProfile();

    if (!result) {
      setIsSubmitting(false);
      return;
    }
    if ("error" in result) {
      toast.error(result.error);
      setIsSubmitting(false);
      return;
    }

    toast.success("Profile calibrated! Launching practice...", { duration: 2000 });
    router.push(TUTOR_ROUTES.DASHBOARD);
  }, [saveProfile, router]);

  // ---- Page metadata ----
  const pageTitle = isExisting ? "Update Your Exam Profile" : "Calibrate Your Prep";
  const pageDescription = isExisting
    ? "Adjust your target exam, date horizon, or subject focus."
    : "Pick your exam and target timeline. We will calibrate your syllabus and spaced recall schedule.";

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center px-4 py-10">
      <div className="mb-6 text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Instant Syllabus Synthesis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          {pageDescription}
        </p>
      </div>

      <div className="space-y-6">
        <Step1RealityAnchor
          exam={exam}
          examNames={examNames}
          targetDate={targetDate}
          subjects={subjects}
          assessments={resolvedAssessments}
          timeMode={timeMode}
          onExamChange={handleExamChange}
          onTargetDateChange={setTargetDate}
          onAssessmentChange={handleAssessmentChange}
          selectRef={selectRef}
        />

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full py-6 text-sm sm:text-base font-semibold shadow-md transition-all cursor-pointer"
            onClick={handleCompleteSetup}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calibrating Syllabus & Launching...
              </>
            ) : isExisting ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile Changes
              </>
            ) : (
              <>
                Generate Syllabus & Start Practice
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>

          {!isValid && !exam && (
            <p className="text-center text-xs text-muted-foreground">
              Select your target exam above to continue.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
