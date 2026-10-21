import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  masteryToGRESectionScore,
  sectionScoresToGREComposite,
  greCompositeToPercentile,
  greSectionScoreToPercentile,
  computeGREPrediction,
} from "../predictor/gre-score-engine";

describe("GRE General Score Engine", () => {
  it("maps section mastery to official 130-170 scale", () => {
    assert.equal(masteryToGRESectionScore(0), 130);
    assert.equal(masteryToGRESectionScore(0.5), 150);
    assert.equal(masteryToGRESectionScore(1.0), 170);
    const score75 = masteryToGRESectionScore(0.75);
    assert.ok(score75 >= 158 && score75 <= 164, `Expected 158-164, got ${score75}`);
  });

  it("calculates 2-section composite between 260 and 340", () => {
    // Perfect score
    assert.equal(sectionScoresToGREComposite(170, 170), 340);
    // Minimum score
    assert.equal(sectionScoresToGREComposite(130, 130), 260);
    // Median score
    assert.equal(sectionScoresToGREComposite(150, 150), 300);
    // Competitive score (165 Q, 160 V) -> 325
    assert.equal(sectionScoresToGREComposite(165, 160), 325);
  });

  it("maps composite score to official ETS percentile", () => {
    assert.equal(greCompositeToPercentile(340), 99.9);
    assert.equal(greCompositeToPercentile(330), 95.0);
    assert.equal(greCompositeToPercentile(320), 79.0);
    assert.equal(greCompositeToPercentile(310), 56.0);
    assert.equal(greCompositeToPercentile(300), 31.0);
    assert.equal(greCompositeToPercentile(260), 0.1);
  });

  it("maps section scores to section-specific ETS percentiles", () => {
    // Quant 170 is 94% (skewed distribution)
    assert.equal(greSectionScoreToPercentile(170, "Quant"), 94.0);
    // Verbal 170 is 99%
    assert.equal(greSectionScoreToPercentile(170, "Verbal"), 99.0);
    // Quant 160 vs Verbal 160
    assert.equal(greSectionScoreToPercentile(160, "Quant"), 59.0);
    assert.equal(greSectionScoreToPercentile(160, "Verbal"), 85.0);
  });

  it("sharpens confidence band as tracked sessions increase", () => {
    const cold = computeGREPrediction({
      quantMastery: 0.8,
      verbalMastery: 0.8,
      totalTrackedSessions: 0,
    });
    const calibrated = computeGREPrediction({
      quantMastery: 0.8,
      verbalMastery: 0.8,
      totalTrackedSessions: 20,
    });

    assert.ok(cold.scoreBandWidth > calibrated.scoreBandWidth, "Cold start band must be wider than calibrated");
    assert.ok(cold.scoreBandLower >= 260 && cold.scoreBandUpper <= 340);
    assert.equal(calibrated.calibrationSource, "fully_calibrated");
    assert.equal(cold.calibrationSource, "ets_gre_tables");
  });
});
