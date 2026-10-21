// Path: lib/priority-engine.ts
// Tiered Priority Engine - core algorithm for topic selection
// Priority Score = (Exam Weight × Knowledge Gap × Forgetting Risk) / min(Estimated Minutes to Mastery, C_tier)

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDomainsForExam } from "@/lib/services/taxonomy";

export type DifficultyTier = "foundation" | "application" | "advanced" | "expert";

export interface ExamTopicWeight {
  id: string;
  exam_name: string;
  subject: string;
  topic: string;
  skill_domain: string;
  difficulty_tier: DifficultyTier;
  exam_weight: number;           // From JEE past-10-year question frequency
  question_frequency_10yr: number; // Raw question count
  c_tier_cap: number | null;     // 75th percentile completion time (minutes)
  estimated_minutes_to_mastery: number | null;
}

export interface PriorityInput {
  userId: string;
  examProfileId: string;
  examName: string;
  masteryScores: Record<string, number>;
  nextReviewDates: Record<string, Date>;
  lastSeenDates: Record<string, Date | null>;
  totalAttempted: Record<string, number>;
  timeMode: "foundation" | "acceleration" | "triage";
  daysRemaining: number;
}

export interface PriorityOutput {
  skillDomain: string;
  priorityScore: number;
  components: {
    examWeight: number;
    knowledgeGap: number;
    forgettingRisk: number;
    estimatedMinutes: number;
    cTierCap: number;
    denominator: number;
  };
  difficultyTier: DifficultyTier;
  subject: string;
}

// Default C_tier caps (minutes) - will be overridden by empirical data
// Values synced with seed-exam-weights.ts
const DEFAULT_C_TIER: Record<DifficultyTier, number> = {
  foundation: 30,
  application: 45,
  advanced: 60,
  expert: 75,
};

// SAT Exam mappings
const SAT_DOMAIN_TO_SUBJECT: Record<string, string> = {
  // Reading & Writing Micro-Skills & Macro-Domains
  "Craft and Structure": "Reading and Writing",
  "Information and Ideas": "Reading and Writing",
  "Standard English Conventions": "Reading and Writing",
  "Expression of Ideas": "Reading and Writing",
  "Words in Context": "Reading and Writing",
  "Text Structure and Purpose": "Reading and Writing",
  "Cross-Text Connections": "Reading and Writing",
  "Central Ideas and Details": "Reading and Writing",
  Inferences: "Reading and Writing",
  "Command of Evidence (Textual)": "Reading and Writing",
  "Command of Evidence (Quantitative)": "Reading and Writing",
  "Boundaries (Punctuation & Splices)": "Reading and Writing",
  "Form, Structure, and Sense": "Reading and Writing",
  "Transitions and Logical Flow": "Reading and Writing",
  "Rhetorical Synthesis": "Reading and Writing",

  // Mathematics Micro-Skills & Macro-Domains
  Algebra: "Mathematics",
  "Advanced Math": "Mathematics",
  "Problem-Solving and Data Analysis": "Mathematics",
  "Geometry and Trigonometry": "Mathematics",
  "Linear Equations in 1 & 2 Variables": "Mathematics",
  "Linear Functions & Graphs": "Mathematics",
  "Systems of Linear Equations": "Mathematics",
  "Linear Inequalities": "Mathematics",
  "Nonlinear Functions & Modeling": "Mathematics",
  "Quadratic Equations & Discriminant": "Mathematics",
  "Exponential Growth & Decay": "Mathematics",
  "Polynomial Operations & Factors": "Mathematics",
  "Ratios, Rates & Proportions": "Mathematics",
  "Percentages & Unit Conversions": "Mathematics",
  "One- & Two-Variable Statistics": "Mathematics",
  "Probability & Data Interpretation": "Mathematics",
  "Lines, Angles & Triangles": "Mathematics",
  "Right Triangles & Trigonometry": "Mathematics",
  "Circles & Theorems": "Mathematics",
};

const SAT_EXAM_WEIGHTS: Record<string, number> = {
  // Macro-Domains
  "Craft and Structure": 0.14,
  "Information and Ideas": 0.13,
  "Standard English Conventions": 0.12,
  "Expression of Ideas": 0.11,
  Algebra: 0.14,
  "Advanced Math": 0.14,
  "Problem-Solving and Data Analysis": 0.12,
  "Geometry and Trigonometry": 0.10,

  // Micro-Skills
  "Words in Context": 0.05,
  "Text Structure and Purpose": 0.05,
  "Cross-Text Connections": 0.04,
  "Central Ideas and Details": 0.05,
  Inferences: 0.04,
  "Command of Evidence (Textual)": 0.05,
  "Command of Evidence (Quantitative)": 0.05,
  "Boundaries (Punctuation & Splices)": 0.06,
  "Form, Structure, and Sense": 0.05,
  "Transitions and Logical Flow": 0.05,
  "Rhetorical Synthesis": 0.05,
  "Linear Equations in 1 & 2 Variables": 0.04,
  "Linear Functions & Graphs": 0.04,
  "Systems of Linear Equations": 0.04,
  "Linear Inequalities": 0.03,
  "Nonlinear Functions & Modeling": 0.04,
  "Quadratic Equations & Discriminant": 0.04,
  "Exponential Growth & Decay": 0.04,
  "Polynomial Operations & Factors": 0.03,
  "Ratios, Rates & Proportions": 0.04,
  "Percentages & Unit Conversions": 0.04,
  "One- & Two-Variable Statistics": 0.04,
  "Probability & Data Interpretation": 0.04,
  "Lines, Angles & Triangles": 0.04,
  "Right Triangles & Trigonometry": 0.04,
  "Circles & Theorems": 0.04,
};

