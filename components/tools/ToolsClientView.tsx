"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";
import {
  Calculator,
  ArrowLeftRight,
  Activity,
  ArrowRight,
  Sparkles,
  Scale,
} from "lucide-react";

export interface ToolItem {
  title: string;
  slug: string;
  description: string;
  iconName: "calculator" | "converter" | "diagnostic";
  badge: string;
  tags: string[];
  examCategory: "gmat-focus" | "sat" | "ielts" | "toefl" | "cfa" | "gre" | "all";
}

interface ToolsClientViewProps {
  tools: ToolItem[];
}

const FILTER_OPTIONS = [
  { label: "All Tools", value: "" },
  { label: "GMAT Focus", value: "gmat-focus" },
  { label: "Digital SAT", value: "sat" },
  { label: "IELTS", value: "ielts" },
  { label: "TOEFL", value: "toefl" },
  { label: "CFA Level 1", value: "cfa" },
  { label: "GRE", value: "gre" },
];

export function ToolsClientView({ tools }: ToolsClientViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filteredTools = useMemo(() => {
    if (!activeFilter) return tools;
    return tools.filter(
      (t) =>
        t.examCategory === activeFilter ||
        t.examCategory === "all" ||
        t.tags.some((tag) => tag.toLowerCase().includes(activeFilter))
    );
  }, [tools, activeFilter]);

  const getToolIcon = (iconName: ToolItem["iconName"]) => {
    switch (iconName) {
      case "calculator":
        return Calculator;
      case "converter":
        return ArrowLeftRight;
      case "diagnostic":
        return Activity;
      default:
        return Calculator;
    }
  };

  return (
    <div className="space-y-10">
      {/* Canonical Centered PageHero */}
      <PageHero
        badge={
          <HeroBadge icon={Sparkles}>
            Zero-Latency Micro-Tools
          </HeroBadge>
        }
        title="Exam Calculators & Conversion Tools"
        subtitle="High-precision score calculators, percentile converters, and diagnostic benchmark tools built for test-takers and admissions applicants. 0ms client-side calculation with verified psychometric concordance."
      >
        {/* Interactive Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = activeFilter === opt.value;
            const count =
              opt.value === ""
                ? tools.length
                : tools.filter(
                    (t) =>
                      t.examCategory === opt.value ||
                      t.examCategory === "all" ||
                      t.tags.some((tag) => tag.toLowerCase().includes(opt.value))
                  ).length;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActiveFilter(opt.value)}
                className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/80"
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-background text-muted-foreground border border-border/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </PageHero>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTools.map((tool) => {
          const Icon = getToolIcon(tool.iconName);
          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="group rounded-3xl border border-border bg-card p-6 sm:p-7 hover:border-primary/50 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-muted-foreground bg-muted/70 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary">
                <span>Open Interactive Tool</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Cross-Link Callout */}
      <div className="rounded-2xl border border-border bg-secondary/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-foreground">
            Looking for architectural test comparisons?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Explore our head-to-head analyses: GMAT Focus vs GRE and IELTS vs TOEFL.
          </p>
        </div>
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all shrink-0"
        >
          <span>View All Comparisons</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
