// Path: components/tutor/ExamCalculator.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Calculator, X, Delete } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalculatorState } from "@/components/tutor/useCalculatorState";

interface ExamCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  examName?: string;
}

export function ExamCalculator({ isOpen, onClose, examName = "Exam" }: ExamCalculatorProps) {
  const {
    display,
    equation,
    hasMemory,
    inputDigit,
    inputDecimal,
    inputOperator,
    handleEqual,
    handleClearAll,
    handleClearEntry,
    handleBackspace,
    handleNegate,
    handlePercent,
    handleSqrt,
    handleSquare,
    handleReciprocal,
    handleMemoryClear,
    handleMemoryRecall,
    handleMemoryAdd,
    handleMemorySub,
  } = useCalculatorState();

  // Draggable floating window state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Initialize position to top-right corner on first open
  useEffect(() => {
    if (isOpen && position === null && typeof window !== "undefined") {
      const initialX = Math.max(20, window.innerWidth - 380);
      const initialY = 75;
      setPosition({ x: initialX, y: initialY });
    }
  }, [isOpen, position]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (!position) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 350, e.clientX - dragOffset.current.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 450, e.clientY - dragOffset.current.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Keyboard input listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        inputDigit(e.key);
      } else if (e.key === ".") {
        e.preventDefault();
        inputDecimal();
      } else if (e.key === "+") {
        e.preventDefault();
        inputOperator("+");
      } else if (e.key === "-") {
        e.preventDefault();
        inputOperator("−");
      } else if (e.key === "*") {
        e.preventDefault();
        inputOperator("×");
      } else if (e.key === "/") {
        e.preventDefault();
        inputOperator("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEqual();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        handleClearAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, inputDigit, inputDecimal, inputOperator, handleEqual, handleBackspace, handleClearAll, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dragRef}
      style={{
        transform: position ? `translate3d(${position.x}px, ${position.y}px, 0)` : undefined,
        top: 0,
        left: 0,
      }}
      className={cn(
        "fixed z-50 w-[340px] sm:w-[360px] rounded-2xl border border-border bg-card shadow-2xl transition-shadow select-none overflow-hidden animate-in fade-in zoom-in-95 duration-150",
        !position && "top-20 right-6",
      )}
    >
      {/* Draggable Proctor Header */}
      <div
        onMouseDown={handleMouseDown}
        className="h-11 px-4 border-b border-border bg-secondary/50 flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          <span className="font-heading text-xs font-semibold text-foreground tracking-wide">
            {examName} Calculator
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            Numpad Active
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Precision LCD Display */}
      <div className="p-3.5 space-y-2 bg-card">
        <div className="rounded-xl border border-border/80 bg-secondary/40 p-3 space-y-1 text-right">
          <div className="flex items-center justify-between h-4 text-xs font-mono text-muted-foreground">
            <span className={cn("text-[10px] font-bold px-1 rounded", hasMemory ? "bg-primary/20 text-primary" : "opacity-0")}>
              M
            </span>
            <span className="truncate max-w-[260px]">{equation || "\u00A0"}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-foreground truncate select-all">
            {display}
          </div>
        </div>

        {/* Memory Bar */}
        <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={handleMemoryClear}
            disabled={!hasMemory}
            className="h-7 rounded-md border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            MC
          </button>
          <button
            type="button"
            onClick={handleMemoryRecall}
            disabled={!hasMemory}
            className="h-7 rounded-md border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            MR
          </button>
          <button
            type="button"
            onClick={handleMemoryAdd}
            className="h-7 rounded-md border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
          >
            M+
          </button>
          <button
            type="button"
            onClick={handleMemorySub}
            className="h-7 rounded-md border border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
          >
            M−
          </button>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-1.5 pt-1 font-mono">
          <button type="button" onClick={handleClearAll} className="h-10 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 font-bold text-xs cursor-pointer transition-colors">
            C
          </button>
          <button type="button" onClick={handleClearEntry} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors">
            CE
          </button>
          <button type="button" onClick={handleBackspace} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary flex items-center justify-center cursor-pointer transition-colors" title="Backspace">
            <Delete className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => inputOperator("÷")} className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors">
            ÷
          </button>

          <button type="button" onClick={handleSqrt} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors">
            √
          </button>
          <button type="button" onClick={handleSquare} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors">
            x²
          </button>
          <button type="button" onClick={handleReciprocal} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors">
            1/x
          </button>
          <button type="button" onClick={() => inputOperator("×")} className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors">
            ×
          </button>

          {(["7", "8", "9"] as const).map((num) => (
            <button key={num} type="button" onClick={() => inputDigit(num)} className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors">
              {num}
            </button>
          ))}
          <button type="button" onClick={() => inputOperator("−")} className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors">
            −
          </button>

          {(["4", "5", "6"] as const).map((num) => (
            <button key={num} type="button" onClick={() => inputDigit(num)} className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors">
              {num}
            </button>
          ))}
          <button type="button" onClick={() => inputOperator("+")} className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors">
            +
          </button>

          {(["1", "2", "3"] as const).map((num) => (
            <button key={num} type="button" onClick={() => inputDigit(num)} className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors">
              {num}
            </button>
          ))}
          <button type="button" onClick={handlePercent} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors">
            %
          </button>

          <button type="button" onClick={handleNegate} className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors">
            ±
          </button>
          <button type="button" onClick={() => inputDigit("0")} className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors">
            0
          </button>
          <button type="button" onClick={inputDecimal} className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors">
            .
          </button>
          <button type="button" onClick={handleEqual} className="h-10 rounded-lg border border-primary bg-primary text-primary-foreground font-bold text-base hover:opacity-90 active:scale-95 cursor-pointer transition-all shadow-xs">
            =
          </button>
        </div>

        <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>Esc to Close</span>
          <span>C to Reset</span>
          <span>Enter to Calculate</span>
        </div>
      </div>
    </div>
  );
}
