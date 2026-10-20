// Path: components/tutor/ExamCalculator.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Calculator, X, RotateCcw, Delete } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  examName?: string;
}

// ---------------------------------------------------------------------------
// Safe Shunting-Yard Expression Evaluator (Zero eval(), Zero Security Risk)
// ---------------------------------------------------------------------------

function evaluateExpression(expr: string): { success: boolean; result?: number; error?: string } {
  try {
    const sanitized = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/π/g, `${Math.PI}`);

    const tokens: string[] = [];
    let i = 0;

    while (i < sanitized.length) {
      const ch = sanitized[i];
      if (ch === " ") {
        i++;
        continue;
      }

      if ("+-*/()".includes(ch)) {
        // Handle unary negative
        if (ch === "-" && (tokens.length === 0 || "+-*/(".includes(tokens[tokens.length - 1]))) {
          let numStr = "-";
          i++;
          while (i < sanitized.length && /[0-9.]/.test(sanitized[i])) {
            numStr += sanitized[i];
            i++;
          }
          if (numStr === "-") {
            tokens.push("-1");
            tokens.push("*");
          } else {
            tokens.push(numStr);
          }
          continue;
        }
        tokens.push(ch);
        i++;
      } else if (/[0-9.]/.test(ch)) {
        let numStr = "";
        while (i < sanitized.length && /[0-9.]/.test(sanitized[i])) {
          numStr += sanitized[i];
          i++;
        }
        tokens.push(numStr);
      } else {
        i++;
      }
    }

    if (tokens.length === 0) return { success: true, result: 0 };

    const outputQueue: string[] = [];
    const operatorStack: string[] = [];
    const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        outputQueue.push(token);
      } else if ("+-*/".includes(token)) {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop()!);
        }
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === "(") {
          operatorStack.pop();
        }
      }
    }

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop()!);
    }

    const evalStack: number[] = [];
    for (const token of outputQueue) {
      if (!isNaN(Number(token))) {
        evalStack.push(Number(token));
      } else {
        const b = evalStack.pop();
        const a = evalStack.pop();
        if (a === undefined || b === undefined) return { success: false, error: "Syntax Error" };
        switch (token) {
          case "+":
            evalStack.push(a + b);
            break;
          case "-":
            evalStack.push(a - b);
            break;
          case "*":
            evalStack.push(a * b);
            break;
          case "/":
            if (b === 0) return { success: false, error: "Cannot divide by 0" };
            evalStack.push(a / b);
            break;
        }
      }
    }

    if (evalStack.length !== 1) return { success: false, error: "Syntax Error" };
    const res = evalStack[0];
    if (!isFinite(res) || isNaN(res)) return { success: false, error: "Math Error" };

    // Format clean floating point (e.g. 0.1 + 0.2 = 0.3)
    const rounded = Math.round(res * 1e10) / 1e10;
    return { success: true, result: rounded };
  } catch {
    return { success: false, error: "Error" };
  }
}

