// Path: components/landing/ExamTracksSection.tsx

import Link from "next/link";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { HeaderSection } from "@/components/shared/HeaderSection";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ExamMark } from "@/components/landing/SupportedExamsBar";

interface ExamTrack {
  id: string;
  slug: string;
  name: string;
  badge: string;
  subjects: string[];
  focus: string;
}

const EXAM_TRACKS: ExamTrack[] = [
  {
    id: "SAT",
    slug: "sat",
    name: "Digital SAT",
    badge: "College Admissions",
    subjects: ["Reading & Writing", "Math"],
    focus: "Desmos Optimization, Quadratic Systems & Rhetorical Synthesis",
  },
  {
    id: "GRE",
    slug: "gre",
    name: "GRE General",
    badge: "Graduate",
    subjects: ["Quantitative", "Verbal Reasoning", "Analytical Writing"],
    focus: "Coordinate Geometry, Vocabulary in Context & Argument Logic",
  },
  {
    id: "GMAT Focus",
    slug: "gmat-focus",
    name: "GMAT Focus",
    badge: "Global MBA",
    subjects: ["Quantitative", "Data Insights", "Verbal"],
    focus: "Data Sufficiency, Graphical Interpretations & Critical Reasoning",
  },
  {
    id: "CFA Level 1",
    slug: "cfa-level-1",
    name: "CFA Level 1",
    badge: "Finance & Investment",
    subjects: ["Financial Reporting", "Ethics", "Fixed Income", "Equity"],
    focus: "Reporting Standards, Duration Sensitivity & Corporate Governance",
  },
  {
    id: "IELTS Academic",
    slug: "ielts-academic",
    name: "IELTS Academic",
    badge: "UK, EU & Global Study",
    subjects: ["Reading", "Listening"],
    focus: "True-False-Not Given Traps, Main Idea Matching & Audio Cue Distractors",
  },
  {
    id: "TOEFL iBT",
    slug: "toefl-ibt",
    name: "TOEFL iBT",
    badge: "US College English",
    subjects: ["Reading", "Listening"],
    focus: "Rhetorical Purpose, Sentence Insertion & Inference Distractors",
  },

  {
    id: "JEE Main",
    slug: "jee-main",
    name: "JEE Main",
    badge: "Engineering",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    focus: "Ray Optics, Rotational Dynamics & Calculus Foundations",
  },
  {
    id: "NEET",
    slug: "neet",
    name: "NEET",
    badge: "Medical",
    subjects: ["Biology", "Physics", "Chemistry"],
    focus: "Mendelian Genetics, Plant Physiology & NCERT Key Concepts",
  },
  {
    id: "CAT",
    slug: "cat",
    name: "CAT",
    badge: "Management",
    subjects: ["Quantitative Aptitude", "DILR", "VARC"],
    focus: "Time-Speed-Distance, Arrangements & Critical Reasoning",
  },
  {
    id: "GATE",
    slug: "gate",
    name: "GATE",
    badge: "Technical",
    subjects: ["Engineering Math", "Algorithms", "Operating Systems"],
    focus: "Linear Algebra Eigenvectors, Cache Coherence & Complexity",
  },
  {
    id: "UPSC CSE",
    slug: "upsc-cse",
    name: "UPSC CSE",
    badge: "Civil Services",
    subjects: ["CSAT", "Polity & Governance", "Indian Economy"],
    focus: "Syllogistic Deductions, Analytical Reasoning & Constitutional Law",
  },
  {
    id: "CLAT",
    slug: "clat",
    name: "CLAT",
    badge: "Law",
    subjects: ["Legal Reasoning", "Logical Reasoning", "Current Affairs"],
    focus: "Principle-Fact Deductions, Analogies & Legal Precedents",
  },
  {
    id: "CA Foundation",
    slug: "ca-foundation",
    name: "CA Foundation",
    badge: "Accounting",
    subjects: ["Accounting", "Business Laws", "Quantitative Aptitude", "Economics"],
    focus: "Contract Act Precedents, Partnership Traps & Annuities",
  },
];

export default function ExamTracksSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/70">
      <MaxWidthWrapper>
        <HeaderSection
          label="Supported Curricula"
          title="Targeted practice built for your exact syllabus."
          subtitle="Every track breaks down common mistakes and trains quick recall for your target exam."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_TRACKS.map((track) => (
            <div
              key={track.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:bg-card/95 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                    {track.badge}
                  </span>
                  <Link
                    href={`/practice/${track.slug}`}
                    className="flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span>Syllabus</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <ExamMark id={track.id} className="h-4.5 w-4.5" />
                  </div>
                  <Link href={`/practice/${track.slug}`}>
                    <h3 className="font-heading text-xl font-medium tracking-tight text-foreground hover:text-primary transition-colors">
                      {track.name}
                    </h3>
                  </Link>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground/80 font-medium">Focus:</strong>{" "}
                  {track.focus}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                  {track.subjects.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/setup?exam=${encodeURIComponent(track.name)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 py-2.5 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Start {track.name} Prep Free</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Exam Portals & Syllabi</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
