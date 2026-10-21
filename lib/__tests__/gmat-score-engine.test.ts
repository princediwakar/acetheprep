import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  masteryToSectionScore,
  sectionScoresToComposite,
  compositeToPercentile,
  computeGMATPrediction,
  roundToGMATScore,
} from "../predictor/gmat-score-engine";

describe("GMAT Focus Score Engine", () => {
  it("maps section mastery to official 60-90 scale", () => {
    assert.equal(masteryToSectionScore(0), 60);
    assert.equal(masteryToSectionScore(0.5), 75);
    assert.equal(masteryToSectionScore(1.0), 90);
    assert.equal(masteryToSectionScore(0.85), 86);
  });

  it("calculates 3-section composite between 205 and 805 ending in 5", () => {
    // Perfect score
    assert.equal(sectionScoresToComposite(90, 90, 90), 805);
    // Minimum score
    assert.equal(sectionScoresToComposite(60, 60, 60), 205);
    // Median score (75, 75, 75) -> 505
    assert.equal(sectionScoresToComposite(75, 75, 75), 505);
    // Target 705 (85, 85, 85)
    assert.equal(sectionScoresToComposite(85, 85, 85), 705);
    // Target 645 (82, 82, 82)
    const composite82 = sectionScoresToComposite(82, 82, 82);
    assert.ok(composite82 >= 635 && composite82 <= 655);
    assert.equal(composite82 % 10, 5, "Composite score must end in 5");
  });

  it("maps composite score to GMAC Focus percentile", () => {
    assert.equal(compositeToPercentile(805), 100);
    assert.equal(compositeToPercentile(705), 98.6);
    assert.equal(compositeToPercentile(645), 89);
    assert.equal(compositeToPercentile(555), 50);
  });

  it("sharpens confidence band as tracked sessions increase", () => {
    const cold = computeGMATPrediction({
      quantMastery: 0.7,
      verbalMastery: 0.7,
      diMastery: 0.7,
      totalTrackedSessions: 0,
    });
    const calibrated = computeGMATPrediction({
      quantMastery: 0.7,
      verbalMastery: 0.7,
      diMastery: 0.7,
      totalTrackedSessions: 25,
    });

    assert.ok(cold.scoreBandWidth > calibrated.scoreBandWidth, "Cold start band must be wider than calibrated");
    assert.equal(cold.scoreBandLower % 10, 5);
    assert.equal(cold.scoreBandUpper % 10, 5);
    assert.equal(calibrated.calibrationSource, "fully_calibrated");
    assert.equal(cold.calibrationSource, "gmac_focus_tables");
  });
});
