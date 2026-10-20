// Path: components/landing/FormulaSheetModal.tsx
"use client";

import { BookOpen, X } from "lucide-react";

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormulaSheetModal({ isOpen, onClose }: FormulaSheetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 dark:bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-heading text-base font-semibold text-foreground">
              Official SAT & Standardized Geometry Reference Sheet
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Circle</span>
            <p className="text-muted-foreground">Area: A = πr²</p>
            <p className="text-muted-foreground">Circumference: C = 2πr</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Triangle</span>
            <p className="text-muted-foreground">Area: A = ½bh</p>
            <p className="text-muted-foreground">Pythagorean: c² = a² + b²</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Special Right</span>
            <p className="text-muted-foreground">30°-60°-90°: x, x√3, 2x</p>
            <p className="text-muted-foreground">45°-45°-90°: s, s, s√2</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Cylinder & Cone</span>
            <p className="text-muted-foreground">Cylinder: V = πr²h</p>
            <p className="text-muted-foreground">Cone: V = ⅓πr²h</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Sphere</span>
            <p className="text-muted-foreground">Volume: V = ⁴⁄₃πr³</p>
            <p className="text-muted-foreground">Surface: S = 4πr²</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-secondary/30 p-3">
            <span className="font-mono font-semibold text-primary block mb-1">Degree Measures</span>
            <p className="text-muted-foreground">Circle: 360° = 2π rad</p>
            <p className="text-muted-foreground">Triangle interior: 180°</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 cursor-pointer"
          >
            Close Sheet (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