// CFA Level 1 Exam mappings
const CFA_DOMAIN_TO_SUBJECT: Record<string, string> = {
  "Code of Ethics": "Ethical & Professional Standards",
  "Standards of Professional Conduct": "Ethical & Professional Standards",
  "Global Investment Performance Standards (GIPS)": "Ethical & Professional Standards",
  "Time Value of Money": "Quantitative Methods",
  "Statistical Concepts & Market Returns": "Quantitative Methods",
  "Probability Distributions": "Quantitative Methods",
  "Hypothesis Testing": "Quantitative Methods",
  "Simple Linear Regression": "Quantitative Methods",
  "Microeconomic Analysis": "Economics",
  "Monetary and Fiscal Policy": "Economics",
  "International Trade & Capital Flows": "Economics",
  "Currency Exchange Rates": "Economics",
  "Financial Reporting Standards": "Financial Statement Analysis",
  "Income Statements": "Financial Statement Analysis",
  "Balance Sheets": "Financial Statement Analysis",
  "Cash Flow Statements": "Financial Statement Analysis",
  "Inventories & Long-Lived Assets": "Financial Statement Analysis",
  "Financial Analysis Techniques": "Financial Statement Analysis",
  "Corporate Governance": "Corporate Issuers",
  "Working Capital & Liquidity": "Corporate Issuers",
  "Capital Structure": "Corporate Issuers",
  "Capital Investments": "Corporate Issuers",
  "Market Organization & Structure": "Equity Investments",
  "Security Market Indexes": "Equity Investments",
  "Market Efficiency": "Equity Investments",
  "Equity Valuation": "Equity Investments",
  "Fixed-Income Securities": "Fixed Income",
  "Fixed-Income Valuation": "Fixed Income",
  "Asset-Backed Securities": "Fixed Income",
  "Yield & Spread Analysis": "Fixed Income",
  "Credit Analysis": "Fixed Income",
  "Derivative Markets & Instruments": "Derivatives",
  "Forward & Futures Contracts": "Derivatives",
  "Option Basics": "Derivatives",
  Swaps: "Derivatives",
  "Real Estate": "Alternative Investments",
  "Private Equity": "Alternative Investments",
  "Hedge Funds": "Alternative Investments",
  Commodities: "Alternative Investments",
  "Portfolio Risk & Return": "Portfolio Management",
  "Portfolio Planning & Construction": "Portfolio Management",
  "Behavioral Biases": "Portfolio Management",
};

const CFA_EXAM_WEIGHTS: Record<string, number> = {
  // Ethical & Professional Standards (15-20%, ~17.5%)
  "Code of Ethics": 0.07,
  "Standards of Professional Conduct": 0.08,
  "Global Investment Performance Standards (GIPS)": 0.025,

  // Quantitative Methods (6-9%, ~7.5%)
  "Time Value of Money": 0.025,
  "Statistical Concepts & Market Returns": 0.015,
  "Probability Distributions": 0.015,
  "Hypothesis Testing": 0.01,
  "Simple Linear Regression": 0.01,

  // Economics (6-9%, ~7.5%)
  "Microeconomic Analysis": 0.02,
  "Monetary and Fiscal Policy": 0.02,
  "International Trade & Capital Flows": 0.015,
  "Currency Exchange Rates": 0.02,

  // Financial Statement Analysis (11-14%, ~13%)
  "Financial Reporting Standards": 0.02,
  "Income Statements": 0.025,
  "Balance Sheets": 0.025,
  "Cash Flow Statements": 0.025,
  "Inventories & Long-Lived Assets": 0.025,
  "Financial Analysis Techniques": 0.01,

  // Corporate Issuers (6-9%, ~7.5%)
  "Corporate Governance": 0.02,
  "Working Capital & Liquidity": 0.02,
  "Capital Structure": 0.02,
  "Capital Investments": 0.015,

  // Equity Investments (11-14%, ~12.5%)
  "Market Organization & Structure": 0.025,
  "Security Market Indexes": 0.025,
  "Market Efficiency": 0.025,
  "Equity Valuation": 0.05,

  // Fixed Income (11-14%, ~12.5%)
  "Fixed-Income Securities": 0.025,
  "Fixed-Income Valuation": 0.035,
  "Asset-Backed Securities": 0.02,
  "Yield & Spread Analysis": 0.025,
  "Credit Analysis": 0.02,

  // Derivatives (5-8%, ~6%)
  "Derivative Markets & Instruments": 0.015,
  "Forward & Futures Contracts": 0.015,
  "Option Basics": 0.02,
  Swaps: 0.01,

  // Alternative Investments (7-10%, ~8%)
  "Real Estate": 0.02,
  "Private Equity": 0.025,
  "Hedge Funds": 0.02,
  Commodities: 0.015,

  // Portfolio Management (8-11%, ~8.5%)
  "Portfolio Risk & Return": 0.035,
  "Portfolio Planning & Construction": 0.03,
  "Behavioral Biases": 0.02,
};

