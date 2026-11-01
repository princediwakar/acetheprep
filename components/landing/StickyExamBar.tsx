// Path: components/landing/StickyExamBar.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EXAM_TABS } from "@/components/shared/ExamSelectorStrip";
import { LANDING_EXAMS, type ExamKey } from "./landing-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface StickyExamBarProps {
  activeExam: ExamKey;
  onExamChange: (exam: ExamKey) => void;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyExamBar({
  activeExam,
  onExamChange,
  targetRef,
}: StickyExamBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar once the hero selector is no longer visible in the viewport
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-64px 0px 0px 0px", // Offset for fixed 64px header
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  const examConfig = LANDING_EXAMS[activeExam] || LANDING_EXAMS.gmat;
  const drillUrl =
    examConfig.curriculum?.diagnosticDrillUrl ||
    `/practice/${examConfig.curriculum?.slug || activeExam}`;

  return (
    <div
      aria-hidden={!isVisible}
      className={cn(
        "fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/80 shadow-xs transition-all duration-300 ease-out",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Left: Exam Pills Switcher */}
        <div className="flex items-center gap-2 min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
          <span className="text-[11px] font-mono text-muted-foreground uppercase font-semibold shrink-0 hidden sm:inline-flex items-center gap-1">
            <span>Exam:</span>
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {EXAM_TABS.map((item) => {
              const isSelected = activeExam === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onExamChange(item.key)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5",
                    isSelected
                      ? "bg-foreground text-background font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-transparent"
                  )}
                >
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  )}
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Diagnostic Link for currently selected exam */}
        <div className="shrink-0 hidden md:flex items-center gap-2">
          <Link
            href={drillUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <span>Start {examConfig.shortName} Diagnostic</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

