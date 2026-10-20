// Path: components/landing/SiteFooter.tsx

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/shared/BrandLogo";

export default function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const footerSections = [
    {
      title: "Supported Exams",
      items: [
        { title: "Digital SAT", href: "/practice/sat" },
        { title: "GRE General", href: "/practice/gre" },
        { title: "GMAT Focus", href: "/practice/gmat-focus" },
        { title: "CFA Level 1", href: "/practice/cfa-level-1" },
        { title: "JEE Main", href: "/practice/jee-main" },
        { title: "NEET Medical", href: "/practice/neet" },
        { title: "View All 13 Exams", href: "/practice" },
      ],
    },
    {
      title: "Hardest Topics & Mistakes",
      items: [
        { title: "JEE Main Hardest Topics", href: "/insights/jee-main/hardest-topics" },
        { title: "NEET High-Yield Concepts", href: "/insights/neet/most-failed-concepts" },
        { title: "UPSC CSAT Logic Analysis", href: "/insights/upsc-cse/hardest-topics" },
        { title: "CAT Quantitative Pitfalls", href: "/insights/cat/hardest-topics" },
        { title: "GATE Common Errors", href: "/insights/gate/hardest-topics" },
        { title: "All Topic Insights", href: "/insights" },
      ],
    },
    {
      title: "Study Guides & Tips",
      items: [
        { title: "The Science of Forgetting", href: "/blog/physics-of-forgetting-jee-neet" },
        { title: "Why We Pick Wrong Answers", href: "/blog/distractor-analysis-breaking-score-plateaus" },
        { title: "Logical Reasoning Speed Drills", href: "/blog/upsc-csat-reasoning-speed-drills" },
        { title: "All Study Guides", href: "/blog" },
      ],
    },
    {
      title: "Pricing & Legal",
      items: [
        { title: "Plans & Pricing", href: "/pricing" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Feedback & Bug Report", href: "/feedback" },
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
            <span>Server-First • Sub-100ms TTFB</span>
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}