"use client";

import React, { useMemo } from "react";
import Katex from "@matejmazur/react-katex";
import { DataTable } from "./DataTable";
import { DynamicChart, DynamicChartProps } from "./DynamicChart";
import { MultiSourceTabs, MSRTab } from "./MultiSourceTabs";
import { cn } from "@/lib/utils";

interface RichContentRendererProps {
  content: string;
  className?: string;
  inlineOnly?: boolean;
}

// ----------------------------------------------------
// 1. Text & Inline Math / Formatting Tokenizer
// ----------------------------------------------------
export function protectCurrencyTokens(text: string): { protectedText: string; currencies: string[] } {
  if (!text) return { protectedText: "", currencies: [] };

  // Protect standalone currency tokens like $600, $200, $75, $1,450, $45,000, $4.8M
  // Must NOT match LaTeX math formulas (e.g. $5,000(1.02)^{12}$, math-mode $5,000$, $7$, or $2 - (-4) = 6$)
  const currencyRegex = /(?<=^|[\s("'`“\[])\$((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:[kMB]|k\/mo|\/(?:day|mo|yr|hr|week))?)(?=$|,(?!\d)|\.(?!\d)|[;:!?"'`”\)\]]|\s+(?![-+*/=<>~\\^|≤≥±×÷\(\[\{]|\\[a-zA-Z]+|[a-zA-Z]\b))/g;
  const currencies: string[] = [];
  const protectedText = text.replace(currencyRegex, (match) => {
    currencies.push(match);
    return `__CURRENCY_${currencies.length - 1}__`;
  });

  return { protectedText, currencies };
}

function renderFormattedInlineText(text: string, keyPrefix: string): React.ReactNode[] {
  if (!text) return [];

  const { protectedText, currencies } = protectCurrencyTokens(text);

  // Split on KaTeX math blocks: $$...$$ or $...$
  const mathParts = protectedText.split(/(\$\$.*?\$\$|\$.*?\$)/g);

  return mathParts.map((part, idx) => {
    const key = `${keyPrefix}-math-${idx}`;

    if (part.startsWith("$$") && part.endsWith("$$")) {
      const math = part
        .slice(2, -2)
        .replace(/__CURRENCY_(\d+)__/g, (_, cIdx) => currencies[Number(cIdx)]);
      return (
        <span key={key} className="my-2 block overflow-x-auto text-center">
          <Katex math={math} block />
        </span>
      );
    }
    if (part.startsWith("$") && part.endsWith("$")) {
      const math = part
        .slice(1, -1)
        .replace(/__CURRENCY_(\d+)__/g, (_, cIdx) => currencies[Number(cIdx)]);
      return <Katex key={key} math={math} />;
    }

    // Restore currency in normal text
    const restoredPart = part.replace(
      /__CURRENCY_(\d+)__/g,
      (_, cIdx) => currencies[Number(cIdx)]
    );

    // Process bold text **...** inside plain segments
    const boldParts = restoredPart.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={key}>
        {boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith("**") && bPart.endsWith("**")) {
            return (
              <strong key={`${key}-b-${bIdx}`} className="font-semibold text-foreground">
                {bPart.slice(2, -2)}
              </strong>
            );
          }
          return bPart;
        })}
      </span>
    );
  });
}

// ----------------------------------------------------
// 2. Multi-Source Reasoning (MSR) Tabs Parser
// ----------------------------------------------------
interface ParsedMSRBlock {
  preamble: string;
  tabs: MSRTab[];
  postamble: string;
  raw: string;
}

