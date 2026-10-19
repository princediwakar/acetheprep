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
  { to: 50000, suffix: "+", label: "Aspirants Prepared", detail: "Across all 10 tracks" },
  { to: 2, suffix: "M+", label: "Retrieval Drills", detail: "Active recall completions" },
  { to: 10, suffix: "", label: "High-Yield Tracks", detail: "JEE, NEET, UPSC, CAT & more" },
  { to: 94, suffix: "%", label: "Confidence Lift", detail: "Reduced exam-day anxiety" },
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
        <span>Verified Aspirant</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">100% Organic</span>
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
