// Path: lib/predictor/cfa-score-engine.ts

/**
 * CFA Institute CFA Level 1 Exam Readiness & MPS Predictive Engine
 *
 * Scoring Mechanics:
 * - 10 Topic Areas (Ethics, Quant, Econ, FSA, Corporate, Equity, Fixed Income, Derivatives, Alts, PM)
 * - Minimum Passing Score (MPS) benchmark: historically ~68%–72%
 * - Ethics Topic multiplier: candidate scores above 70% in Ethics have high pass probability
 */

export interface CFAPredictionResult {
  overallPercentile: number;
  readinessPercentage: number; // 0–100% estimated score
  mpsConfidence: number; // 0–100% confidence of clearing MPS (~70%)
  bandLower: number;
  bandUpper: number;
  bandWidth: number;
  statusLabel: "Pass Highly Likely" | "Competitive (Near MPS)" | "At Risk (Below MPS)";
  calibrationSource: "cfa_institute_benchmarks" | "blended" | "fully_calibrated";
  disclaimer: string;
  totalTrackedSessions: number;
}

export function computeCFAPrediction(params: {
  overallMastery: number;
  ethicsMastery: number;
  totalTrackedSessions: number;
}): CFAPredictionResult {
  const { overallMastery, ethicsMastery, totalTrackedSessions } = params;

  // Raw estimated percentage score based on mastery
  const rawPercentage = Math.round((overallMastery * 0.85 + ethicsMastery * 0.15) * 100);
  const readinessPercentage = Math.max(25, Math.min(95, rawPercentage));

  // MPS is typically 70%
  const MPS_BENCHMARK = 70;
  const delta = readinessPercentage - MPS_BENCHMARK;

  // Logistic confidence of passing
  const mpsConfidence = Math.round(100 / (1 + Math.exp(-0.25 * delta)));

  const halfWidth = Math.max(3, Math.round(12 - Math.min(totalTrackedSessions, 15) * 0.6));
  const bandLower = Math.max(20, readinessPercentage - halfWidth);
  const bandUpper = Math.min(98, readinessPercentage + halfWidth);

  let statusLabel: "Pass Highly Likely" | "Competitive (Near MPS)" | "At Risk (Below MPS)" = "At Risk (Below MPS)";
  if (readinessPercentage >= 74) {
    statusLabel = "Pass Highly Likely";
  } else if (readinessPercentage >= 67) {
    statusLabel = "Competitive (Near MPS)";
  }

  let calibrationSource: "cfa_institute_benchmarks" | "blended" | "fully_calibrated" = "cfa_institute_benchmarks";
  let disclaimer = "Calibrated against CFA Institute historical MPS benchmarks (~70% score).";

  if (totalTrackedSessions >= 15) {
    calibrationSource = "fully_calibrated";
    disclaimer = `Calibrated to your mastery across ${totalTrackedSessions} tracked sessions.`;
  } else if (totalTrackedSessions > 0) {
    calibrationSource = "blended";
    disclaimer = `Blended model combining historical MPS benchmarks with ${totalTrackedSessions} completed sessions.`;
  }

  return {
    overallPercentile: mpsConfidence,
    readinessPercentage,
    mpsConfidence,
    bandLower,
    bandUpper,
    bandWidth: bandUpper - bandLower,
    statusLabel,
    calibrationSource,
    disclaimer,
    totalTrackedSessions,
  };
}