// GMAT Focus exam section question weights (calibrated to official GMAC question distributions)
const GMAT_EXAM_WEIGHTS: Record<string, number> = {
  // Quantitative Reasoning (21 Qs)
  Arithmetic: 0.13,
  Algebra: 0.10,
  "Number Properties": 0.12,
  "Word Problems (Rates & Work)": 0.08,
  "Word Problems (Overlapping Sets)": 0.08,
  "Counting & Probability": 0.07,
  "Applied Statistics": 0.06,

  // Verbal Reasoning (23 Qs)
  "Reading Comprehension": 0.14,
  "Critical Reasoning": 0.12,
  "CR: Assumption & Flaw": 0.08,
  "CR: Strengthen & Weaken": 0.08,
  "CR: Inference & Conclusion": 0.07,
  "CR: Boldface & Method of Reasoning": 0.05,
  "RC: Main Idea & Primary Purpose": 0.08,
  "RC: Inference & Specific Detail": 0.09,
  "RC: Structure, Tone & Organization": 0.06,

  // Data Insights (20 Qs)
  "Data Sufficiency": 0.16,
  "DS: Value Questions (Unique Solution)": 0.08,
  "DS: Yes/No Questions (Invariant Answer)": 0.08,
  "DS: Number Properties & Inequalities": 0.07,
  "Two-Part Analysis": 0.12,
  "Two-Part Analysis: Quantitative": 0.07,
  "Two-Part Analysis: Logical": 0.06,
  "Table Analysis": 0.10,
  "Graphics Interpretation": 0.09,
  "Multi-Source Reasoning": 0.07,
};

const GMAT_DOMAIN_TO_SUBJECT: Record<string, string> = {
  Arithmetic: "Quantitative Reasoning",
  Algebra: "Quantitative Reasoning",
  "Number Properties": "Quantitative Reasoning",
  "Word Problems (Rates & Work)": "Quantitative Reasoning",
  "Word Problems (Overlapping Sets)": "Quantitative Reasoning",
  "Counting & Probability": "Quantitative Reasoning",
  "Applied Statistics": "Quantitative Reasoning",

  "Reading Comprehension": "Verbal Reasoning",
  "Critical Reasoning": "Verbal Reasoning",
  "CR: Assumption & Flaw": "Verbal Reasoning",
  "CR: Strengthen & Weaken": "Verbal Reasoning",
  "CR: Inference & Conclusion": "Verbal Reasoning",
  "CR: Boldface & Method of Reasoning": "Verbal Reasoning",
  "RC: Main Idea & Primary Purpose": "Verbal Reasoning",
  "RC: Inference & Specific Detail": "Verbal Reasoning",
  "RC: Structure, Tone & Organization": "Verbal Reasoning",

  "Data Sufficiency": "Data Insights",
  "DS: Value Questions (Unique Solution)": "Data Insights",
  "DS: Yes/No Questions (Invariant Answer)": "Data Insights",
  "DS: Number Properties & Inequalities": "Data Insights",
  "Two-Part Analysis": "Data Insights",
  "Two-Part Analysis: Quantitative": "Data Insights",
  "Two-Part Analysis: Logical": "Data Insights",
  "Table Analysis": "Data Insights",
  "Graphics Interpretation": "Data Insights",
  "Multi-Source Reasoning": "Data Insights",
};

const GMAT_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  Arithmetic: "application",
  Algebra: "advanced",
  "Number Properties": "advanced",
  "Word Problems (Rates & Work)": "application",
  "Word Problems (Overlapping Sets)": "application",
  "Counting & Probability": "advanced",
  "Applied Statistics": "application",

  "Reading Comprehension": "advanced",
  "Critical Reasoning": "advanced",
  "CR: Assumption & Flaw": "advanced",
  "CR: Strengthen & Weaken": "advanced",
  "CR: Inference & Conclusion": "advanced",
  "CR: Boldface & Method of Reasoning": "expert",
  "RC: Main Idea & Primary Purpose": "application",
  "RC: Inference & Specific Detail": "advanced",
  "RC: Structure, Tone & Organization": "advanced",

  "Data Sufficiency": "advanced",
  "DS: Value Questions (Unique Solution)": "advanced",
  "DS: Yes/No Questions (Invariant Answer)": "advanced",
  "DS: Number Properties & Inequalities": "expert",
  "Two-Part Analysis": "advanced",
  "Two-Part Analysis: Quantitative": "advanced",
  "Two-Part Analysis: Logical": "advanced",
  "Table Analysis": "application",
  "Graphics Interpretation": "application",
  "Multi-Source Reasoning": "expert",
};

