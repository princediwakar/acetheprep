"use client";

import React, { useState } from "react";
import { FileText, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MSRTab {
  title: string;
  content: string;
}

interface MultiSourceTabsProps {
  tabs: MSRTab[];
  title?: string;
  className?: string;
  renderContent?: (content: string) => React.ReactNode;
}

export function MultiSourceTabs({
  tabs,
  title,
  className,
  renderContent,
}: MultiSourceTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  const currentTab = tabs[activeTab] || tabs[0];

  return (
    <div
      className={cn(
        "my-4 rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs",
        className
      )}
    >
      {/* Exhibit Header Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/70 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span>{title || "Multi-Source Reasoning Exhibits"}</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider bg-background px-2 py-0.5 rounded border border-border/60">
          {tabs.length} Evidence Sources
        </span>
      </div>

      {/* Interactive Tabs Header */}
      <div className="flex items-center gap-1 px-3 pt-2 pb-0 bg-muted/20 border-b border-border/70 overflow-x-auto">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={cn(
                "px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 border-t border-l border-r cursor-pointer select-none shrink-0 -mb-[1px]",
                isActive
                  ? "bg-card text-primary border-border border-b-card shadow-2xs font-bold"
                  : "bg-transparent text-muted-foreground hover:text-foreground border-transparent hover:bg-muted/30"
              )}
            >
              <FileText className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span>
                {tab.title.startsWith("Tab") || tab.title.startsWith("Exhibit")
                  ? tab.title
                  : `Tab ${idx + 1}: ${tab.title}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display Arena */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans min-h-[120px] bg-card">
        {renderContent ? renderContent(currentTab.content) : currentTab.content}
      </div>
    </div>
  );
}
