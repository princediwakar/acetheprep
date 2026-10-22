// Path: components/landing/student-faqs.ts
import type { ExamKey } from "./landing-data";

export interface StudentFAQItem {
  question: string;
  answer: string;
  drillUrl?: string;
  drillLabel?: string;
}

export const EXAM_STUDENT_FAQS: Record<ExamKey, StudentFAQItem[]> = {
  gmat: [
    {
      question: "Is a calculator allowed on GMAT Focus Quantitative Reasoning?",
      answer:
        "No. An on-screen calculator is only provided during the Data Insights section. The Quantitative Reasoning section tests pure mathematical reasoning, number properties, and estimation—calculators are strictly disabled.",
      drillUrl: "/practice/gmat-focus/quantitative-reasoning/number-properties",
      drillLabel: "Practice GMAT Number Properties",
    },
    {
      question: "Can I bookmark and change answers on the GMAT Focus Edition?",
      answer:
        "Yes. You can bookmark as many questions as you like within a section, and once you reach the end of the section, you can review and edit up to 3 answers before your section time expires.",
      drillUrl: "/practice/gmat-focus",
      drillLabel: "View GMAT Focus Format Blueprint",
    },
    {
      question: "What is the score scale for the GMAT Focus Edition?",
      answer:
        "Scores range from 205 to 805 in 5-point increments. All three sections (Quantitative, Verbal, and Data Insights) are scored from 60 to 90 and contribute equally to your total score.",
      drillUrl: "/practice/gmat-focus/data-insights/data-sufficiency",
      drillLabel: "Practice Data Insights Drills",
    },
    {
      question: "Why do so many test-takers miss Data Sufficiency parity questions?",
      answer:
        "Test writers purposefully use terms like '2n is even' to trap students into assuming n must be even. Because 2 times any integer is always even, statement (2) provides zero information about n's individual parity.",
      drillUrl: "/practice/gmat-focus/data-insights/data-sufficiency",
      drillLabel: "Test Parity & Divisibility Questions",
    },
  ],
  sat: [
    {
      question: "Is the Desmos graphing calculator allowed on the entire Digital SAT Math section?",
      answer:
        "Yes. Unlike the paper SAT, the Digital SAT includes a fully integrated Desmos graphing calculator accessible for all 44 math questions across both Module 1 and Module 2. You may also bring your own approved handheld calculator.",
      drillUrl: "/practice/sat/mathematics/advanced-math",
      drillLabel: "Practice Desmos-Integrated Math Problems",
    },
    {
      question: "How does the multistage adaptive scoring work on Digital SAT?",
      answer:
        "Both Reading & Writing and Math are split into two 2-stage modules. Your performance on Module 1 determines whether you receive the standard or harder Module 2. To achieve a score above 1350, you must unlock and perform well on the harder Module 2.",
      drillUrl: "/practice/sat",
      drillLabel: "View Digital SAT Scoring Blueprint",
    },
    {
      question: "What is an extraneous solution and why does it appear on SAT Math?",
      answer:
        "When squaring both sides of a radical equation such as √(x + 2) = x, algebra produces two solutions (e.g., x = 2 and x = −1). Because the principal square root cannot equal a negative number, x = −1 is a fake (extraneous) root. You must always substitute solutions back into the original root.",
      drillUrl: "/practice/sat/mathematics/advanced-math",
      drillLabel: "Practice Extraneous Solutions Drills",
    },
    {
      question: "Are formula sheets provided on the Digital SAT?",
      answer:
        "Yes. Official geometry reference formulas (area, volume, Pythagorean theorem, special right triangles) are always available via the reference icon in the Bluebook testing window.",
      drillUrl: "/practice/sat/mathematics/geometry-and-trigonometry",
      drillLabel: "Practice SAT Geometry Drills",
    },
  ],
  gre: [
    {
      question: "What is the 4-number rule for Quantitative Comparison on the GRE?",
      answer:
        "Before selecting Quantity A or Quantity B, always test four boundary conditions: a positive integer (e.g. 2), a negative integer (e.g. -2), zero (0), and a fraction (e.g. 1/2). If different test numbers change whether A or B is greater, the answer is strictly D (Relationship cannot be determined).",
      drillUrl: "/practice/gre/quantitative-reasoning/quantitative-comparison",
      drillLabel: "Practice Quantitative Comparison Drills",
    },
    {
      question: "How long is the official shortened GRE General exam?",
      answer:
        "The test lasts 1 hour and 58 minutes. It consists of 1 Analytical Writing essay (30 minutes), two Quantitative sections (27 total questions, 47 minutes), and two Verbal sections (27 total questions, 41 minutes). There is no unscored experimental section.",
      drillUrl: "/practice/gre",
      drillLabel: "View GRE Timing & Structure Blueprint",
    },
    {
      question: "Is a calculator provided on the GRE General exam?",
      answer:
        "Yes, an on-screen 4-function calculator with a square root key and a 'Transfer Display' button is available for all Quantitative Reasoning questions.",
      drillUrl: "/practice/gre/quantitative-reasoning/arithmetic",
      drillLabel: "Practice GRE Quantitative Drills",
    },
  ],
  cfa: [
    {
      question: "What calculators are permitted for the CFA Level 1 exam?",
      answer:
        "Only two calculator models are authorized by CFA Institute: the Texas Instruments BA II Plus (including the BA II Plus Professional) and the Hewlett Packard 12C (including 12C Platinum, 25th Anniversary, and 30th Anniversary editions).",
      drillUrl: "/practice/cfa-level-1/quantitative-methods/time-value-of-money",
      drillLabel: "Practice BA II Plus Time Value Drills",
    },
    {
      question: "Is there a penalty for wrong answers on the CFA Level 1 exam?",
      answer:
        "No. There is no negative marking for incorrect guesses on the CFA exam. Your score is based solely on the number of correct responses, so you should answer every single question.",
      drillUrl: "/practice/cfa-level-1",
      drillLabel: "View CFA Level 1 Curriculum Blueprint",
    },
    {
      question: "What is the historical Minimum Passing Score (MPS) for CFA Level 1?",
      answer:
        "The MPS varies each exam window and is determined through the modified Angoff method. Historically, scoring 70% or higher across all topic areas ensures a safe passing margin above the 90th percentile.",
      drillUrl: "/practice/cfa-level-1/financial-statement-analysis/financial-reporting-standards",
      drillLabel: "Practice FSA High-Yield Questions",
    },
  ],
  ielts: [
    {
      question: "What is the exact distinction between 'FALSE' and 'NOT GIVEN' in IELTS Reading?",
      answer:
        "A statement is FALSE if the passage clearly contradicts or states the exact opposite of the prompt. A statement is NOT GIVEN if the text neither confirms nor contradicts the information because the specific detail is missing.",
      drillUrl: "/practice/ielts-academic/reading/identifying-information-true-false-not-given",
      drillLabel: "Practice IELTS True/False/Not Given Drills",
    },
    {
      question: "How is the overall IELTS Academic band score rounded?",
      answer:
        "The overall band is the average of Listening, Reading, Writing, and Speaking, rounded to the nearest half or whole band. An average ending in .25 rounds up to .5; an average ending in .75 rounds up to the next whole band.",
      drillUrl: "/practice/ielts-academic",
      drillLabel: "View IELTS Academic Band Blueprint",
    },
  ],
  toefl: [
    {
      question: "How do Sentence Insertion questions work on TOEFL iBT Reading?",
      answer:
        "You are given a sentence and four squares [■] inside a passage. You must choose the square where the sentence fits most naturally by tracking grammatical pronouns, chronological flow, and transition connectors (e.g. 'Therefore', 'In contrast').",
      drillUrl: "/practice/toefl-ibt/reading/insert-text-questions",
      drillLabel: "Practice TOEFL Sentence Insertion",
    },
    {
      question: "How long is the shortened TOEFL iBT test in 2026?",
      answer:
        "The TOEFL iBT test lasts under 2 hours. It features streamlined Reading (20 questions), Listening (28 questions), Speaking (4 tasks), and Writing (Academic Discussion and Integrated tasks).",
      drillUrl: "/practice/toefl-ibt",
      drillLabel: "View TOEFL iBT Timing & Structure",
    },
  ],
};