function extractMSRTabs(text: string): ParsedMSRBlock | null {
  const tabRegex = /(?:^|\n)\s*(?:Tab|Exhibit|Source)\s+(\d+)\s*(?:\(([^)]+)\)|:)?:\s*/gi;
  const matches: { tabNumber: string; title: string; startIndex: number; contentStart: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = tabRegex.exec(text)) !== null) {
    matches.push({
      tabNumber: m[1],
      title: m[2] ? m[2].trim() : `Source ${m[1]}`,
      startIndex: m.index,
      contentStart: tabRegex.lastIndex,
    });
  }

  if (matches.length < 2) return null;

  const tabs: MSRTab[] = [];
  let postamble = "";

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    let content = "";
    if (i < matches.length - 1) {
      content = text.slice(current.contentStart, matches[i + 1].startIndex).trim();
    } else {
      const rest = text.slice(current.contentStart);
      const qMatch = rest.match(/(\n\n+[A-Z][\s\S]+?\?|\.\s+(?:What|Which|Based|How|Assuming|According)\b[\s\S]+?\?)/i);
      if (qMatch && qMatch.index !== undefined) {
        content = rest.slice(0, qMatch.index).trim();
        postamble = rest.slice(qMatch.index).trim().replace(/^\.?\s*/, "");
      } else {
        content = rest.trim();
      }
    }
    // Remove wrapping quotes if any: '...' or "..."
    content = content.replace(/^['"]|['"]$/g, "").trim();
    tabs.push({ title: current.title, content });
  }

  const preamble = text.slice(0, matches[0].startIndex).trim();
  return { preamble, tabs, postamble, raw: text };
}

// ----------------------------------------------------
// 3. Markdown Table Parser
// ----------------------------------------------------
interface ParsedMarkdownTable {
  headers: string[];
  rows: string[][];
  raw: string;
}

function extractMarkdownTable(text: string): ParsedMarkdownTable | null {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  // Check if first line and second line have pipe delimiters
  if (!lines[0].includes("|") || !lines[1].includes("|")) return null;

  // Check if second line is a valid table separator
  const isDivider = /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(lines[1]);
  if (!isDivider) return null;

  const parseRow = (line: string): string[] => {
    let clean = line;
    if (clean.startsWith("|")) clean = clean.slice(1);
    if (clean.endsWith("|")) clean = clean.slice(0, -1);
    return clean.split("|").map((c) => c.trim());
  };

  const headers = parseRow(lines[0]);
  const rows: string[][] = [];

  for (let i = 2; i < lines.length; i++) {
    if (lines[i].includes("|")) {
      rows.push(parseRow(lines[i]));
    } else {
      break;
    }
  }

  if (rows.length === 0) return null;

  const rawTable = lines.slice(0, 2 + rows.length).join("\n");
  return { headers, rows, raw: rawTable };
}

// ----------------------------------------------------
// 4. Legacy Heuristic Table Normalizer (Screenshot Fix)
// ----------------------------------------------------
interface LegacyTableResult {
  preamble: string;
  headers: string[];
  rows: string[][];
  postamble: string;
  title?: string;
}

const KNOWN_ENTITY_NAMES =
  "(?:Product|Division|Company|Partner|Shift|Formulation|Alpha|Beta|Gamma|Delta|Epsilon|Department|Firm|Store|Portfolio|Sample|Option|Model|Region|Group|Brand|Batch|Year|Quarter|Month|Tier|Machine)";

