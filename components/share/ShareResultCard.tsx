// Path: components/share/ShareResultCard.tsx
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Target,
  CheckCircle2,
} from "lucide-react";
import { QuizDuelPlayer, type QuizDuelQuestion } from "./QuizDuelPlayer";

export interface MasteryDelta {
  domain: string;
  before: number;
  after: number;
}

export interface ShareResultCardProps {
  examName: string;
  score: number;
  total: number;
  pct: number;
  masteryDelta: MasteryDelta[];
  masteredDomains: string[] | null;
  shareToken?: string;
  questions: QuizDuelQuestion[];
}

function getExamSlug(name?: string): string {
  const n = (name || "").toLowerCase();
  if (n.includes("sat")) return "sat";
  if (n.includes("gmat")) return "gmat-focus";
  if (n.includes("gre")) return "gre";
  if (n.includes("cfa")) return "cfa-level-1";
  if (n.includes("ielts")) return "ielts-academic";
  if (n.includes("toefl")) return "toefl-ibt";
  return "sat";
}

export function ShareResultCard({
  examName,
  score,
  total,
  pct,
  masteryDelta,
  masteredDomains,
  shareToken,
  questions,
}: ShareResultCardProps) {
  const examSlug = getExamSlug(examName);
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Challenger Benchmark Bar - Clean, dignified, no alarmist red glows */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {examName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                  Quiz Duel
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Peer Challenge Drill
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-2.5 self-start sm:self-auto">
            <div className="text-right">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Benchmark To Beat
              </p>
              <p className="text-lg font-bold text-white leading-tight">
                {score} / {total}{" "}
                <span className="text-xs font-normal text-slate-400">
                  ({pct}%)
                </span>
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quiz Duel Player: Isolated Hero Component */}
      {questions && questions.length > 0 && (
        <QuizDuelPlayer
          questions={questions}
          challengerScore={score}
          totalQuestions={total}
          examName={examName}
          shareToken={shareToken}
        />
      )}

      {/* Mastered Topics (if present from original challenger run) */}
      {masteredDomains && masteredDomains.length > 0 && (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Challenger Mastered Domains
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {masteredDomains.map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Disjointed Secondary CTA: Physically separated from the question navigation */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-slate-200">
            Want to build your own custom {examName} drills?
          </p>
          <p className="text-xs text-slate-400">
            Practice AI-targeted questions, identify traps, and build your Mistake Vault.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/practice/${examSlug}`}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-medium text-xs transition-all active:scale-95"
          >
            <span>Explore Syllabus</span>
          </Link>
          <Link
            href={`/setup?exam=${examSlug}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-sm active:scale-95"
          >
            <span>Start free prep</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Powered by AceThePrep</span>
        </Link>
      </div>
    </div>
  );
}
