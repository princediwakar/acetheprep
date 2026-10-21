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
  const isSAT = /sat/i.test(examName);
  const isCFA = /cfa/i.test(examName);

  const [activeMode, setActiveMode] = useState<"standard" | "desmos" | "financial">(
    isSAT ? "desmos" : isCFA ? "financial" : "standard"
  );

  // BA II Plus Financial TVM Registers
  const [tvmN, setTvmN] = useState<number | null>(null);
  const [tvmIY, setTvmIY] = useState<number | null>(null);
  const [tvmPV, setTvmPV] = useState<number | null>(null);
  const [tvmPMT, setTvmPMT] = useState<number | null>(null);
  const [tvmFV, setTvmFV] = useState<number | null>(null);
  const [isCptMode, setIsCptMode] = useState(false);
  const [tvmOutputMsg, setTvmOutputMsg] = useState<string | null>(null);

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
      const initialWidth = activeMode === "desmos" ? 560 : 360;
      const initialX = Math.max(20, window.innerWidth - (initialWidth + 20));
      const initialY = 70;
      setPosition({ x: initialX, y: initialY });
    }
  }, [isOpen, position, activeMode]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("iframe")) return;
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
      const width = activeMode === "desmos" ? 560 : 360;
      const newX = Math.max(10, Math.min(window.innerWidth - width, e.clientX - dragOffset.current.x));
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
  }, [activeMode]);

  // Keyboard input listener
  useEffect(() => {
    if (!isOpen || activeMode === "desmos") return;

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
  }, [isOpen, activeMode, inputDigit, inputDecimal, inputOperator, handleEqual, handleBackspace, handleClearAll, onClose]);

  // TVM Register handler
  const handleTvmKey = (key: "N" | "IY" | "PV" | "PMT" | "FV") => {
    const curVal = parseFloat(display) || 0;

    if (!isCptMode) {
      // Store into register
      if (key === "N") setTvmN(curVal);
      if (key === "IY") setTvmIY(curVal);
      if (key === "PV") setTvmPV(curVal);
      if (key === "PMT") setTvmPMT(curVal);
      if (key === "FV") setTvmFV(curVal);
      setTvmOutputMsg(`SET ${key} = ${curVal}`);
      return;
    }

    // Compute mode
    setIsCptMode(false);
    const n = tvmN ?? 1;
    const r = (tvmIY ?? 0) / 100;
    const pv = tvmPV ?? 0;
    const pmt = tvmPMT ?? 0;
    const fv = tvmFV ?? 0;

    if (key === "FV") {
      let result = 0;
      if (r === 0) {
        result = -(pv + pmt * n);
      } else {
        result = -(pv * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r));
      }
      const rounded = Math.round(result * 10000) / 10000;
      setTvmFV(rounded);
      setTvmOutputMsg(`CPT FV = ${rounded.toFixed(2)}`);
    } else if (key === "PV") {
      let result = 0;
      if (r === 0) {
        result = -(fv + pmt * n);
      } else {
        result = -(fv + pmt * ((Math.pow(1 + r, n) - 1) / r)) / Math.pow(1 + r, n);
      }
      const rounded = Math.round(result * 10000) / 10000;
      setTvmPV(rounded);
      setTvmOutputMsg(`CPT PV = ${rounded.toFixed(2)}`);
    } else if (key === "PMT") {
      let result = 0;
      if (r === 0) {
        result = -(pv + fv) / n;
      } else {
        const factor = (Math.pow(1 + r, n) - 1) / r;
        result = -(pv * Math.pow(1 + r, n) + fv) / factor;
      }
      const rounded = Math.round(result * 10000) / 10000;
      setTvmPMT(rounded);
      setTvmOutputMsg(`CPT PMT = ${rounded.toFixed(2)}`);
    } else if (key === "N") {
      if (r > 0 && pmt === 0 && pv !== 0 && fv !== 0) {
        const ratio = Math.abs(fv / pv);
        const result = Math.log(ratio) / Math.log(1 + r);
        const rounded = Math.round(result * 100) / 100;
        setTvmN(rounded);
        setTvmOutputMsg(`CPT N = ${rounded}`);
      } else {
        setTvmOutputMsg("CPT N requires PV, FV, I/Y");
      }
    } else if (key === "IY") {
      setTvmOutputMsg("I/Y estimation: solve via IRR");
    }
  };

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
        "fixed z-50 rounded-2xl border border-border bg-card shadow-2xl transition-all select-none overflow-hidden animate-in fade-in zoom-in-95 duration-150",
        activeMode === "desmos" ? "w-[540px] sm:w-[580px]" : "w-[340px] sm:w-[360px]",
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
            {examName}
          </span>

          {/* Mode Switchers */}
          {isSAT && (
            <div className="flex items-center rounded-lg border border-border bg-card p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setActiveMode("desmos")}
                className={cn(
                  "px-2 py-0.5 rounded font-medium transition-colors cursor-pointer",
                  activeMode === "desmos" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Desmos Graphing
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("standard")}
                className={cn(
                  "px-2 py-0.5 rounded font-medium transition-colors cursor-pointer",
                  activeMode === "standard" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Standard
              </button>
            </div>
          )}

          {isCFA && (
            <div className="flex items-center rounded-lg border border-border bg-card p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setActiveMode("financial")}
                className={cn(
                  "px-2 py-0.5 rounded font-medium transition-colors cursor-pointer",
                  activeMode === "financial" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                BA II Plus
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("standard")}
                className={cn(
                  "px-2 py-0.5 rounded font-medium transition-colors cursor-pointer",
                  activeMode === "standard" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Standard
              </button>
            </div>
          )}
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

      {/* Body: Desmos Embed or Numeric Keypad */}
      {activeMode === "desmos" ? (
        <div className="w-full h-[480px] bg-card overflow-hidden flex flex-col">
          <iframe
            src="https://www.desmos.com/calculator?embed"
            title="Digital SAT Official Desmos Graphing Calculator"
            className="w-full flex-1 border-0"
            allow="fullscreen"
          />
          <div className="px-3 py-1.5 bg-secondary/40 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-mono">
            <span>Official College Board Digital SAT Desmos Suite</span>
            <button
              type="button"
              onClick={() => setActiveMode("standard")}
              className="text-primary hover:underline cursor-pointer"
            >
              Switch to Standard Calc &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3.5 space-y-2 bg-card">
          {/* Precision LCD Display */}
          <div className="rounded-xl border border-border/80 bg-secondary/40 p-3 space-y-1 text-right">
            <div className="flex items-center justify-between h-4 text-xs font-mono text-muted-foreground">
              <span className={cn("text-[10px] font-bold px-1 rounded", hasMemory ? "bg-primary/20 text-primary" : "opacity-0")}>
                M
              </span>
              <span className="truncate max-w-[260px]">{tvmOutputMsg || equation || "\u00A0"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-foreground truncate select-all">
              {display}
            </div>
          </div>

          {/* BA II Plus Financial TVM Row */}
          {activeMode === "financial" && (
            <div className="space-y-1.5 p-2 rounded-xl bg-secondary/30 border border-border/60">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span className="font-semibold text-primary">BA II Plus TVM Registers:</span>
                <span className="truncate max-w-[200px]">
                  N:{tvmN ?? "-"} I:{tvmIY ?? "-"}% PV:{tvmPV ?? "-"} PMT:{tvmPMT ?? "-"} FV:{tvmFV ?? "-"}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1 font-mono text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsCptMode(!isCptMode)}
                  className={cn(
                    "h-7 rounded border text-[10px] transition-colors cursor-pointer",
                    isCptMode
                      ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                      : "bg-secondary/70 border-border/80 text-foreground hover:bg-secondary"
                  )}
                  title="Compute (Press CPT then N/I/PV/PMT/FV)"
                >
                  CPT
                </button>
                <button
                  type="button"
                  onClick={() => handleTvmKey("N")}
                  className="h-7 rounded border border-border/70 bg-card text-foreground hover:bg-secondary text-[10px] cursor-pointer"
                >
                  N
                </button>
                <button
                  type="button"
                  onClick={() => handleTvmKey("IY")}
                  className="h-7 rounded border border-border/70 bg-card text-foreground hover:bg-secondary text-[10px] cursor-pointer"
                >
                  I/Y
                </button>
                <button
                  type="button"
                  onClick={() => handleTvmKey("PV")}
                  className="h-7 rounded border border-border/70 bg-card text-foreground hover:bg-secondary text-[10px] cursor-pointer"
                >
                  PV
                </button>
                <button
                  type="button"
                  onClick={() => handleTvmKey("PMT")}
                  className="h-7 rounded border border-border/70 bg-card text-foreground hover:bg-secondary text-[10px] cursor-pointer"
                >
                  PMT
                </button>
                <button
                  type="button"
                  onClick={() => handleTvmKey("FV")}
                  className="h-7 rounded border border-border/70 bg-card text-foreground hover:bg-secondary text-[10px] cursor-pointer"
                >
                  FV
                </button>
              </div>
            </div>
          )}

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
      )}
    </div>
  );
}
