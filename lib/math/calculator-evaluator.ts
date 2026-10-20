// Path: lib/math/calculator-evaluator.ts
/**
 * Safe Shunting-Yard Expression Evaluator (Zero eval(), Zero Security Risk)
 * Evaluates standard arithmetic expressions with precedence, parentheses, and unary negation.
 */

export interface EvaluationResult {
  success: boolean;
  result?: number;
  error?: string;
}

export function evaluateExpression(expr: string): EvaluationResult {
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