// GRE General Exam section topic weights (calibrated to ETS 2024–2026 Shorter GRE)
const GRE_EXAM_WEIGHTS: Record<string, number> = {
  // Quantitative Reasoning (~27 Qs total across 2 sections)
  Arithmetic: 0.08,
  Algebra: 0.09,
  Geometry: 0.08,
  "Data Analysis": 0.08,
  "Quantitative Comparison": 0.14,
  "QC: Arithmetic & Number Properties": 0.08,
  "QC: Algebra & Inequalities": 0.09,
  "QC: Geometry & Coordinate Traps": 0.07,
  "Number Properties & Divisibility": 0.09,
  "Word Problems & Applied Math": 0.08,
  "Counting Methods & Probability": 0.07,
  "Statistics & Data Interpretation": 0.08,

  // Verbal Reasoning (~27 Qs total across 2 sections)
  "Text Completion": 0.14,
  "Sentence Equivalence": 0.12,
  "Reading Comprehension": 0.16,
  "TC: Single-Blank Vocabulary": 0.07,
  "TC: Two-Blank Contrast & Shift": 0.08,
  "TC: Three-Blank Complex Logic": 0.08,
  "SE: Synonym Pairs & Secondary Meanings": 0.08,
  "SE: Context Clues & Tone": 0.07,
  "RC: Main Idea & Primary Purpose": 0.08,
  "RC: Inference & Specific Detail": 0.09,
  "RC: Argument Analysis & Paradox": 0.08,
  "RC: Structure, Tone & Author Stance": 0.07,

  // Analytical Writing
  "Analyze an Issue": 0.06,
  "Issue: Thesis & Supporting Evidence": 0.05,
  "Issue: Counterargument & Rebuttal": 0.05,
};

const GRE_DOMAIN_TO_SUBJECT: Record<string, string> = {
  Arithmetic: "Quantitative Reasoning",
  Algebra: "Quantitative Reasoning",
  Geometry: "Quantitative Reasoning",
  "Data Analysis": "Quantitative Reasoning",
  "Quantitative Comparison": "Quantitative Reasoning",
  "QC: Arithmetic & Number Properties": "Quantitative Reasoning",
  "QC: Algebra & Inequalities": "Quantitative Reasoning",
  "QC: Geometry & Coordinate Traps": "Quantitative Reasoning",
  "Number Properties & Divisibility": "Quantitative Reasoning",
  "Word Problems & Applied Math": "Quantitative Reasoning",
  "Counting Methods & Probability": "Quantitative Reasoning",
  "Statistics & Data Interpretation": "Quantitative Reasoning",

  "Text Completion": "Verbal Reasoning",
  "Sentence Equivalence": "Verbal Reasoning",
  "Reading Comprehension": "Verbal Reasoning",
  "TC: Single-Blank Vocabulary": "Verbal Reasoning",
  "TC: Two-Blank Contrast & Shift": "Verbal Reasoning",
  "TC: Three-Blank Complex Logic": "Verbal Reasoning",
  "SE: Synonym Pairs & Secondary Meanings": "Verbal Reasoning",
  "SE: Context Clues & Tone": "Verbal Reasoning",
  "RC: Main Idea & Primary Purpose": "Verbal Reasoning",
  "RC: Inference & Specific Detail": "Verbal Reasoning",
  "RC: Argument Analysis & Paradox": "Verbal Reasoning",
  "RC: Structure, Tone & Author Stance": "Verbal Reasoning",

  "Analyze an Issue": "Analytical Writing",
  "Issue: Thesis & Supporting Evidence": "Analytical Writing",
  "Issue: Counterargument & Rebuttal": "Analytical Writing",
};

const GRE_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  Arithmetic: "foundation",
  Algebra: "application",
  Geometry: "application",
  "Data Analysis": "application",
  "Quantitative Comparison": "advanced",
  "QC: Arithmetic & Number Properties": "application",
  "QC: Algebra & Inequalities": "advanced",
  "QC: Geometry & Coordinate Traps": "advanced",
  "Number Properties & Divisibility": "advanced",
  "Word Problems & Applied Math": "application",
  "Counting Methods & Probability": "advanced",
  "Statistics & Data Interpretation": "application",

  "Text Completion": "advanced",
  "Sentence Equivalence": "advanced",
  "Reading Comprehension": "advanced",
  "TC: Single-Blank Vocabulary": "application",
  "TC: Two-Blank Contrast & Shift": "advanced",
  "TC: Three-Blank Complex Logic": "expert",
  "SE: Synonym Pairs & Secondary Meanings": "advanced",
  "SE: Context Clues & Tone": "application",
  "RC: Main Idea & Primary Purpose": "application",
  "RC: Inference & Specific Detail": "advanced",
  "RC: Argument Analysis & Paradox": "advanced",
  "RC: Structure, Tone & Author Stance": "application",

  "Analyze an Issue": "application",
  "Issue: Thesis & Supporting Evidence": "application",
  "Issue: Counterargument & Rebuttal": "advanced",
};

