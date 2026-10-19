// Path: components/landing/ExamTracksSection.tsx

import Link from "next/link";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { HeaderSection } from "@/components/shared/HeaderSection";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";

interface ExamTrack {
  slug: string;
  name: string;
  badge: string;
  subjects: string[];
  focus: string;
}

const EXAM_TRACKS: ExamTrack[] = [
  {
    slug: "jee-main",
    name: "JEE Main",
    badge: "Engineering",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    focus: "Ray Optics, Rotational Dynamics & Calculus Invariants",
  },
  {
    slug: "neet",
    name: "NEET",
    badge: "Medical",
    subjects: ["Biology", "Physics", "Chemistry"],
    focus: "Mendelian Genetics, Plant Physiology & NCERT Invariants",
  },
  {
    slug: "upsc-cse",
    name: "UPSC CSE",
    badge: "Civil Services",
    subjects: ["CSAT", "Polity & Governance", "Indian Economy"],
    focus: "Syllogistic Deductions, Analytical Traps & Constitutional Law",
  },
  {
    slug: "cat",
    name: "CAT",
    badge: "Management",
    subjects: ["Quantitative Aptitude", "DILR", "VARC"],
    focus: "Time-Speed-Distance Invariants, Arrangements & Critical Reasoning",
  },
  {
    slug: "gate",
    name: "GATE",
    badge: "Technical",
    subjects: ["Engineering Math", "Algorithms", "Operating Systems"],
    focus: "Linear Algebra Eigenvectors, Cache Coherence & Complexity",
  },
  {
    slug: "gmat-focus",
    name: "GMAT Focus",
    badge: "Global MBA",
    subjects: ["Quantitative", "Data Insights", "Verbal"],
    focus: "Sufficiency Traps, Graphical Interpretations & Inference",
  },
  {
    slug: "gre",
    name: "GRE General",
    badge: "Graduate",
    subjects: ["Quantitative", "Verbal Reasoning", "Analytical Writing"],
    focus: "Coordinate Geometry, Vocabulary in Context & Argument Logic",
  },
  {
    slug: "sat",
    name: "Digital SAT",
    badge: "Undergraduate",
    subjects: ["Reading & Writing", "Math"],
    focus: "Desmos Optimization, Quadratic Systems & Rhetorical Synthesis",
  },
  {
    slug: "clat",
    name: "CLAT",
    badge: "Law",
    subjects: ["Legal Reasoning", "Logical Reasoning", "Current Affairs"],
    focus: "Principle-Fact Deductions, Analogies & Constitutional Precedents",
  },
];

export default function ExamTracksSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/70">
      <MaxWidthWrapper>
        <HeaderSection
          label="10 Curated Exam Tracks"
          title="Direct portals tailored to your specific syllabus."
          subtitle="Every exam track features dedicated distractor telemetry, syllabus taxonomies, and calibrated review algorithms."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_TRACKS.map((track) => (
            <Link
              key={track.slug}
              href={`/practice/${track.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:bg-card/95 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                    {track.badge}
                  </span>
                  <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Enter Portal</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="font-heading mt-4 text-xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {track.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground/80 font-medium">Focus:</strong>{" "}
                  {track.focus}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
                {track.subjects.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            <span>View All Exam Portals & Syllabi</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
