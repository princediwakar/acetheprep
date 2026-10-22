// Path: components/landing/SiteFooter.tsx

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/shared/BrandLogo";

import { SUPPORTED_EXAMS } from "@/lib/constants/exams";

export default function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const footerSections = [
    {
      title: "Supported Exams",
      items: [
        ...SUPPORTED_EXAMS.map((exam) => ({
          title: exam.title,
          href: exam.practiceHref,
        })),
        { title: "View All 6 Global Exams", href: "/practice" },
      ],
    },
    {
      title: "Hardest Topics & Mistakes",
      items: [
        { title: "GMAT Data Sufficiency Traps", href: "/insights/gmat-focus/hardest-topics" },
        { title: "SAT Desmos & Geometry Traps", href: "/insights/sat/hardest-topics" },
        { title: "GRE Quant Comparison Pitfalls", href: "/insights/gre/hardest-topics" },
        { title: "CFA Financial Analysis Errors", href: "/insights/cfa-level-1/hardest-topics" },
        { title: "IELTS True/False/Not Given Nuances", href: "/insights/ielts-academic/hardest-topics" },
        { title: "All Topic Insights", href: "/insights" },
      ],
    },
    {
      title: "Study Guides & Tips",
      items: [
        { title: "IELTS Reading Traps", href: "/blog/ielts-academic-reading-true-false-not-given-traps" },
        { title: "Why We Pick Wrong Answers", href: "/blog/distractor-analysis-breaking-score-plateaus" },
        { title: "Digital SAT Math Traps", href: "/blog/digital-sat-math-desmos-and-algebra-traps" },
        { title: "All Study Guides", href: "/blog" },
      ],
    },
    {
      title: "Tools & Comparisons",
      items: [
        { title: "GMAT Focus Calculator", href: "/tools/gmat-focus-score-calculator" },
        { title: "GRE to GMAT Converter", href: "/tools/gre-to-gmat-converter" },
        { title: "GMAT Focus vs GRE", href: "/compare/gmat-focus-vs-gre" },
        { title: "Percentile Predictor", href: "/predictor" },
        { title: "All Free Tools", href: "/tools" },
        { title: "All Comparisons", href: "/compare" },
      ],
    },
    {
      title: "Pricing & Legal",
      items: [
        { title: "Plans & Pricing", href: "/pricing" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className={cn("border-t border-border bg-background", className)}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {section.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-all hover:text-primary hover:underline"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-full md:col-span-1">
            <BrandLogo size="sm" />
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Adaptive practice platform built for competitive exams. Master common mistakes, build timed recall, and retain concepts with smart review intervals.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span>100% Free</span>
              <span>•</span>
              <span>Zero Guesswork</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}