// IELTS Academic section weights (calibrated to Cambridge Assessment specifications)
const IELTS_EXAM_WEIGHTS: Record<string, number> = {
  // Reading (40 Qs, Band 1.0–9.0)
  "True-False-Not Given": 0.16,
  "TFNG: Modal Qualification": 0.10,
  "TFNG: Factual Contradiction": 0.08,
  "TFNG: Unstated & Not Given": 0.08,
  "Headings and Main Idea Matching": 0.15,
  "Heading: Overly Specific Distractors": 0.08,
  "Summary Completion": 0.12,
  "Sentence Completion": 0.09,
  "Inference and Implication": 0.11,
  "Academic Vocabulary in Context": 0.10,
  "Matching Information to Paragraphs": 0.11,

  // Listening (40 Qs, Band 1.0–9.0)
  "Multiple Choice Traps": 0.15,
  "Conversational Self-Correction Traps": 0.12,
  "Form and Note Completion": 0.15,
  "Map and Diagram Labelling": 0.12,
  "Classification of Features": 0.10,
  "Short Answer Comprehension": 0.10,
  "Academic Lecture Gist": 0.12,

  // Writing (Task 1 & Task 2)
  "Task 1: Data Synthesis": 0.12,
  "Task 1: Process & Map": 0.10,
  "Task 2: Task Response (TR)": 0.18,
  "Task 2: Coherence & Cohesion (CC)": 0.16,
  "Task 2: Lexical Resource (LR)": 0.14,
  "Task 2: Grammatical Range & Accuracy (GRA)": 0.14,

  // Speaking
  "Part 1: Personal Interview": 0.08,
  "Part 2: Long Turn (Cue Card)": 0.14,
  "Part 3: Discussion & Discourse": 0.16,
  "Pronunciation & Intonation": 0.12,
};

const IELTS_DOMAIN_TO_SUBJECT: Record<string, string> = {
  "True-False-Not Given": "Reading",
  "TFNG: Modal Qualification": "Reading",
  "TFNG: Factual Contradiction": "Reading",
  "TFNG: Unstated & Not Given": "Reading",
  "Headings and Main Idea Matching": "Reading",
  "Heading: Overly Specific Distractors": "Reading",
  "Summary Completion": "Reading",
  "Sentence Completion": "Reading",
  "Inference and Implication": "Reading",
  "Academic Vocabulary in Context": "Reading",
  "Matching Information to Paragraphs": "Reading",

  "Multiple Choice Traps": "Listening",
  "Conversational Self-Correction Traps": "Listening",
  "Form and Note Completion": "Listening",
  "Map and Diagram Labelling": "Listening",
  "Classification of Features": "Listening",
  "Short Answer Comprehension": "Listening",
  "Academic Lecture Gist": "Listening",

  "Task 1: Data Synthesis": "Writing",
  "Task 1: Process & Map": "Writing",
  "Task 2: Task Response (TR)": "Writing",
  "Task 2: Coherence & Cohesion (CC)": "Writing",
  "Task 2: Lexical Resource (LR)": "Writing",
  "Task 2: Grammatical Range & Accuracy (GRA)": "Writing",

  "Part 1: Personal Interview": "Speaking",
  "Part 2: Long Turn (Cue Card)": "Speaking",
  "Part 3: Discussion & Discourse": "Speaking",
  "Pronunciation & Intonation": "Speaking",
};

const IELTS_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  "True-False-Not Given": "advanced",
  "TFNG: Modal Qualification": "expert",
  "TFNG: Factual Contradiction": "application",
  "TFNG: Unstated & Not Given": "advanced",
  "Headings and Main Idea Matching": "advanced",
  "Heading: Overly Specific Distractors": "advanced",
  "Summary Completion": "application",
  "Sentence Completion": "application",
  "Inference and Implication": "advanced",
  "Academic Vocabulary in Context": "application",
  "Matching Information to Paragraphs": "advanced",

  "Multiple Choice Traps": "advanced",
  "Conversational Self-Correction Traps": "advanced",
  "Form and Note Completion": "foundation",
  "Map and Diagram Labelling": "application",
  "Classification of Features": "application",
  "Short Answer Comprehension": "application",
  "Academic Lecture Gist": "advanced",

  "Task 1: Data Synthesis": "advanced",
  "Task 1: Process & Map": "application",
  "Task 2: Task Response (TR)": "expert",
  "Task 2: Coherence & Cohesion (CC)": "advanced",
  "Task 2: Lexical Resource (LR)": "advanced",
  "Task 2: Grammatical Range & Accuracy (GRA)": "advanced",

  "Part 1: Personal Interview": "foundation",
  "Part 2: Long Turn (Cue Card)": "application",
  "Part 3: Discussion & Discourse": "advanced",
  "Pronunciation & Intonation": "advanced",
};

