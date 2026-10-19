// Path: components/landing/SiteFooter.tsx

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { siteConfig } from "@/config/site";

export default function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const footerSections = [
    {
      title: "Exam Tracks",
      items: [
        { title: "JEE Main Practice", href: "/practice/jee-main" },
        { title: "NEET Biology & Physics", href: "/practice/neet" },
        { title: "UPSC CSE & CSAT", href: "/practice/upsc-cse" },
        { title: "CAT Quantitative & DILR", href: "/practice/cat" },
        { title: "GATE Engineering Math", href: "/practice/gate" },
        { title: "GMAT Focus & GRE", href: "/practice/gmat-focus" },
        { title: "All 10 Exam Portals", href: "/practice" },
      ],
    },
    {
      title: "Difficulty Telemetry",
      items: [
        { title: "JEE Main Hardest Topics", href: "/insights/jee-main/hardest-topics" },
        { title: "NEET Most Failed Concepts", href: "/insights/neet/most-failed-concepts" },
        { title: "UPSC CSAT Error Analysis", href: "/insights/upsc-cse/hardest-topics" },
        { title: "CAT Arithmetic Traps", href: "/insights/cat/hardest-topics" },
        { title: "GATE Invariant Traps", href: "/insights/gate/hardest-topics" },
        { title: "All Telemetry Reports", href: "/insights" },
      ],
    },
    {
      title: "Research & Guides",
      items: [
        { title: "The Physics of Forgetting", href: "/blog/physics-of-forgetting-jee-neet" },
        { title: "Science of Distractor Analysis", href: "/blog/distractor-analysis-breaking-score-plateaus" },
        { title: "UPSC CSAT Reasoning Drills", href: "/blog/upsc-csat-reasoning-speed-drills" },
        { title: "All Research Articles", href: "/blog" },
      ],
    },
    {
      title: "Legal & Support",
      items: [
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {siteConfig.name}
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Cognitive-science retrieval practice platform. We track memory decay curves and deconstruct question distractors so you stop forgetting.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span>100% Free</span>
              <span>•</span>
              <span>Zero Cramming</span>
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