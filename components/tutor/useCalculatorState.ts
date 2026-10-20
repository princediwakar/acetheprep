// Path: components/tutor/useCalculatorState.ts
"use client";

import { useState, useCallback } from "react";
import { evaluateExpression } from "@/lib/math/calculator-evaluator";

export function useCalculatorState() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState<boolean>(false);
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);

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

  return {
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
  };
}