// TOEFL iBT section weights (calibrated to ETS 2023–2026 format)
const TOEFL_EXAM_WEIGHTS: Record<string, number> = {
  // Reading (20 Qs, 0–30 scaled)
  "Factual Information": 0.16,
  "Negative Factual Information": 0.14,
  "Inference and Rhetorical Purpose": 0.15,
  "Vocabulary in Context": 0.14,
  "Sentence Simplification": 0.15,
  "Insert Text": 0.13,
  "Prose Summary": 0.18,
  "Insert Text [■] Placement": 0.11,
  "Prose Summary Traps": 0.12,
  "Purpose and Method": 0.10,

  // Listening (28 Qs, 0–30 scaled)
  "Gist-Content and Purpose": 0.14,
  "Detail Identification": 0.15,
  "Function and Speaker Stance": 0.15,
  "Organization and Categorization": 0.12,
  "Connecting Content": 0.13,
  "Lecture Topic Structure": 0.12,
  "Conversational Register": 0.10,

  // Speaking (0–30 scaled)
  "Independent Speaking (Q1)": 0.12,
  "Integrated Campus Speech (Q2)": 0.14,
  "Integrated Academic Concept (Q3)": 0.15,
  "Integrated Lecture (Q4)": 0.15,

  // Writing (0–30 scaled)
  "Integrated Writing: Lecture Refutation": 0.22,
  "Academic Discussion: Contribution": 0.20,
  "Syntactic Variety & Cohesion": 0.12,
  "Grammatical Precision": 0.12,
};

const TOEFL_DOMAIN_TO_SUBJECT: Record<string, string> = {
  "Factual Information": "Reading",
  "Negative Factual Information": "Reading",
  "Inference and Rhetorical Purpose": "Reading",
  "Vocabulary in Context": "Reading",
  "Sentence Simplification": "Reading",
  "Insert Text": "Reading",
  "Prose Summary": "Reading",
  "Insert Text [■] Placement": "Reading",
  "Prose Summary Traps": "Reading",
  "Purpose and Method": "Reading",

  "Gist-Content and Purpose": "Listening",
  "Detail Identification": "Listening",
  "Function and Speaker Stance": "Listening",
  "Organization and Categorization": "Listening",
  "Connecting Content": "Listening",
  "Lecture Topic Structure": "Listening",
  "Conversational Register": "Listening",

  "Independent Speaking (Q1)": "Speaking",
  "Integrated Campus Speech (Q2)": "Speaking",
  "Integrated Academic Concept (Q3)": "Speaking",
  "Integrated Lecture (Q4)": "Speaking",

  "Integrated Writing: Lecture Refutation": "Writing",
  "Academic Discussion: Contribution": "Writing",
  "Syntactic Variety & Cohesion": "Writing",
  "Grammatical Precision": "Writing",
};

const TOEFL_DEFAULT_DIFFICULTY_TIER: Record<string, DifficultyTier> = {
  "Factual Information": "application",
  "Negative Factual Information": "advanced",
  "Inference and Rhetorical Purpose": "advanced",
  "Vocabulary in Context": "foundation",
  "Sentence Simplification": "advanced",
  "Insert Text": "application",
  "Prose Summary": "expert",
  "Insert Text [■] Placement": "application",
  "Prose Summary Traps": "advanced",
  "Purpose and Method": "application",

  "Gist-Content and Purpose": "foundation",
  "Detail Identification": "application",
  "Function and Speaker Stance": "advanced",
  "Organization and Categorization": "advanced",
  "Connecting Content": "advanced",
  "Lecture Topic Structure": "application",
  "Conversational Register": "application",

  "Independent Speaking (Q1)": "application",
  "Integrated Campus Speech (Q2)": "application",
  "Integrated Academic Concept (Q3)": "advanced",
  "Integrated Lecture (Q4)": "advanced",

  "Integrated Writing: Lecture Refutation": "advanced",
  "Academic Discussion: Contribution": "advanced",
  "Syntactic Variety & Cohesion": "application",
  "Grammatical Precision": "application",
};

// Forgetting curve parameters by time mode
const FORGETTING_PARAMS = {
  foundation: { halfLifeDays: 30, steepness: 0.8 },
  acceleration: { halfLifeDays: 14, steepness: 1.0 },
  triage: { halfLifeDays: 7, steepness: 1.2 },
};

/**
 * Compute forgetting risk based on time since last review
 * Risk = 1 - exp(-ln(2) * daysSinceReview / halfLife)
 * Higher risk = more urgent to review
 */
function computeForgettingRisk(
  lastSeenAt: Date | null,
  timeMode: "foundation" | "acceleration" | "triage",
  daysRemaining: number
): number {
  if (!lastSeenAt) return 1.0; // Never seen = max risk

  const daysSinceReview = (Date.now() - lastSeenAt.getTime()) / (1000 * 60 * 60 * 24);
  const params = FORGETTING_PARAMS[timeMode];
  
  // Scale by exam proximity - more urgent as exam approaches
  const proximityFactor = Math.min(1.5, Math.max(0.5, 30 / Math.max(1, daysRemaining)));
  
  const risk = 1 - Math.exp(-Math.log(2) * daysSinceReview / params.halfLifeDays);
  return Math.min(1, risk * proximityFactor);
}

