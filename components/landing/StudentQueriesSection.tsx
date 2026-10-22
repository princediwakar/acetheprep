// Path: components/landing/StudentQueriesSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExamKey } from "./landing-data";

import { EXAM_STUDENT_FAQS, type StudentFAQItem } from "./student-faqs";

const EXAM_LABELS: Array<{ key: ExamKey; title: string }> = [
  { key: "gmat", title: "GMAT Focus" },
  { key: "sat", title: "Digital SAT" },
  { key: "gre", title: "GRE General" },
  { key: "cfa", title: "CFA Level 1" },
  { key: "ielts", title: "IELTS" },
  { key: "toefl", title: "TOEFL" },
];

export function StudentQueriesSection({ initialExam = "gmat" }: { initialExam?: ExamKey }) {
  const [activeTab, setActiveTab] = useState<ExamKey>(initialExam);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = EXAM_STUDENT_FAQS[activeTab] || EXAM_STUDENT_FAQS.gmat;

  return (
    <section className="relative py-16 sm:py-24 border-t border-border/80 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5 text-foreground" />
            <span>High-Yield Student Queries</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
            Real questions test-takers ask before test day.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Direct, verified answers to timing rules, calculator allowances, scoring algorithms,
            and common psychometric distractor traps.
          </p>
        </div>

        {/* Exam Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {EXAM_LABELS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActiveTab(item.key);
                setOpenIndex(0);
              }}
              className={cn(
                "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer border",
                activeTab === item.key
                  ? "bg-foreground text-background border-foreground shadow-xs"
                  : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-heading font-medium text-sm sm:text-base text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 text-foreground",
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border/60 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <p className="font-sans text-foreground/90">{faq.answer}</p>
                    {faq.drillUrl && (
                      <div className="pt-2">
                        <Link
                          href={faq.drillUrl}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{faq.drillLabel || "Practice this topic on AceThePrep"}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
