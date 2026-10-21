// Path: components/landing/DemoHeroHeader.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeSlideUp } from "./demo-data";

interface DemoHeroHeaderProps {
  user: any;
  onGoogleSignIn: () => void;
}

export function DemoHeroHeader({
  user,
  onGoogleSignIn,
}: DemoHeroHeaderProps) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.02 },
        },
      }}
    >
      <motion.div variants={fadeSlideUp}>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-foreground uppercase shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Real Exam Interfaces • Practice Under Pressure
        </span>
      </motion.div>

      <motion.h1
        className="font-heading text-balance text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12]"
        variants={fadeSlideUp}
      >
        You aren&apos;t exam-ready when you finish the syllabus.{" "}
        <span className="text-primary italic font-serif underline decoration-primary/30 decoration-2 underline-offset-4">
          You&apos;re ready when you can solve under pressure.
        </span>
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        variants={fadeSlideUp}
      >
        Reading textbooks won&apos;t prepare you for the clock. Practice inside real exam screens with built-in tools like Desmos, learn why wrong answers look tempting, and build speed before test day.
      </motion.p>

      <motion.div
        variants={fadeSlideUp}
        className="pt-2 flex items-center justify-center"
      >
        {!user ? (
          <button
            type="button"
            onClick={onGoogleSignIn}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary hover:opacity-95 px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Start Free Practice</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            href="/home"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary hover:opacity-95 px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Go to Home</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </motion.div>

      <motion.div
        variants={fadeSlideUp}
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground pt-1 font-mono"
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          Real test-day interface
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          Built-in Desmos calculator
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          Clear explanations for every mistake
        </span>
      </motion.div>
    </motion.div>
  );
}