function detectAndExtractLegacyTable(text: string): LegacyTableResult | null {
  if (text.includes("|") && text.includes("---")) return null;
  if (text.includes("```chart")) return null;
  if (/Tab\s+\d+/i.test(text)) return null;

  const prefixPattern = new RegExp(
    `(?:^|[.\\n\\s])(${KNOWN_ENTITY_NAMES}(?:\\s+[A-Za-z0-9]+)?):`,
    "gi"
  );

  const matches: { entity: string; start: number; contentStart: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = prefixPattern.exec(text)) !== null) {
    const offset =
      m[0].startsWith(" ") || m[0].startsWith(".") || m[0].startsWith("\n") ? 1 : 0;
    matches.push({
      entity: m[1].trim(),
      start: m.index + offset,
      contentStart: m.index + offset + m[1].trim().length + 1,
    });
  }

  if (matches.length < 2) return null;

  const records: { entity: string; rawContent: string }[] = [];
  let postamble = "";

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    let rawContent = "";
    if (i < matches.length - 1) {
      rawContent = text.slice(current.contentStart, matches[i + 1].start).trim();
    } else {
      const rest = text.slice(current.contentStart);
      const qMatch = rest.match(/([.?]|\s+(?:Which|What|How|Based|Assuming|Find|If)\b)/i);
      const endPos = qMatch && qMatch.index !== undefined ? qMatch.index : rest.length;
      rawContent = rest.slice(0, endPos).trim();
      postamble = rest.slice(endPos).trim().replace(/^[.?]\s*/, "");
    }
    records.push({ entity: current.entity, rawContent });
  }

  const preamble = text.slice(0, matches[0].start).trim();
  const firstEntityWord = records[0].entity.split(/\s+/)[0];
  const entityColHeader =
    firstEntityWord && firstEntityWord.length > 2 ? firstEntityWord : "Entity";

  const parsedRows: Record<string, string>[] = [];
  const discoveredKeys = new Set<string>();

  for (const rec of records) {
    const parts = rec.rawContent
      .split(/(?:;\s*|,\s*(?=[A-Za-z]))/)
      .map((p) => p.trim())
      .filter(Boolean);

    const rowObj: Record<string, string> = { [entityColHeader]: rec.entity };

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const kvMatch = p.match(/^([A-Za-z\s]+?)\s+([$€£¥]?-?[\d,.]+(?:[%MkB]|k\/mo)?.*)$/i);
      const vkMatch = p.match(/^([$€£¥]?-?[\d,.]+(?:[%MkB]|k\/mo)?)\s+([A-Za-z\s]+.*)$/i);

      if (kvMatch) {
        const key = kvMatch[1].trim().replace(/^./, (s) => s.toUpperCase());
        rowObj[key] = kvMatch[2].trim();
        discoveredKeys.add(key);
      } else if (vkMatch) {
        const key = vkMatch[2].trim().replace(/^./, (s) => s.toUpperCase());
        rowObj[key] = vkMatch[1].trim();
        discoveredKeys.add(key);
      } else {
        const fallbackKey = `Metric ${i + 1}`;
        rowObj[fallbackKey] = p;
        discoveredKeys.add(fallbackKey);
      }
    }
    parsedRows.push(rowObj);
  }

  const headers = [entityColHeader, ...Array.from(discoveredKeys)];
  const rows = parsedRows.map((r) => headers.map((h) => r[h] || "-"));

  return {
    preamble,
    headers,
    rows,
    postamble,
    title: preamble.includes("Table Analysis") ? "Table Analysis Data" : undefined,
  };
}

// ----------------------------------------------------
// 5. Chart Block Parser
// ----------------------------------------------------
interface ParsedChartBlock {
  type: "bar" | "line" | "pie" | "area";
  spec: DynamicChartProps;
  raw: string;
}

function extractChartBlock(text: string): ParsedChartBlock | null {
  const chartRegex = /```chart(?::(bar|line|pie|area))?\s*([\s\S]*?)```/i;
  const match = text.match(chartRegex);
  if (!match) return null;

  const inferredType = (match[1] as "bar" | "line" | "pie" | "area") || "bar";
  const jsonStr = match[2].trim();

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      type: parsed.type || inferredType,
      spec: {
        type: parsed.type || inferredType,
        title: parsed.title,
        xAxis: parsed.xAxis,
        yAxis: parsed.yAxis,
        series: parsed.series,
        data: parsed.data || [],
      },
      raw: match[0],
    };
  } catch (err) {
    console.warn("[RichContentRenderer] Failed to parse chart JSON:", err);
    return null;
  }
}

