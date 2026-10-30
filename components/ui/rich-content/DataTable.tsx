"use client";

import React, { useState, useMemo } from "react";
import Katex from "@matejmazur/react-katex";
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps {
  headers: string[];
  rows: string[][];
  title?: string;
  sortable?: boolean;
  className?: string;
}

// Inline math renderer for cells
function renderCellContent(text: string): React.ReactNode {
  if (!text) return "-";
  if (!text.includes("$")) {
    return text;
  }

  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      return (
        <Katex
          key={idx}
          math={part.slice(2, -2)}
          block={false}
        />
      );
    }
    if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <Katex
          key={idx}
          math={part.slice(1, -1)}
        />
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

// Clean and extract numeric value for sorting (handles $18,000, 25%, 3.5M, etc.)
function parseNumericValue(val: string): number | null {
  if (!val) return null;
  const clean = val.trim().replace(/[$,\s]/g, "");
  
  // Handle suffixes like M (millions), k (thousands), B (billions)
  let multiplier = 1;
  let numStr = clean;

  if (/[0-9]M$/i.test(clean)) {
    multiplier = 1_000_000;
    numStr = clean.slice(0, -1);
  } else if (/[0-9]k$/i.test(clean)) {
    multiplier = 1_000;
    numStr = clean.slice(0, -1);
  } else if (/[0-9]B$/i.test(clean)) {
    multiplier = 1_000_000_000;
    numStr = clean.slice(0, -1);
  } else if (clean.endsWith("%")) {
    numStr = clean.slice(0, -1);
  }

  const num = parseFloat(numStr);
  return isNaN(num) ? null : num * multiplier;
}

export function DataTable({
  headers,
  rows,
  title,
  sortable = true,
  className,
}: DataTableProps) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleHeaderClick = (colIndex: number) => {
    if (!sortable) return;
    if (sortCol === colIndex) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortCol(null);
        setSortDir("asc");
      }
    } else {
      setSortCol(colIndex);
      setSortDir("asc");
    }
  };

  const sortedRows = useMemo(() => {
    if (sortCol === null || sortCol >= headers.length) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      const valA = a[sortCol] ?? "";
      const valB = b[sortCol] ?? "";

      const numA = parseNumericValue(valA);
      const numB = parseNumericValue(valB);

      if (numA !== null && numB !== null) {
        return sortDir === "asc" ? numA - numB : numB - numA;
      }

      return sortDir === "asc"
        ? valA.localeCompare(valB, undefined, { numeric: true })
        : valB.localeCompare(valA, undefined, { numeric: true });
    });
  }, [rows, headers.length, sortCol, sortDir]);

  if (!headers.length && !rows.length) {
    return null;
  }

  return (
    <div className={cn("my-4 rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/40 border-b border-border/70 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground tracking-wide flex items-center gap-1.5">
          {title || "Data Table"}
        </span>
        {sortable && (
          <div className="flex items-center gap-2">
            {sortCol !== null && (
              <button
                type="button"
                onClick={() => setSortCol(null)}
                className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sort</span>
              </button>
            )}
            <span className="text-[10px] uppercase font-mono tracking-wider bg-background/80 px-2 py-0.5 rounded border border-border/60">
              {sortCol !== null ? `Sorted by ${headers[sortCol]} (${sortDir})` : "Click Column to Sort"}
            </span>
          </div>
        )}
      </div>

      {/* Responsive Table Scroll Arena */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="bg-muted/20 border-b border-border/70">
              {headers.map((header, colIdx) => {
                const isSorted = sortCol === colIdx;
                return (
                  <th
                    key={colIdx}
                    onClick={() => handleHeaderClick(colIdx)}
                    className={cn(
                      "px-3.5 py-2.5 font-semibold text-foreground/90 whitespace-nowrap transition-colors",
                      sortable && "cursor-pointer hover:bg-muted/50 select-none",
                      isSorted && "bg-muted/60 text-primary"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{renderCellContent(header)}</span>
                      {sortable && (
                        <span className="shrink-0 text-muted-foreground">
                          {isSorted ? (
                            sortDir === "asc" ? (
                              <ArrowUp className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-primary" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {sortedRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={cn(
                  "transition-colors hover:bg-muted/30",
                  rowIdx % 2 === 1 && "bg-muted/10"
                )}
              >
                {headers.map((_, colIdx) => {
                  const cell = row[colIdx] ?? "";
                  const isNumeric = parseNumericValue(cell) !== null;
                  return (
                    <td
                      key={colIdx}
                      className={cn(
                        "px-3.5 py-2.5 text-foreground/90 leading-relaxed whitespace-nowrap sm:whitespace-normal",
                        isNumeric && "tabular-nums font-mono text-[13px]"
                      )}
                    >
                      {renderCellContent(cell)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