/**
 * Compute knowledge gap: 1 - mastery_score
 * Simple: lower mastery = higher gap = higher priority
 */
function computeKnowledgeGap(masteryScore: number): number {
  return 1 - Math.max(0, Math.min(1, masteryScore));
}

/**
 * Get empirical C_tier caps from completion_time_logs
 * Returns 75th percentile of time_to_mastery_minutes per difficulty tier
 */
async function getEmpiricalCTierCaps(examName: string): Promise<Record<DifficultyTier, number>> {
  const caps = { ...DEFAULT_C_TIER };

  try {
    // Get profiles for this exam, then sessions for those profiles, then filter logs
    const { data: profiles } = await supabaseAdmin
      .from("exam_profiles")
      .select("profile_id")
      .eq("exam_name", examName);

    const profileIds = (profiles ?? []).map((p: { profile_id: string }) => p.profile_id);

    let query = supabaseAdmin
      .from("completion_time_logs")
      .select("difficulty_tier, time_to_mastery_minutes")
      .not("time_to_mastery_minutes", "is", null)
      .gt("time_to_mastery_minutes", 0);

    if (profileIds.length > 0) {
      const { data: examSessions } = await supabaseAdmin
        .from("sessions")
        .select("id")
        .in("exam_profile_id", profileIds);

      const sessionIds = (examSessions ?? []).map((s: { id: string }) => s.id);
      if (sessionIds.length > 0) {
        query = query.in("session_id", sessionIds);
      }
    }

    const { data: logs } = await query;

    if (logs && logs.length > 10) {
      // Group by difficulty tier
      const byTier: Record<DifficultyTier, number[]> = {
        foundation: [],
        application: [],
        advanced: [],
        expert: [],
      };

      for (const log of logs) {
        const tier = log.difficulty_tier as DifficultyTier;
        if (byTier[tier] && log.time_to_mastery_minutes) {
          byTier[tier].push(log.time_to_mastery_minutes);
        }
      }

      // Compute 75th percentile for each tier
      for (const tier of Object.keys(byTier) as DifficultyTier[]) {
        const times = byTier[tier].sort((a, b) => a - b);
        if (times.length >= 5) {
          const idx = Math.floor(times.length * 0.75);
          caps[tier] = Math.max(DEFAULT_C_TIER[tier], times[idx]);
        }
      }
    }
  } catch (error) {
    console.warn("[PriorityEngine] Failed to load empirical C_tier caps:", error);
  }

  return caps;
}

/**
 * Get exam topic weights from database
 * Falls back to defaults if not available
 */
async function getExamTopicWeights(examName: string): Promise<ExamTopicWeight[]> {
  try {
    const { data } = await supabaseAdmin
      .from("exam_topic_weights")
      .select("*")
      .eq("exam_name", examName);

    if (data && data.length > 0) {
      return data as ExamTopicWeight[];
    }
  } catch (error) {
    console.warn("[PriorityEngine] Failed to load exam_topic_weights:", error);
  }

  // Build defaults from taxonomy + exam-specific weights
  const isGMAT = /gmat/i.test(examName);
  const isGRE = /gre/i.test(examName);
  const isIELTS = /ielts/i.test(examName);
  const isTOEFL = /toefl/i.test(examName);
  const isCFA = /cfa/i.test(examName);
  const domains = getDomainsForExam(examName);
  return domains.map((domain) => {
    let subject = "General";
    let difficultyTier: DifficultyTier = "application";
    let examWeight = 0.08;

    if (isIELTS) {
      subject = IELTS_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = IELTS_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = IELTS_EXAM_WEIGHTS[domain] || 0.10;
    } else if (isTOEFL) {
      subject = TOEFL_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = TOEFL_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = TOEFL_EXAM_WEIGHTS[domain] || 0.10;
    } else if (isGRE) {
      subject = GRE_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = GRE_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = GRE_EXAM_WEIGHTS[domain] || 0.08;
    } else if (isGMAT) {
      subject = GMAT_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = GMAT_DEFAULT_DIFFICULTY_TIER[domain] || "application";
      examWeight = GMAT_EXAM_WEIGHTS[domain] || 0.08;
    } else if (isCFA) {
      subject = CFA_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = "application";
      examWeight = CFA_EXAM_WEIGHTS[domain] || 0.06;
    } else {
      subject = SAT_DOMAIN_TO_SUBJECT[domain] || "General";
      difficultyTier = "application";
      examWeight = SAT_EXAM_WEIGHTS[domain] || 0.12;
    }

    return {
      id: crypto.randomUUID(),
      exam_name: examName,
      subject,
      topic: domain,
      skill_domain: domain,
      difficulty_tier: difficultyTier,
      exam_weight: examWeight,
      question_frequency_10yr: 0,
      c_tier_cap: null,
      estimated_minutes_to_mastery: null,
    };
  });
}