// ----------------------------------------------------
// 6. Main Component Implementation
// ----------------------------------------------------
export function RichContentRenderer({
  content,
  className,
  inlineOnly = false,
}: RichContentRendererProps) {
  const elements = useMemo(() => {
    if (!content || typeof content !== "string") {
      return null;
    }

    // Fast-path: Inline option or simple text without complex features
    if (
      inlineOnly ||
      (!content.includes("```") &&
        !content.includes("|") &&
        !content.includes("Tab 1") &&
        !content.includes("Tab 2") &&
        !content.includes("Exhibit 1") &&
        !content.includes(":") &&
        !content.includes("\n\n"))
    ) {
      return renderFormattedInlineText(content, "inline");
    }

    // Multi-Source Reasoning (MSR) Check
    const msr = extractMSRTabs(content);
    if (msr) {
      return (
        <div className="space-y-4">
          {msr.preamble && (
            <div className="leading-relaxed font-medium">
              {renderFormattedInlineText(msr.preamble, "msr-preamble")}
            </div>
          )}
          <MultiSourceTabs
            tabs={msr.tabs}
            renderContent={(tabText) => (
              <RichContentRenderer content={tabText} />
            )}
          />
          {msr.postamble && (
            <div className="text-base sm:text-lg font-medium leading-relaxed text-foreground pt-2">
              {renderFormattedInlineText(msr.postamble, "msr-postamble")}
            </div>
          )}
        </div>
      );
    }

    const blocks: React.ReactNode[] = [];
    let remaining = content;
    let blockCounter = 0;

    while (remaining.trim().length > 0) {
      // 1. Check for Chart Blocks
      const chart = extractChartBlock(remaining);
      if (chart) {
        const chartPos = remaining.indexOf(chart.raw);
        if (chartPos > 0) {
          const preText = remaining.slice(0, chartPos).trim();
          if (preText) {
            blocks.push(
              <div key={`block-text-${blockCounter++}`} className="leading-relaxed">
                {renderFormattedInlineText(preText, `pre-${blockCounter}`)}
              </div>
            );
          }
        }
        blocks.push(
          <DynamicChart
            key={`block-chart-${blockCounter++}`}
            type={chart.type}
            title={chart.spec.title}
            xAxis={chart.spec.xAxis}
            yAxis={chart.spec.yAxis}
            series={chart.spec.series}
            data={chart.spec.data}
          />
        );
        remaining = remaining.slice(chartPos + chart.raw.length).trim();
        continue;
      }

      // 2. Check for Markdown Tables
      const mdTable = extractMarkdownTable(remaining);
      if (mdTable) {
        const tablePos = remaining.indexOf(mdTable.raw);
        if (tablePos > 0) {
          const preText = remaining.slice(0, tablePos).trim();
          if (preText) {
            blocks.push(
              <div key={`block-text-${blockCounter++}`} className="leading-relaxed">
                {renderFormattedInlineText(preText, `pre-${blockCounter}`)}
              </div>
            );
          }
        }
        blocks.push(
          <DataTable
            key={`block-table-${blockCounter++}`}
            headers={mdTable.headers}
            rows={mdTable.rows}
          />
        );
        remaining = remaining.slice(tablePos + mdTable.raw.length).trim();
        continue;
      }

      // 3. Check for Legacy Run-On Tables (Screenshot Fix)
      const legacyTable = detectAndExtractLegacyTable(remaining);
      if (legacyTable) {
        if (legacyTable.preamble) {
          blocks.push(
            <div key={`block-preamble-${blockCounter++}`} className="leading-relaxed font-medium">
              {renderFormattedInlineText(legacyTable.preamble, `preamble-${blockCounter}`)}
            </div>
          );
        }
        blocks.push(
          <DataTable
            key={`block-legacy-table-${blockCounter++}`}
            headers={legacyTable.headers}
            rows={legacyTable.rows}
            title={legacyTable.title}
          />
        );
        if (legacyTable.postamble) {
          blocks.push(
            <div key={`block-postamble-${blockCounter++}`} className="leading-relaxed font-medium pt-1">
              {renderFormattedInlineText(legacyTable.postamble, `postamble-${blockCounter}`)}
            </div>
          );
        }
        break;
      }

      // 4. Default: Standard multi-paragraph markdown / math text
      const paragraphs = remaining.split(/\n\n+/);
      paragraphs.forEach((p, pIdx) => {
        const cleanP = p.trim();
        if (cleanP) {
          blocks.push(
            <div key={`block-p-${blockCounter++}-${pIdx}`} className="leading-relaxed">
              {renderFormattedInlineText(cleanP, `p-${blockCounter}-${pIdx}`)}
            </div>
          );
        }
      });
      break;
    }

    return blocks;
  }, [content, inlineOnly]);

  return <div className={cn("space-y-3", className)}>{elements}</div>;
}

// Convenient helper for drop-in replacement
export function renderRichContent(content: string, inlineOnly: boolean = false): React.ReactNode {
  return <RichContentRenderer content={content} inlineOnly={inlineOnly} />;
}
