// Path: app/setup/page.tsx
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { SetupForm } from "@/components/tutor/SetupForm";
import type { SetupFormPrefill } from "@/components/tutor/SetupForm";
import { SignInButton } from "@/components/SignInButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import type { SelfAssessment } from "@/types/tutor";
import taxonomy from "@/lib/taxonomies.json";

const TAXONOMY = taxonomy as unknown as Record<string, Record<string, string[]>>;
const EXAM_NAMES = Object.keys(TAXONOMY).filter((k) => k !== "_schema_version");
const EXAM_SUBJECTS: Record<string, string[]> = {};
for (const exam of EXAM_NAMES) {
  EXAM_SUBJECTS[exam] = Object.keys(TAXONOMY[exam] ?? {});
}

export const metadata: Metadata = {
  title: "Exam Profile Setup | AceThePrep",
  description: "Set up your personalized exam prep profile for AI-powered practice.",
};

import { Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { slugToExam } from "@/lib/slugs";

export default async function SetupPage({
  searchParams,
}: {
  searchParams?: Promise<{ exam?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const rawExam = resolvedParams.exam ? decodeURIComponent(resolvedParams.exam).trim() : undefined;
  const initialExam = rawExam ? (slugToExam(rawExam) || (TAXONOMY[rawExam] ? rawExam : undefined)) : undefined;

  return (
    <Suspense fallback={<SetupSkeleton />}>
      <SetupPageContent initialExam={initialExam} />
    </Suspense>
  );
}

function SetupSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center px-4 py-12">
      <div className="w-full space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-56 mx-auto rounded-lg" />
          <Skeleton className="h-4 w-72 mx-auto rounded" />
        </div>
        <Card className="rounded-2xl border border-border/70 bg-card shadow-sm">
          <CardContent className="space-y-5 pt-6">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

async function SetupPageContent({ initialExam }: { initialExam?: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const returnUrl = initialExam ? `/setup?exam=${encodeURIComponent(initialExam)}` : "/setup";
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <Card className="w-full rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-xl">
          <CardHeader className="space-y-3 pb-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-normal font-heading">
              {initialExam ? `Prepare for ${initialExam}` : "Welcome to AceThePrep"}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {initialExam
                ? `Sign in to generate your calibrated ${initialExam} syllabus, track your streak, and eliminate recurring mistakes under exam pressure.`
                : "Sign in to generate your personalized syllabus, track your streak, and build speed under exam pressure."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <SignInButton
              buttonText="Continue with Google"
              returnUrl={returnUrl}
              className="w-full py-6 text-base font-semibold shadow-md cursor-pointer"
            />
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-muted-foreground border-t border-border/60">
              <span className="flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                100% Free Access
              </span>
              <span className="flex items-center justify-center gap-1">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                60-Second Setup
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  // Load existing active profile
  const { data: profile } = await supabase
    .from("exam_profiles")
    .select("profile_id, exam_name, target_date, active_targets")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  let prefill: SetupFormPrefill | null = null;

  if (profile) {
    // Load existing self-assessments from concept_mastery
    const { data: masteryRows } = await supabase
      .from("concept_mastery")
      .select("skill_domain, mastery_score")
      .eq("user_id", user.id)
      .eq("exam_profile_id", profile.profile_id)
      .order("skill_domain");

    const subjects = TAXONOMY[profile.exam_name] ?? {};
    const assessments: Record<string, SelfAssessment> = {};

    if (masteryRows && masteryRows.length > 0) {
      for (const [subject, domains] of Object.entries(subjects)) {
        const domainScores = masteryRows.filter((r) => domains.includes(r.skill_domain));
        if (domainScores.length > 0) {
          const avgScore =
            domainScores.reduce((sum, r) => sum + (r.mastery_score ?? 0.25), 0) /
            domainScores.length;
          if (avgScore <= 0.4) assessments[subject] = "weak";
          else if (avgScore <= 0.65) assessments[subject] = "okay";
          else assessments[subject] = "strong";
        } else {
          assessments[subject] = "okay";
        }
      }
    } else {
      // No mastery rows yet — default all subjects to "okay"
      for (const subject of Object.keys(subjects)) {
        assessments[subject] = "okay";
      }
    }

    prefill = {
      exam: profile.exam_name,
      targetDate: profile.target_date,
      assessments,
      isExisting: true,
      activeTargets: (profile as any).active_targets ?? [],
    };
  } else if (initialExam && TAXONOMY[initialExam]) {
    // New user with exam context from query param: prefill with smart defaults (+90 days)
    const subjects = TAXONOMY[initialExam] ?? {};
    const assessments: Record<string, SelfAssessment> = {};
    for (const subject of Object.keys(subjects)) {
      assessments[subject] = "okay";
    }

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 90);
    const targetDateISO = defaultDate.toISOString().split("T")[0];

    prefill = {
      exam: initialExam,
      targetDate: targetDateISO,
      assessments,
      isExisting: false,
      activeTargets: [],
    };
  }

  return <SetupForm prefill={prefill} examNames={EXAM_NAMES} examSubjects={EXAM_SUBJECTS} />;
}
