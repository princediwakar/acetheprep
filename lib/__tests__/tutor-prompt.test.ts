import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  computeDifficultyDistribution,
  buildTutorUserMessage,
  type TargetDomain,
} from "../tutor-prompt";

describe("computeDifficultyDistribution — Exam-Grade Calibration", () => {
  it("defaults to 0 easy questions and prioritizes hard (advanced/expert) tier", () => {
    const dist10 = computeDifficultyDistribution(10);
    assert.equal(dist10.easy, 0, "Easy questions must be 0 for exam-like rigor");
    assert.equal(dist10.medium, 2, "Medium should be ~25%");
    assert.equal(dist10.hard, 8, "Hard questions should dominate");
    assert.equal(dist10.easy + dist10.medium + dist10.hard, 10);

    const dist5 = computeDifficultyDistribution(5);
    assert.equal(dist5.easy, 0);
    assert.equal(dist5.medium, 1);
    assert.equal(dist5.hard, 4);

    const dist25 = computeDifficultyDistribution(25);
    assert.equal(dist25.easy, 0);
    assert.equal(dist25.medium, 6);
    assert.equal(dist25.hard, 19);
  });
});

describe("buildTutorUserMessage — Uniqueness and Negative Constraints", () => {
  const dummyDomain: TargetDomain = {
    skillDomain: "Kinematics",
    masteryScore: 0.5,
    recentErrors: [],
    isOverdue: false,
    lastSeenAt: null,
  };

  it("injects prior question stems into the prompt to guarantee uniqueness", () => {
    const previousQuestionStems = [
      "A projectile is launched from ground level at an angle of 30 degrees...",
      "A particle moves in a straight line with deceleration proportional to velocity...",
    ];

    const message = buildTutorUserMessage({
      examName: "JEE Main",
      examYear: "2025",
      timeMode: "triage",
      daysRemaining: 30,
      targetDomains: [dummyDomain],
      questionCount: 10,
      difficultyDistribution: { easy: 0, medium: 2, hard: 8 },
      previousQuestionStems,
      entropySeed: "test_seed_123",
    });

    assert.ok(
      message.includes("PREVIOUS QUESTIONS TO EXCLUDE"),
      "Must include previous question exclusions"
    );
    assert.ok(
      message.includes("A projectile is launched"),
      "Must include the specific previous question stems"
    );
    assert.ok(
      message.includes("VARIATION FINGERPRINT: [test_seed_123]"),
      "Must include entropy fingerprint"
    );
    assert.ok(
      message.includes('0 "foundation" tier (Trivial recall forbidden)'),
      "Must explicitly forbid trivial recall"
    );
  });

  it("injects READING COMPREHENSION DIRECTIVE when target domain includes Reading Comprehension", () => {
    const rcDomain: TargetDomain = {
      skillDomain: "Reading Comprehension",
      masteryScore: 0.4,
      recentErrors: [],
      isOverdue: true,
      lastSeenAt: null,
    };

    const message = buildTutorUserMessage({
      examName: "CAT",
      examYear: "2025",
      timeMode: "acceleration",
      daysRemaining: 45,
      targetDomains: [rcDomain],
      questionCount: 4,
      difficultyDistribution: { easy: 0, medium: 1, hard: 3 },
    });

    assert.ok(
      message.includes("READING COMPREHENSION DIRECTIVE:"),
      "Must include RC directive when domain is Reading Comprehension"
    );
    assert.ok(
      message.includes("full authentic passage (350–500 words)"),
      "Must specify 350-500 words authentic passage"
    );
    assert.ok(
      message.includes('identical "passage_id"'),
      "Must instruct LLM to group questions under the same passage_id"
    );
  });

  it("injects GMAT FOCUS 2026 5-CHOICE DIRECTIVE when exam is GMAT Focus", () => {
    const dsDomain: TargetDomain = {
      skillDomain: "Data Sufficiency",
      masteryScore: 0.5,
      recentErrors: [],
      isOverdue: true,
      lastSeenAt: null,
    };

    const message = buildTutorUserMessage({
      examName: "GMAT Focus",
      examYear: "2026",
      timeMode: "acceleration",
      daysRemaining: 68,
      targetDomains: [dsDomain],
      questionCount: 5,
      difficultyDistribution: { easy: 0, medium: 1, hard: 4 },
    });

    assert.ok(
      message.includes("GMAT FOCUS 2026 SPECIFICATION MANDATE:"),
      "Must include GMAT Focus specification mandate"
    );
    assert.ok(
      message.includes("5-CHOICE REQUIREMENT: Every single question MUST provide exactly 5 answer options (A, B, C, D, E)"),
      "Must enforce 5 options"
    );
    assert.ok(
      message.includes("DATA SUFFICIENCY STEM FORMAT"),
      "Must enforce canonical GMAC DS stems"
    );
  });

  it("injects GRE GENERAL 2026 DIRECTIVE when exam is GRE", () => {
    const qcDomain: TargetDomain = {
      skillDomain: "Quantitative Comparison",
      masteryScore: 0.5,
      recentErrors: [],
      isOverdue: true,
      lastSeenAt: null,
    };

    const message = buildTutorUserMessage({
      examName: "GRE",
      examYear: "2026",
      timeMode: "acceleration",
      daysRemaining: 68,
      targetDomains: [qcDomain],
      questionCount: 5,
      difficultyDistribution: { easy: 0, medium: 1, hard: 4 },
    });

    assert.ok(
      message.includes("GRE GENERAL 2026 SPECIFICATION MANDATE:"),
      "Must include GRE specification mandate"
    );
    assert.ok(
      message.includes("QUANTITATIVE COMPARISON (QC)"),
      "Must include QC directive"
    );
    assert.ok(
      message.includes("SENTENCE EQUIVALENCE (SE)"),
      "Must include SE directive with 6 options"
    );
  });
});
