// Path: components/blog/MarkdownRenderer.tsx
import React from "react";
import { slugify } from "@/lib/slugs";

/**
 * Parses bold, code, and inline formatting
 */
export function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/**
 * Lightweight, robust markdown-to-JSX renderer for articles.
 * Renders semantic HTML tags without heavy client-side markdown bundles.
 */
export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeader: string[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const flushTable = (key: number) => {
    if (tableHeader.length > 0) {
      elements.push(
        <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/50">
              <tr>
                {tableHeader.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/20">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      tableHeader = [];
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-6 overflow-x-auto rounded-xl bg-slate-900 dark:bg-black/80 p-4 font-mono text-sm text-emerald-400 border border-slate-800"
          >
            <code>{codeBuffer.join("\n")}</code>
          </pre>,
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Table row
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

      // Check if delimiter row
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      inTable = false;
      flushTable(i);
    }

    // Headings with scroll-margin and slug anchors
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      const id = slugify(text);
      elements.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="scroll-mt-24 mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2"
        >
          {text}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      const id = slugify(text);
      elements.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="scroll-mt-24 mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground"
        >
          {text}
        </h3>,
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
        >
          {line.replace("> ", "").trim()}
        </blockquote>,
      );
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      elements.push(<hr key={`hr-${i}`} className="my-8 border-border" />);
      continue;
    }

    // Unordered List item
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const text = line.trim().replace(/^[-*]\s+/, "");
      elements.push(
        <li key={`li-${i}`} className="ml-6 list-disc text-muted-foreground my-1.5 leading-relaxed">
          {renderFormattedText(text)}
        </li>,
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const text = line.trim().replace(/^\d+\.\s+/, "");
      elements.push(
        <li key={`nli-${i}`} className="ml-6 list-decimal text-muted-foreground my-1.5 leading-relaxed">
          {renderFormattedText(text)}
        </li>,
      );
      continue;
    }

    // Paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="my-4 leading-relaxed text-muted-foreground text-base sm:text-lg">
          {renderFormattedText(line)}
        </p>,
      );
    }
  }

  if (inTable) {
    flushTable(lines.length);
  }

  return <div>{elements}</div>;
}
