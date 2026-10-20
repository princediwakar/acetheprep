// Path: app/insights/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Brain, ArrowRight, Activity, Sparkles } from "lucide-react";
import { getInsightsExams } from "@/lib/insights-queries";
import { examToSlug, GLOBAL_EXAM_PRIORITY } from "@/lib/slugs";
import taxonomyRaw from "@/lib/taxonomies.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hardest Exam Topics & Common Mistakes",
  description:
    "Discover the hardest exam topics and most frequent mistakes across competitive exams like Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, and TOEFL.",
};


const ALL_EXAMS = Object.keys(taxonomyRaw).filter((k) => k !== "_schema_version");

export default async function InsightsPage() {
  let liveExams: string[] = [];

  try {
    liveExams = await getInsightsExams();
  } catch {
    liveExams = [];
  }

  const rawExams = liveExams.length > 0 ? liveExams : ALL_EXAMS;
  const displayExams = [...rawExams].sort((a, b) => {
    const rankA = GLOBAL_EXAM_PRIORITY.indexOf(a);
    const rankB = GLOBAL_EXAM_PRIORITY.indexOf(b);
    return (rankA === -1 ? 999 : rankA) - (rankB === -1 ? 999 : rankB);
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-14 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            <Activity className="h-3.5 w-3.5" />
            Exam Topic Insights
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
            Hardest Exam Topics & Common Mistakes
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Discover where students drop marks most often across major competitive exams. Learn the core principles behind common mistakes so you can solve with confidence.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayExams.map((exam) => {
            const slug = examToSlug(exam);
            return (
              <div
                key={exam}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-mono font-medium text-foreground">
                      {exam}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase">
                      Curriculum
                    </span>
                  </div>

                  <h2 className="font-heading mt-4 text-xl font-medium tracking-tight text-foreground">
                    {exam}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Performance & mistake analytics
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex flex-col gap-2.5">
                  <Link
                    href={`/insights/${slug}/hardest-topics`}
                    className="inline-flex items-center justify-between text-xs font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Brain className="w-3.5 h-3.5 text-primary" />
                      Hardest Topics Ranking
                    </span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={`/insights/${slug}/most-failed-concepts`}
                    className="inline-flex items-center justify-between text-xs font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-primary" />
                      Most Failed Concepts
                    </span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-12">
          Performance data is updated automatically as candidates complete practice sessions on AceThePrep.
        </p>
      </div>
    </div>
  );
}