/**
 * Main priority engine function
 * Returns topics sorted by priority score (highest first)
 */
export async function computePriorityScores(input: PriorityInput): Promise<PriorityOutput[]> {
  const isGMAT = /gmat/i.test(input.examName);
  const isGRE = /gre/i.test(input.examName);
  const isIELTS = /ielts/i.test(input.examName);
  const isTOEFL = /toefl/i.test(input.examName);
  const isCFA = /cfa/i.test(input.examName);
  const domains = getDomainsForExam(input.examName);

  // Load empirical C_tier caps
  const cTierCaps = await getEmpiricalCTierCaps(input.examName);

  // Load exam weights
  const examWeights = await getExamTopicWeights(input.examName);
  const weightMap = new Map(examWeights.map((w) => [w.skill_domain, w]));
  const tierMap = new Map(examWeights.map((w) => [w.skill_domain, w.difficulty_tier]));

  const results: PriorityOutput[] = [];

  for (const domain of domains) {
    const masteryScore = input.masteryScores[domain] ?? 0;
    const nextReviewAt = input.nextReviewDates[domain];
    const lastSeenAt = input.lastSeenDates[domain] ?? null;
    const weightInfo = weightMap.get(domain);

    // Skip if no weight info (shouldn't happen with defaults)
    if (!weightInfo) continue;

    const examWeight = weightInfo.exam_weight;
    const examTier = isGMAT
      ? GMAT_DEFAULT_DIFFICULTY_TIER[domain]
      : isGRE
        ? GRE_DEFAULT_DIFFICULTY_TIER[domain]
        : isIELTS
          ? IELTS_DEFAULT_DIFFICULTY_TIER[domain]
          : isTOEFL
            ? TOEFL_DEFAULT_DIFFICULTY_TIER[domain]
            : "application";
    const difficultyTier = weightInfo.difficulty_tier || examTier || "application";
    const cTierCap = weightInfo.c_tier_cap ?? cTierCaps[difficultyTier] ?? DEFAULT_C_TIER[difficultyTier];

    // Component 1: Knowledge Gap (0-1)
    const knowledgeGap = computeKnowledgeGap(masteryScore);

    // Component 2: Forgetting Risk (0-1)
    const forgettingRisk = computeForgettingRisk(lastSeenAt, input.timeMode, input.daysRemaining);

    // Component 3: Estimated minutes to mastery
    // Base estimate from difficulty tier, adjusted by mastery gap
    const baseMinutes = {
      foundation: 10,
      application: 20,
      advanced: 40,
      expert: 60,
    }[difficultyTier];
    
    // More gap = more time needed
    const estimatedMinutes = Math.round(baseMinutes * (1 + knowledgeGap));

    // Denominator: min(estimated_minutes, C_tier)
    // This is the key cap that prevents cheap topics from always winning
    const denominator = Math.min(estimatedMinutes, cTierCap);

    // Priority Score = (Exam Weight × Knowledge Gap × Forgetting Risk) / min(Estimated Minutes, C_tier)
    const priorityScore = (examWeight * knowledgeGap * forgettingRisk) / denominator;

    results.push({
      skillDomain: domain,
      priorityScore,
      components: {
        examWeight,
        knowledgeGap,
        forgettingRisk,
        estimatedMinutes,
        cTierCap,
        denominator,
      },
      difficultyTier,
      subject:
        (isIELTS
          ? IELTS_DOMAIN_TO_SUBJECT[domain]
          : isTOEFL
          ? TOEFL_DOMAIN_TO_SUBJECT[domain]
          : isGRE
          ? GRE_DOMAIN_TO_SUBJECT[domain]
          : isGMAT
          ? GMAT_DOMAIN_TO_SUBJECT[domain]
          : isCFA
          ? CFA_DOMAIN_TO_SUBJECT[domain]
          : SAT_DOMAIN_TO_SUBJECT[domain]) || "General",
    });
  }

  // Sort by priority score descending
  results.sort((a, b) => b.priorityScore - a.priorityScore);

  return results;
}

/**
 * Get top N domains for a practice session
 */
export async function selectTopDomains(
  input: PriorityInput,
  count: number
): Promise<string[]> {
  const priorities = await computePriorityScores(input);
  return priorities.slice(0, count).map((p) => p.skillDomain);
}

/**
 * Recompute and store C_tier caps from completion_time_logs
 * Call this periodically (e.g., quarterly via cron)
 */
export async function recomputeCTierCaps(examName: string): Promise<void> {
  const caps = await getEmpiricalCTierCaps(examName);

  // Update exam_topic_weights with new caps
  for (const [tier, cap] of Object.entries(caps)) {
    await supabaseAdmin
      .from("exam_topic_weights")
      .update({ c_tier_cap: cap })
      .eq("exam_name", examName)
      .eq("difficulty_tier", tier);
  }
}