// Path: components/landing/SocialProofSection.client.tsx
"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TestimonialType } from "@/types";
import { CountUp } from "@/components/shared/CountUp";

// ---------------------------------------------------------------------------
// Stats definitions
// ---------------------------------------------------------------------------

const STATS = [
  { to: 6, suffix: " Global Tracks", label: "Official Curricula", detail: "College Board, ETS, GMAC, CFA Inst." },
  { to: 100, suffix: "%", label: "Distractor Coverage", detail: "Every wrong option diagnosed" },
  { to: 3, suffix: " Gates", label: "SM-2 Recall Intervals", detail: "1-day, 3-day & 7-day memory retention" },
  { to: 0, suffix: "ms", label: "Perceived Latency", detail: "Zero-lag Bluebook & Desmos engine" },
] as const;

// ---------------------------------------------------------------------------
// StatsBar
// ---------------------------------------------------------------------------

function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
    >
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-between rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm"
        >
          <div>
            <span className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
              <CountUp to={stat.to} suffix={stat.suffix} start={inView} />
            </span>
            <p className="mt-1.5 text-xs font-semibold text-foreground uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
          <span className="mt-2 text-[11px] font-mono text-muted-foreground">
            {stat.detail}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TestimonialGrid
// ---------------------------------------------------------------------------

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: TestimonialType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div>
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={44}
            height={44}
            className="rounded-full object-cover border border-border/80"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {testimonial.name}
            </p>
            <p className="truncate text-xs font-medium text-primary">
              {testimonial.job}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {testimonial.location}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Score Verified
        </span>
        <span className="text-muted-foreground">Official Blueprint Aligned</span>
      </div>
    </motion.div>
  );
}

function TestimonialGrid({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <TestimonialCard key={t.name + i} testimonial={t} index={i} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exported client wrapper
// ---------------------------------------------------------------------------

export function SocialProofClient({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) {
  return (
    <div className="space-y-12">
      <StatsBar />
      <TestimonialGrid testimonials={testimonials} />
    </div>
  );
}
