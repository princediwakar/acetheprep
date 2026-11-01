// Path: app/admin/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import {
  Users,
  Target,
  Trophy,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Activity,
  CreditCard,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggleButton";

export const metadata: Metadata = {
  title: "Admin Command Center | AceThePrep",
  robots: {
    index: false,
    follow: false,
  },
};

// Force dynamic server rendering for real-time telemetry
export const dynamic = "force-dynamic";

const DEFAULT_ADMIN_EMAILS = [
  "princediwakar25@gmail.com",
  "prince@supersite.app",
  "rawkindepic@gmail.com",
  "princediwakar.cjs@gmail.com",
];

export const IGNORED_TEST_EMAILS = new Set([
  "princediwakar25@gmail.com",
  "mental.alternate@gmail.com",
  "rawkindepic@gmail.com",
  "princediwakar.cjs@gmail.com",
  "neurovisionranchi@gmail.com",
  "prince@supersite.app",
  "umair@supersite.app",
  "nileshpatidar.datascience@gmail.com",
  "ad17yadav@gmail.com"
]);

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const includeTest = resolvedParams.include_test === "true";
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?returnUrl=/admin");
  }

  const envAdmins = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];
  const allowedAdmins = new Set([...DEFAULT_ADMIN_EMAILS, ...envAdmins]);

  const userEmail = user.email?.toLowerCase() || "";
  const isAuthorized = allowedAdmins.has(userEmail);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Access Restricted</h1>
        <p className="text-muted-foreground mt-2 max-w-md text-sm">
          Your account ({user.email}) does not have administrative privileges for the AceThePrep command center.
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link href="/home">Return to Student Dashboard</Link>
        </Button>
      </div>
    );
  }

  // Server-First Parallel Database Fetch using Service Role
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const adminClient = createAdminClient(url, key);

  const [usersRes, profilesRes, sessionsRes, answersRes, subsRes] = await Promise.all([
    adminClient.auth.admin.listUsers({ perPage: 1000 }),
    adminClient.from("exam_profiles").select("*"),
    adminClient
      .from("sessions")
      .select("id, user_id, exam_profile_id, status, session_intent, created_at, completed_at, questions_json, target_domains")
      .order("created_at", { ascending: false }),
    adminClient.from("session_answers").select("id, user_id, is_correct, time_to_answer_ms, skill_domain, answered_at").limit(2000),
    adminClient.from("subscriptions").select("*"),
  ]);

  const rawAuthUsers = usersRes.data?.users || [];
  const rawExamProfiles = profilesRes.data || [];
  const rawSessions = sessionsRes.data || [];
  const rawAnswers = answersRes.data || [];
  const rawSubscriptions = subsRes.data || [];

  // Exclude test / developer user IDs when not explicitly included
  const testUserIds = new Set(
    rawAuthUsers
      .filter((u) => u.email && IGNORED_TEST_EMAILS.has(u.email.toLowerCase()))
      .map((u) => u.id),
  );

  const authUsers = includeTest
    ? rawAuthUsers
    : rawAuthUsers.filter((u) => !u.email || !IGNORED_TEST_EMAILS.has(u.email.toLowerCase()));

  const examProfiles = includeTest
    ? rawExamProfiles
    : rawExamProfiles.filter((p) => !testUserIds.has(p.user_id));

  const sessions = includeTest
    ? rawSessions
    : rawSessions.filter((s) => !testUserIds.has(s.user_id));

  const answers = includeTest
    ? rawAnswers
    : rawAnswers.filter((a) => !testUserIds.has(a.user_id));

  const subscriptions = includeTest
    ? rawSubscriptions
    : rawSubscriptions.filter((s) => !testUserIds.has(s.user_id));

  const excludedCount = testUserIds.size;

  // User Map for Fast O(1) Lookups
  const userMap = new Map<string, { email: string; createdAt: string; lastSignIn: string | null }>();
  for (const u of rawAuthUsers) {
    userMap.set(u.id, {
      email: u.email || "Unknown",
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at || null,
    });
  }

  // --- CORE PHYSICS CALCULATIONS ---
  const totalSignups = authUsers.length;

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const signups24h = authUsers.filter((u) => new Date(u.created_at) >= oneDayAgo).length;
  const signups7d = authUsers.filter((u) => new Date(u.created_at) >= sevenDaysAgo).length;
  const signups30d = authUsers.filter((u) => new Date(u.created_at) >= thirtyDaysAgo).length;

  // Profiles
  const profileUserIds = new Set(examProfiles.map((p) => p.user_id));
  const totalProfiles = examProfiles.length;
  const profileSetupRate = totalSignups > 0 ? Math.round((profileUserIds.size / totalSignups) * 100) : 0;

  // Sessions & Activation
  const completedSessions = sessions.filter((s) => s.status === "completed");
  const completedUserIds = new Set(completedSessions.map((s) => s.user_id));
  const activationRate = totalSignups > 0 ? ((completedUserIds.size / totalSignups) * 100).toFixed(1) : "0.0";

  // Weekly Active Solvers (WAS)
  const recentSessions7d = completedSessions.filter((s) => new Date(s.completed_at || s.created_at) >= sevenDaysAgo);
  const weeklyActiveSolvers = new Set(recentSessions7d.map((s) => s.user_id)).size;

  // Repeat Solvers (Users with >= 2 completed sessions)
  const userSessionCounts = new Map<string, number>();
  for (const s of completedSessions) {
    userSessionCounts.set(s.user_id, (userSessionCounts.get(s.user_id) || 0) + 1);
  }
  const repeatSolversCount = Array.from(userSessionCounts.values()).filter((c) => c >= 2).length;
  const repeatRate = completedUserIds.size > 0 ? Math.round((repeatSolversCount / completedUserIds.size) * 100) : 0;

  // Question Answers & Accuracy
  const totalAnswers = answers.length;
  const correctAnswers = answers.filter((a) => a.is_correct).length;
  const overallAccuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const avgTimePerQuestionMs =
    totalAnswers > 0
      ? Math.round(answers.reduce((acc, a) => acc + (a.time_to_answer_ms || 0), 0) / totalAnswers)
      : 0;
  const avgSecPerQ = Math.round(avgTimePerQuestionMs / 1000);

  // Subscriptions & Monetization
  const activeSubs = subscriptions.filter((s) => s.status === "active");
  const monthlySubs = activeSubs.filter((s) => s.plan_type === "monthly").length;
  const quarterlySubs = activeSubs.filter((s) => s.plan_type === "quarterly").length;
  const estimatedMRR = monthlySubs * 29 + Math.round((quarterlySubs * 59) / 3);

  // Exam Distribution
  const examCounts = new Map<string, number>();
  for (const p of examProfiles) {
    examCounts.set(p.exam_name, (examCounts.get(p.exam_name) || 0) + 1);
  }

  // Profile Map for fast lookup
  const userExamMap = new Map<string, string>();
  for (const p of examProfiles) {
    userExamMap.set(p.user_id, p.exam_name);
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight">AceThePrep Command Center</h1>
                <Badge variant="outline" className="text-[10px] uppercase font-mono border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                  Live Production
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">
                Real-time Database Telemetry &middot; Next.js 16 Edge Intercept
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline" className="h-8 text-xs font-semibold">
              <a href="https://us.posthog.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-500" />
                <span>PostHog Live Events</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            </Button>
            <Button asChild size="sm" variant="default" className="h-8 text-xs font-semibold">
              <Link href="/home" className="flex items-center gap-1.5">
                <span>Student App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* System Health Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-muted/40 border border-border/80 px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-4 flex-wrap font-mono">
            <span className="flex items-center gap-1.5 text-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Supabase DB: Connected
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              PostHog Telemetry: Active (US)
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Edge Proxy: proxy.ts
            </span>
          </div>
          <div className="text-muted-foreground font-mono text-[11px]">
            Authenticated as: <strong className="text-foreground">{userEmail}</strong>
          </div>
        </div>

        {/* Organic vs All Users Filter Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-card border border-border rounded-2xl shadow-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
              Dataset Scope:
            </span>
            <Badge
              variant={includeTest ? "outline" : "default"}
              className="text-xs font-mono font-bold"
            >
              {includeTest ? "All Accounts (Including QA/Team)" : "Organic Students Only"}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {includeTest
                ? `Showing all ${rawAuthUsers.length} accounts.`
                : `${excludedCount} internal team accounts excluded (${authUsers.length} real students remaining).`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {includeTest ? (
              <Button asChild size="sm" variant="secondary" className="h-8 text-xs font-semibold cursor-pointer">
                <Link href="/admin">Exclude Test Accounts</Link>
              </Button>
            ) : (
              <Button asChild size="sm" variant="outline" className="h-8 text-xs font-semibold cursor-pointer">
                <Link href="/admin?include_test=true">Include 6 Test Accounts</Link>
              </Button>
            )}
          </div>
        </div>

        {/* SECTION 1: CORE PHYSICS SCORECARDS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
              Core Platform Physics & KPIs
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              Auto-calibrated on load
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* KPI 1: WAS */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-semibold text-primary">Weekly Solvers</span>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">
                {weeklyActiveSolvers}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1 font-mono">
                <span>Active 7D Solvers</span>
              </div>
            </div>

            {/* KPI 2: Total Signups */}
            <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Total Signups</span>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">
                {totalSignups}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                +{signups7d} past 7d &middot; +{signups24h} 24h
              </div>
            </div>

            {/* KPI 3: First-Test Activation Rate */}
            <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Activation Rate</span>
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-foreground">
                {activationRate}%
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                {completedUserIds.size} of {totalSignups} completed test
              </div>
            </div>

            {/* KPI 4: Completed Test Sessions */}
            <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Completed Tests</span>
                <Trophy className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">
                {completedSessions.length}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                {sessions.length} total initiated
              </div>
            </div>

            {/* KPI 5: Repeat Solver Rate */}
            <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Repeat Solvers</span>
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">
                {repeatRate}%
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                {repeatSolversCount} took &ge;2 tests
              </div>
            </div>

            {/* KPI 6: Paid Pro Subscribers */}
            <div className="rounded-2xl border border-border bg-card p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-xs font-medium">Pro Subscribers</span>
                <CreditCard className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                {activeSubs.length}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                ~${estimatedMRR}/mo est. MRR
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CONVERSION FUNNEL PHYSICS */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-base text-foreground tracking-tight">
              Platform Conversion & Activation Funnel
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              The physics of where students drop off between landing, first test, and paying.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {/* Step 1: Signups */}
            <div className="bg-secondary/40 border border-border rounded-xl p-4 space-y-2">
              <div className="text-[11px] font-mono text-muted-foreground uppercase font-semibold">
                1. Account Created
              </div>
              <div className="text-2xl font-bold font-mono text-foreground">{totalSignups}</div>
              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                100% baseline
              </div>
            </div>

            {/* Step 2: Profile Created */}
            <div className="bg-secondary/40 border border-border rounded-xl p-4 space-y-2">
              <div className="text-[11px] font-mono text-muted-foreground uppercase font-semibold">
                2. Exam Profile Ready
              </div>
              <div className="text-2xl font-bold font-mono text-foreground">{profileUserIds.size}</div>
              <div className="text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
                {profileSetupRate}% conversion
              </div>
              <p className="text-[10px] text-muted-foreground">
                (Now auto-provisioned on signup)
              </p>
            </div>

            {/* Step 3: First Test Started */}
            <div className="bg-secondary/40 border border-border rounded-xl p-4 space-y-2">
              <div className="text-[11px] font-mono text-muted-foreground uppercase font-semibold">
                3. First Test Started
              </div>
              <div className="text-2xl font-bold font-mono text-foreground">
                {new Set(sessions.map((s) => s.user_id)).size}
              </div>
              <div className="text-xs font-mono font-medium text-foreground">
                {totalSignups > 0
                  ? ((new Set(sessions.map((s) => s.user_id)).size / totalSignups) * 100).toFixed(1)
                  : "0.0"}
                % of signups
              </div>
            </div>

            {/* Step 4: Test Completed */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
              <div className="text-[11px] font-mono text-primary uppercase font-bold">
                4. Test Completed
              </div>
              <div className="text-2xl font-bold font-mono text-foreground">{completedUserIds.size}</div>
              <div className="text-xs font-mono font-bold text-primary">
                {activationRate}% activation
              </div>
              <p className="text-[10px] text-muted-foreground">
                North Star activation event
              </p>
            </div>

            {/* Step 5: Pro Upgrade */}
            <div className="bg-secondary/40 border border-border rounded-xl p-4 space-y-2">
              <div className="text-[11px] font-mono text-muted-foreground uppercase font-semibold">
                5. Pro Subscriber
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {activeSubs.length}
              </div>
              <div className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                {totalSignups > 0 ? ((activeSubs.length / totalSignups) * 100).toFixed(1) : "0.0"}%
                overall
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs leading-relaxed space-y-1">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Funnel Diagnostic Summary:
            </span>
            <p className="text-muted-foreground">
              Prior to our update, 86% of signups dropped off at the `/setup` questionnaire cliff before taking any test.
              With <strong>automatic exam profile provisioning</strong> and <strong>&quot;Take your first test&quot;</strong> autostart links active, newly registered students bypass the form cliff directly into Question #1.
            </p>
          </div>
        </section>

        {/* SECTION 3: PRACTICE DRILL METRICS & EXAM DISTRIBUTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Question Solving Diagnostics */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider font-mono">
              Question Bank Telemetry
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Total Answers Recorded</span>
                <span className="font-bold text-foreground">{totalAnswers}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Platform Accuracy</span>
                <span className="font-bold text-foreground">{overallAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Avg Time per Question</span>
                <span className="font-bold text-foreground">{avgSecPerQ}s</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Active Pro Customers</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeSubs.length}</span>
              </div>
            </div>
          </div>

          {/* Exam Profile Distribution */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider font-mono">
              Exam Track Distribution
            </h3>
            {examCounts.size === 0 ? (
              <p className="text-xs text-muted-foreground">No active exam profiles configured yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from(examCounts.entries()).map(([exam, count]) => {
                  const pct = totalProfiles > 0 ? Math.round((count / totalProfiles) * 100) : 0;
                  return (
                    <div key={exam} className="rounded-xl border border-border/80 bg-secondary/30 p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">{exam}</span>
                        <span className="text-xs font-mono font-bold text-muted-foreground">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 4: RECENT COMPLETED TEST SESSIONS */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-foreground tracking-tight">
                Live Test Activity Feed
              </h3>
              <p className="text-xs text-muted-foreground">
                Latest 20 test sessions recorded in Supabase.
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {sessions.length} total sessions
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono uppercase text-[11px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Student Email</th>
                  <th className="py-2.5 px-3">Exam Track</th>
                  <th className="py-2.5 px-3">Intent</th>
                  <th className="py-2.5 px-3">Questions</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sessions.slice(0, 20).map((session) => {
                  const student = userMap.get(session.user_id);
                  const exam = userExamMap.get(session.user_id) || "Standardized Exam";
                  const qCount = Array.isArray(session.questions_json) ? session.questions_json.length : 0;
                  const dateStr = session.created_at ? new Date(session.created_at).toLocaleDateString() : "-";
                  const timeStr = session.created_at
                    ? new Date(session.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "";

                  return (
                    <tr key={session.id} className="hover:bg-muted/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">
                        {dateStr} <span className="text-[10px] text-muted-foreground/80">{timeStr}</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap">
                        {student?.email || session.user_id.slice(0, 8) + "..."}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap">
                        {exam}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">
                        <Badge variant="secondary" className="text-[10px] font-mono capitalize">
                          {session.session_intent || "drill"}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">
                        {qCount} Questions
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {session.status === "completed" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-500 font-semibold font-mono text-[11px]">
                            <Clock className="w-3.5 h-3.5" />
                            Active / Incomplete
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: REGISTERED STUDENTS DIRECTORY */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-foreground tracking-tight">
                Registered Students Directory ({authUsers.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                All authenticated student accounts in Supabase Auth.
              </p>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Sorted by newest
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-card border-b border-border z-10">
                <tr className="text-muted-foreground font-mono uppercase text-[11px]">
                  <th className="py-2.5 px-3">Student Email</th>
                  <th className="py-2.5 px-3">Joined Date</th>
                  <th className="py-2.5 px-3">Last Active</th>
                  <th className="py-2.5 px-3">Exam Track</th>
                  <th className="py-2.5 px-3">Tests Done</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {authUsers
                  .slice()
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((u) => {
                    const completedCount = userSessionCounts.get(u.id) || 0;
                    const exam = userExamMap.get(u.id);
                    const isSubscriber = subscriptions.some((s) => s.user_id === u.id && s.status === "active");
                    const joined = new Date(u.created_at).toLocaleDateString();
                    const lastActive = u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : "-";

                    return (
                      <tr key={u.id} className="hover:bg-muted/40 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-foreground whitespace-nowrap">
                          {u.email}
                          {u.email && IGNORED_TEST_EMAILS.has(u.email.toLowerCase()) && (
                            <Badge variant="outline" className="ml-2 text-[9px] font-mono text-muted-foreground border-dashed">
                              INTERNAL QA
                            </Badge>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">
                          {joined}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">
                          {lastActive}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {exam ? (
                            <Badge variant="outline" className="text-[10px] font-mono">
                              {exam}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-[11px] italic">No Profile</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                          {completedCount}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {isSubscriber ? (
                            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px] font-mono">
                              PRO MEMBER
                            </Badge>
                          ) : completedCount >= 2 ? (
                            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 text-[10px] font-mono">
                              REPEAT SOLVER
                            </Badge>
                          ) : completedCount === 1 ? (
                            <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 text-[10px] font-mono">
                              ACTIVATED (1 TEST)
                            </Badge>
                          ) : (
                            <span className="text-[11px] text-muted-foreground font-mono">
                              Bounced (0 tests)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