export function ExamCalculator({ isOpen, onClose, examName = "Exam" }: ExamCalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState<boolean>(false);
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);

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

  // Handle Dragging
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

  // Calculator Logic Handlers
  const inputDigit = useCallback((digit: string) => {
    setDisplay((prev) => {
      if (isNewNumber || prev === "0" || prev === "Error" || prev === "Cannot divide by 0") {
        setIsNewNumber(false);
        return digit;
      }
      if (prev.length >= 14) return prev;
      return prev + digit;
    });
  }, [isNewNumber]);

  const inputDecimal = useCallback(() => {
    setDisplay((prev) => {
      if (isNewNumber || prev === "Error" || prev === "Cannot divide by 0") {
        setIsNewNumber(false);
        return "0.";
      }
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  }, [isNewNumber]);

  const inputOperator = useCallback((op: string) => {
    setDisplay((prev) => {
      setEquation((prevEq) => {
        if (isNewNumber && prevEq.length > 0 && "+-×÷".includes(prevEq.slice(-1))) {
          return prevEq.slice(0, -1) + op;
        }
        return `${prevEq} ${prev} ${op}`.trim();
      });
      setIsNewNumber(true);
      return prev;
    });
  }, [isNewNumber]);

  const handleEqual = useCallback(() => {
    const fullExpr = `${equation} ${display}`.trim();
    if (!fullExpr) return;

    const res = evaluateExpression(fullExpr);
    if (res.success && res.result !== undefined) {
      setEquation(`${fullExpr} =`);
      setDisplay(String(res.result));
    } else {
      setEquation("");
      setDisplay(res.error || "Error");
    }
    setIsNewNumber(true);
  }, [equation, display]);

  const handleClearAll = useCallback(() => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  }, []);

  const handleClearEntry = useCallback(() => {
    setDisplay("0");
    setIsNewNumber(true);
  }, []);

  const handleBackspace = useCallback(() => {
    setDisplay((prev) => {
      if (isNewNumber || prev === "0" || prev === "Error" || prev.length <= 1) {
        return "0";
      }
      return prev.slice(0, -1);
    });
  }, [isNewNumber]);

  const handleNegate = useCallback(() => {
    setDisplay((prev) => {
      if (prev === "0" || prev === "Error") return prev;
      if (prev.startsWith("-")) return prev.slice(1);
      return `-${prev}`;
    });
  }, []);

  const handlePercent = useCallback(() => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val)) return prev;
      return String(val / 100);
    });
    setIsNewNumber(true);
  }, []);

  const handleSqrt = useCallback(() => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val) || val < 0) return "Invalid input";
      setEquation(`√(${prev}) =`);
      setIsNewNumber(true);
      return String(Math.round(Math.sqrt(val) * 1e10) / 1e10);
    });
  }, []);

  const handleSquare = useCallback(() => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val)) return prev;
      setEquation(`sqr(${prev}) =`);
      setIsNewNumber(true);
      return String(Math.round(val * val * 1e10) / 1e10);
    });
  }, []);

  const handleReciprocal = useCallback(() => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val) || val === 0) return "Cannot divide by 0";
      setEquation(`1/(${prev}) =`);
      setIsNewNumber(true);
      return String(Math.round((1 / val) * 1e10) / 1e10);
    });
  }, []);

  // Memory Handlers
  const handleMemoryClear = useCallback(() => {
    setMemory(0);
    setHasMemory(false);
  }, []);

  const handleMemoryRecall = useCallback(() => {
    if (!hasMemory) return;
    setDisplay(String(memory));
    setIsNewNumber(true);
  }, [hasMemory, memory]);

  const handleMemoryAdd = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setMemory((prev) => prev + val);
      setHasMemory(true);
      setIsNewNumber(true);
    }
  }, [display]);

  const handleMemorySub = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setMemory((prev) => prev - val);
      setHasMemory(true);
      setIsNewNumber(true);
    }
  }, [display]);

  // Physical Keyboard Input Listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
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
        !position && "top-20 right-6"
      )}
    >
      {/* 1. Draggable Proctor Header */}
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

      {/* 2. Precision LCD Display */}
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

        {/* 3. Memory Bar (Official GMAT / GRE standard) */}
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

        {/* 4. Calculator Keypad */}
        <div className="grid grid-cols-4 gap-1.5 pt-1 font-mono">
          {/* Row 1: Special Math Functions */}
          <button
            type="button"
            onClick={handleClearAll}
            className="h-10 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 font-bold text-xs cursor-pointer transition-colors"
          >
            C
          </button>
          <button
            type="button"
            onClick={handleClearEntry}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            CE
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary flex items-center justify-center cursor-pointer transition-colors"
            title="Backspace"
          >
            <Delete className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => inputOperator("÷")}
            className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            type="button"
            onClick={handleSqrt}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            √
          </button>
          <button
            type="button"
            onClick={handleSquare}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            x²
          </button>
          <button
            type="button"
            onClick={handleReciprocal}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            1/x
          </button>
          <button
            type="button"
            onClick={() => inputOperator("×")}
            className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors"
          >
            ×
          </button>

          {/* Row 3: 7 8 9 - */}
          <button
            type="button"
            onClick={() => inputDigit("7")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => inputDigit("8")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => inputDigit("9")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => inputOperator("−")}
            className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors"
          >
            −
          </button>

          {/* Row 4: 4 5 6 + */}
          <button
            type="button"
            onClick={() => inputDigit("4")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => inputDigit("5")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => inputDigit("6")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => inputOperator("+")}
            className="h-10 rounded-lg border border-border/80 bg-secondary text-primary font-bold text-base hover:bg-secondary/80 cursor-pointer transition-colors"
          >
            +
          </button>

          {/* Row 5: 1 2 3 % */}
          <button
            type="button"
            onClick={() => inputDigit("1")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => inputDigit("2")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => inputDigit("3")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            3
          </button>
          <button
            type="button"
            onClick={handlePercent}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            %
          </button>

          {/* Row 6: ± 0 . = */}
          <button
            type="button"
            onClick={handleNegate}
            className="h-10 rounded-lg border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            ±
          </button>
          <button
            type="button"
            onClick={() => inputDigit("0")}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            0
          </button>
          <button
            type="button"
            onClick={inputDecimal}
            className="h-10 rounded-lg border border-border/80 bg-card hover:bg-secondary/70 text-foreground font-semibold text-sm cursor-pointer transition-colors"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEqual}
            className="h-10 rounded-lg border border-primary bg-primary text-primary-foreground font-bold text-base hover:opacity-90 active:scale-95 cursor-pointer transition-all shadow-xs"
          >
            =
          </button>
        </div>

        {/* Footer info: keyboard shortcuts hint */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>Esc to Close</span>
          <span>C to Reset</span>
          <span>Enter to Calculate</span>
        </div>
      </div>
    </div>
  );
}
