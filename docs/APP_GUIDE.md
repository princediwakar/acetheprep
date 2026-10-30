# AceThePrep — Comprehensive System Architecture & Application Guide

## 1. Executive Summary & Product Mission

**AceThePrep** (`acetheprep.com`) is an adaptive, AI-powered competitive exam preparation and active-recall drilling platform. It is engineered from first principles to solve the fundamental failure mode of traditional exam prep: **passive rereading, uncalibrated practice, and cognitive blind spots**.

Rather than treating practice tests as static PDFs or uncalibrated rote question banks, AceThePrep models each student's memory state using spaced repetition, diagnoses deep cognitive traps through distractor analysis, dynamically selects high-yield questions using a priority engine, and forecasts calibrated percentile bands backed by empirical testing data.

### Supported Curricula & Exam Taxonomies
AceThePrep provides structured, multi-tier syllabus taxonomies covering 6 premier global standardized exams:
- **Undergraduate & College Admissions**: Digital SAT (Reading & Writing, Mathematics).
- **Graduate & Business School Admissions**: 
  - GMAT Focus Edition (Quantitative Reasoning, Verbal Reasoning, Data Insights).
  - GRE General (Verbal Reasoning, Quantitative Reasoning, Analytical Writing).
- **Professional Finance**: CFA Level 1 (Ethical and Professional Standards, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, Portfolio Management).
- **Language Proficiency & Global Mobility**: 
  - IELTS Academic (Reading, Listening with acoustic audio, Writing, Speaking).
  - TOEFL iBT (Reading, Listening with acoustic audio, Speaking, Writing).

### Strategic Global Realignment
All legacy references to Indian national entrance exams (JEE, NEET, GATE, CAT) have been permanently decommissioned. The platform architecture, scoring models, diagnostic algorithms, and question banks are 100% focused on premier international standardized tests governed by College Board, GMAC, ETS, CFA Institute, and Cambridge/British Council.

---

## 2. Technology Stack & Physical Architecture

The platform is designed for near zero-friction, minimal round-trip latency, edge security, and strict type safety:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT (Browser)                                     │
│  Next.js 16 (React 19) • Tailwind CSS • Radix UI • KaTeX Math • Exam Calculator (AST)  │
│      Acoustic Audio Player • HeaderPortal Action Teleportation • Oxford Editorial       │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTPS / WSS
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 EDGE / NEXT.JS PROXY                                   │
│            proxy.ts (Auth Token Refresh, Session Cookie Validation, Rerouting)          │
└───────────────────────────┬────────────────────────────────┬───────────────────────────┘
                            │                                │
                            ▼                                ▼
┌──────────────────────────────────────────────┐  ┌──────────────────────────────────────┐
│          SERVER COMPONENTS / ACTIONS         │  │          API ROUTE HANDLERS          │
│   • page.tsx (Parallel Promise.all Fetch)    │  │   • /api/session/start               │
│   • lib/actions/tutor.ts (Discard/Cleanup)   │  │   • /api/session/answer              │
│   • lib/actions/billing.ts (Checkout/Portal) │  │   • /api/session/complete            │
│   • lib/actions/auth.ts (Sign-in/Sign-out)   │  │   • /api/tutor/evaluate-writing      │
│                                              │  │   • /api/tutor/evaluate-semantic     │
│                                              │  │   • /api/comeback/due & /retry       │
│                                              │  │   • /api/webhooks/dodo               │
│                                              │  │   • /api/og (Dynamic Card OG Gen)    │
└───────────────────────────┬──────────────────┘  └──────────────────┬───────────────────┘
                            │                                        │
                            ▼                                        ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               DATA & EXTERNAL SERVICES                                 │
│  ┌────────────────────────┐  ┌──────────────────────────┐  ┌────────────────────────┐  │
│  │  Supabase PostgreSQL  │  │   AI Engine & Pipeline   │  │     Dodo Payments      │  │
│  │  - Auth (Google OAuth) │  │   - Pre-Materialized     │  │   - Recurring Cards    │  │
│  │  - Row Level Security  │  │     Master Banks (0% dup)│  │   - Indian UPI / Net   │  │
│  │  - Atomic Stored RPCs  │  │   - DeepSeek Flash (Pri) │  │   - Automated Webhook  │  │
│  │  - 18 Relational Tables│  │   - OpenAI GPT-4o (Sec)  │  │     Subscription Sync  │  │
│  │  - types/supabase.ts   │  │   - DeepSeek Web Search  │  │   - Customer Portal    │  │
│  └────────────────────────┘  └──────────────────────────┘  └────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Core Technologies
- **Framework**: Next.js 16.2 with Turbopack, React 19, TypeScript 5.8.
- **Styling & Design System**: Tailwind CSS, shadcn/ui (Radix UI primitives), Lucide React icons, Framer Motion for micro-interactions, Recharts for analytics data visualization.
- **Typography & Theme Engine**: Oxford Editorial typographic system (`font-heading`, `font-sans`, `font-mono`), system dark/light theme switching with smooth transitions and brand color preservation.
- **Mathematics & Formula Rendering**: KaTeX with `@matejmazur/react-katex` for high-performance rendering of algebraic expressions, financial formulas, and LaTeX notations.
- **Acoustic Audio System**: HTML5 audio streaming and player controls for IELTS and TOEFL listening sections with variable speed, replay limits, and transcript sync.
- **Backend & Database**: Supabase (PostgreSQL 15+) with Row Level Security (RLS), custom RPC functions (`submit_answer`, `update_quiz_question_count`, `get_public_quizzes_with_min_count`), and automated TypeScript schema generation (`types/supabase.ts`).
- **Edge Routing & Auth Guard**: `proxy.ts` protecting sensitive application routes (`/home`, `/analytics`, `/history`, `/session/*`, `/create`, `/setup`) with server-side cookie verification.
- **Portal Architecture**: `HeaderPortal.tsx` rendering interactive metrics and quick actions into the global `AppShell` header dynamically without prop-drilling or client re-renders.
- **Dual-Engine Question Delivery**: Pre-materialized high-yield question banks (`lib/data/banks/*` across SAT, GMAT, GRE, CFA, IELTS, TOEFL) with parallel $O(1)$ deduplication against `session_answers`, seamlessly falling back to DeepSeek Flash / OpenAI GPT-4o with automatic background bank materialization.
- **Payment Processing**: Dodo Payments (`@dodopayments/nextjs`, SDK v2) supporting global cards, Indian UPI, NetBanking, and automated subscription lifecycle management via webhooks.
- **Document Processing**: `pdf-parse`, `pdfjs-dist`, `pdf-lib` for reading source materials, and `exceljs` / `@react-pdf/renderer` for test exporting.

---

## 3. Core Algorithmic Systems & Mathematical Physics

### 3.1 Adaptive Spaced Repetition (SuperMemo-2 Modified)
File: `lib/sm2.ts`

The platform tracks individual skill domains per student using a customized implementation of the SuperMemo-2 (SM-2) algorithm.

1. **Quality Grading ($q \in [0, 5]$)**:
   - Evaluated using both correctness and response latency relative to the question's estimated solving time:
     $$\text{ratio} = \frac{\text{timeMs}}{\text{timeEstimateSec} \times 1000}$$
     - If Correct:
       - $\text{ratio} \le 0.5 \implies q = 5$ (Fast, confident mastery)
       - $\text{ratio} \le 1.0 \implies q = 4$ (Expected speed)
       - $\text{ratio} \le 1.5 \implies q = 3$ (Hesitant, near time limit)
       - $\text{ratio} > 1.5 \implies q = 2$ (Over-time struggle)
     - If Incorrect:
       - $\text{ratio} \le 0.5 \implies q = 1$ (Impulsive error / fast trap)
       - $\text{ratio} > 0.5 \implies q = 0$ (Complete misconception or guess)

2. **Ease Factor Update ($EF$)**:
   $$EF' = \max\left(1.3, \; EF + \left(0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02)\right)\right)$$

3. **Repetition Interval Calculation ($I$)**:
   $$I = \begin{cases} 1 \text{ day} & \text{if } \text{streak} = 1 \\ 6 \text{ days} & \text{if } \text{streak} = 2 \\ \lceil I_{\text{old}} \times EF \rceil & \text{if } \text{streak} > 2 \end{cases}$$

4. **Mastery Score Blending**:
   $$\text{Mastery}' = \text{Mastery}_{\text{old}} \times 0.8 + 0.2 \times \left(\frac{q}{5}\right)$$

5. **Temporal Time Modes**:
   - `foundation` ($>90$ days to exam): 50% easy, 40% medium, 10% hard questions.
   - `acceleration` ($30-90$ days to exam): 30% easy, 50% medium, 20% hard questions.
   - `triage` ($<30$ days to exam): 10% easy, 40% medium, 50% hard questions.

---

### 3.2 Tiered Priority Engine
File: `lib/priority-engine.ts`

To maximize exam marks per unit of study time, topics are selected via an optimization formula:

$$\text{Priority Score} = \frac{\text{Exam Weight} \times \text{Knowledge Gap} \times \text{Forgetting Risk}}{\min(\text{Estimated Minutes to Mastery}, \; C_{\text{tier}})}$$

- **Exam Weight ($W$)**: Historical question frequency extracted from official exam blueprints (e.g., SAT, GMAT, GRE micro-skills, and CFA topic frequency weights in `exam_topic_weights`).
- **Knowledge Gap ($G$)**: $1 - \text{MasteryScore}$.
- **Forgetting Risk ($R$)**:
  $$R = 1 - \exp\left(-\frac{\ln(2) \times \text{DaysSinceReview}}{\text{HalfLife}}\right) \times \text{ProximityFactor}$$
  Where half-life varies by time mode (Foundation: 30d, Acceleration: 14d, Triage: 7d).
- **$C_{\text{tier}}$ Cap**: The 75th percentile empirical completion time logged across all students in `completion_time_logs` for that difficulty tier (Foundation: 30m, Application: 45m, Advanced: 60m, Expert: 75m), preventing low-yield time sinks from monopolizing prep time.

---

### 3.3 The 3-Stage Comeback Queue (Mistake Recovery)
File: `lib/comeback-queue.ts`

When a student makes an error or reveals an answer, the question enters the **Comeback Queue** to turn mistakes into long-term retention:

| Stage | Trigger Delay | Retry Delay on Fail | Rule / Requirement |
|---|---|---|---|
| **1. Immediate** | 1 Hour | 1 Hour | **Explanation Gated**: Student MUST review the step-by-step distractor explanation before retry is unlocked. |
| **2. Delayed** | 48 Hours | 24 Hours | Tests medium-term consolidation after sleeping on the concept. |
| **3. Transfer** | 7 Days | 5 Days | Tests long-term retention and near-transfer problem solving. |

- **Lost Projected Points**: When missed, a question deducts projected points based on exam weight ($\text{Points} = W \times 0.5$).
- **Points Recovery**: Successfully completing all 3 stages clears the item and recovers the lost projected points back to the student's score.

---

### 3.4 Hybrid Question Bank & Master Repository
Files: `lib/services/question-bank-service.ts`, `app/api/session/start/route.ts`, `lib/data/banks/*`

To deliver 0ms query latency while guaranteeing zero duplicate questions:
1. **Curated Master Repositories (`ALL_BANKS`)**:
   Compiles deep, verified question sets across 6 domains:
   - `lib/data/banks/sat`: Reading, Writing, Algebra, Advanced Math, Geometry.
   - `lib/data/banks/gmat`: Data Insights (Data Sufficiency, Multi-Source), Quant, Verbal.
   - `lib/data/banks/gre`: Quantitative Comparison, Text Completion, Sentence Equivalence (6 options), Reading Comprehension.
   - `lib/data/banks/cfa`: Ethics, Quantitative Methods, FSA, Fixed Income, Corporate Issuers.
   - `lib/data/banks/ielts`: Academic Reading, Listening (Acoustic Audio), Writing Task 1 & 2.
   - `lib/data/banks/toefl`: Reading Comprehension, Listening Conversations/Lectures, Academic Writing.
2. **Parallel Fetch & Deduplication**:
   When a session starts:
   - Fetches all `question_id` records previously answered by this user from `session_answers` into an in-memory `Set<string>` ($O(1)$ lookup).
   - Fetches candidate pre-materialized questions from `question_bank` matching the target exam and skill domains.
3. **Stratified Selection**:
   Filters out previously seen questions, matching requested difficulty tiers.
4. **AI Generation Fallback & Auto-Materialization**:
   If the bank has unmet targets, the engine invokes DeepSeek Flash or OpenAI GPT-4o with structured JSON schema enforcement. Newly synthesized questions are automatically upserted into `question_bank` in the background, continuously enriching the communal repository.

---

### 3.5 Safe Shunting-Yard Formula Evaluator (Virtual Exam Calculator)
File: `components/tutor/ExamCalculator.tsx`

To comply with official testing standards (e.g. GRE onscreen calculator, CFA BA II Plus calculation standards) without exposing the client to code injection vulnerabilities:
- **Zero `eval()` Security**: Implements a pure AST tokenizer and Dijkstra's Shunting-Yard algorithm with operator precedence queues and operand evaluation stacks.
- **Scientific Operations**: Handles parenthetical expressions, unary negation, floating-point precision stabilization, powers ($x^2$), square roots ($\sqrt{x}$), reciprocal ($1/x$), percentages ($\%$) and memory registers (`MC`, `MR`, `M+`, `M-`).
- **Draggable Floating Window**: Responsive floating modal with client-side mouse boundary constraints and full keyboard shortcut mapping (digits, operators, Enter, Backspace, Esc).

---

### 3.6 Official Percentile & Score Prediction Engines
Files: `lib/predictor/engine.ts`, `lib/predictor/*-score-engine.ts`

AceThePrep implements official psychometric scoring engines for all 6 supported curricula:

1. **Digital SAT (`sat-score-engine.ts`)**:
   - Composite scale: 400 to 1600 (in 10-point increments).
   - Section scales: 200 to 800 for Reading & Writing and Mathematics.
   - Standard Error of Measurement (SEM): ~±30 to ±40 points.
2. **GMAT Focus Edition (`gmat-score-engine.ts`)**:
   - Composite scale: 205 to 805 (in 10-point increments, ending in 5).
   - Section scales: 60 to 90 for Quantitative Reasoning, Verbal Reasoning, and Data Insights.
   - Official GMAC 2024–2026 Focus percentile concordance tables.
3. **ETS GRE General (`gre-score-engine.ts`)**:
   - Section scales: 130 to 170 for Quantitative Reasoning and Verbal Reasoning (1-point increments).
   - Composite scale: 260 to 340 (sum of QR + VR).
   - Analytical Writing: 0.0 to 6.0 in half-point increments.
   - Official ETS percentile distribution curves.
4. **CFA Level 1 (`cfa-score-engine.ts`)**:
   - Minimum Passing Score (MPS) model (~70% benchmark threshold).
   - Ethics adjustment buffer: High ethics scores break borderline results into passes.
   - 10-topic weighted mastery matrix.
5. **Cambridge IELTS Academic (`ielts-score-engine.ts`)**:
   - Band scale: 0.0 to 9.0 in half-band increments.
   - Cambridge official rounding algorithm: decimals ending in `.25` round up to `.5`, decimals ending in `.75` round up to next whole band.
6. **ETS TOEFL iBT (`toefl-score-engine.ts`)**:
   - Total score: 0 to 120.
   - Section scores: 0 to 30 for Reading, Listening, Speaking, and Writing.

#### Dynamic Blending Weight ($\alpha$)
$$\alpha = \min\left(1.0, \; \sqrt{\frac{\text{Sessions Completed}}{20}}\right)$$
- **Session 0**: 100% official normative prior tables.
- **Session 5**: 50% prior, 50% personal performance.
- **Session 20+**: 100% personal calibrated performance.
- **Band Shrinkage**: Initial confidence bands contract from broad spans to sharp $\pm 1.5-2\%$ bounds as sessions accumulate.

---

### 3.7 Acoustic Audio & Listening Proctoring
File: `components/tutor/player/QuestionCard.tsx`

For IELTS Academic and TOEFL iBT Listening modules:
- Embedded acoustic player with HTML5 audio streaming.
- Playback controls: Play/Pause, Replay (gated according to exam rules), Volume, and 1.0x / 1.25x speed adjustments.
- Synchronized passage transcript toggling for post-answer review mode.

---

### 3.8 6-Choice Multi-Option Engine (GRE Sentence Equivalence)
File: `components/tutor/player/QuestionCard.tsx`

To support authentic ETS GRE 2026 testing specifications:
- Supports option letters `A`, `B`, `C`, `D`, `E`, and `F`.
- Handles Sentence Equivalence dual-option selections (selecting exactly two words that produce equivalent sentence meanings).
- Validates paired choices and highlights distractor traps (e.g. synonym traps without context fit).

---

### 3.9 Socratic AI Writing Evaluation
Files: `app/api/tutor/evaluate-writing/route.ts`, `components/tutor/player/QuestionCard.tsx`

For IELTS and TOEFL writing sections:
- Socratic rubric evaluation:
  - IELTS: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Accuracy (0-9 scale).
  - TOEFL: Topic Development, Organization, Language Use (0-30 scale).
- Word count analysis and penalty detection.
- Line-by-line sentence corrections with pedagogical rationales.

---

## 4. Complete Database Schema (Supabase PostgreSQL)

```
                                  DATABASE ENTITY RELATIONSHIPS
                                  
    ┌──────────────────┐            ┌────────────────────┐            ┌───────────────────┐
    │   auth.users     │───────────<│   exam_profiles    │───────────<│  concept_mastery  │
    └────────┬─────────┘            └─────────┬──────────┘            └───────────────────┘
             │                                │
             │                                ├──────────────────────<┌───────────────────┐
             │                                │                       │  mastery_history  │
             │                                │                       └───────────────────┘
             │                                │
             │                                ├──────────────────────<┌───────────────────┐
             │                                │                       │    predictions    │
             │                                │                       └─────────┬─────────┘
             │                                │                                 │
             │                                ├──────────────────────<┌─────────▼─────────┐
             │                                │                       │  actual_results   │
             │                                │                       └───────────────────┘
             │                                ├──────────────────────<┌───────────────────┐
             │                                │                       │comeback_queue_items
             │                                │                       └───────────────────┘
             │                                ├──────────────────────<┌───────────────────┐
             │                                │                       │completion_time_logs
             │                                │                       └───────────────────┘
             │                                │
             ├─────────────<┌─────────────────▼──┐                    ┌───────────────────┐
             │              │      sessions      │───────────┐        │   question_bank   │
             │              └─────────┬──────────┘           │        └─────────┬─────────┘
             │                        │                      │                  │
             ├─────────────<┌─────────▼──────────┐           └──────────────────┤
             │              │  session_answers   │>─────────────────────────────┘
             │              └────────────────────┘
             │
             ├─────────────<┌────────────────────┐            ┌───────────────────┐
             │              │   subscriptions    │            │calibration_snapshots
             │              └────────────────────┘            └───────────────────┘
             │
             ├─────────────<┌────────────────────┐            ┌───────────────────┐
             │              │    result_cards    │            │exam_topic_weights │
             │              └────────────────────┘            └───────────────────┘
             │
             ├─────────────<┌────────────────────┐            ┌───────────────────┐
             │              │      quizzes       │───────────<│     questions     │
             │              └────────────────────┘            └───────────────────┘
             │
             ├─────────────<┌────────────────────┐            ┌───────────────────┐
             │              │  generation_usage  │            │     feedback      │
             │              └────────────────────┘            └───────────────────┘
```

### Table Definitions & Primary Columns

1. **`exam_profiles`**:
   - `profile_id` (UUID, PK), `user_id` (UUID, FK to auth.users), `exam_name` (Text), `target_date` (Date), `time_mode` (`foundation` | `acceleration` | `triage`), `active_targets` (Text array), `is_active` (Bool), `phone` (Text).

2. **`concept_mastery`**:
   - `id` (UUID, PK), `exam_profile_id` (UUID, FK), `user_id` (UUID), `skill_domain` (Text), `mastery_score` (Float 0-1), `streak` (Int), `review_interval_days` (Int), `review_ease_factor` (Float), `last_seen_at` (Timestamptz), `next_review_at` (Timestamptz), `total_attempted` (Int), `total_correct` (Int).

3. **`mastery_history`**:
   - `id` (UUID, PK), `exam_profile_id` (UUID, FK), `user_id` (UUID), `skill_domain` (Text), `mastery_score` (Float), `recorded_at` (Timestamptz).

4. **`sessions`**:
   - `id` (UUID, PK), `exam_profile_id` (UUID, FK), `user_id` (UUID), `questions_json` (JSONB array of questions), `target_domains` (Text array), `session_intent` (`spaced_review` | `active_target` | `custom_mock` | `diagnostic` | `tracked` | `quiet`), `status` (`active` | `completed`), `created_at`, `completed_at`.

5. **`session_answers`**:
   - `id` (UUID, PK), `session_id` (UUID, FK), `exam_profile_id` (UUID, FK), `user_id` (UUID), `question_id` (Text), `skill_domain` (Text), `selected_option` (Text), `is_correct` (Bool), `was_revealed` (Bool), `time_to_answer_ms` (Int), `answered_at` (Timestamptz).

6. **`question_bank`**:
   - `id` (Text, PK), `exam_name` (Text), `subject` (Text), `skill_domain` (Text), `difficulty_tier` (Int), `question_text` (Text), `options` (JSONB), `correct_option` (Text), `explanation` (Text), `distractor_analysis` (JSONB), `misconception` (Text), `time_estimate_seconds` (Int), `created_at` (Timestamptz), `metadata_json` (JSONB).

7. **`comeback_queue_items`**:
   - `id` (UUID, PK), `user_id` (UUID), `exam_profile_id` (UUID, FK), `original_session_id` (UUID, FK), `question_id` (Text), `skill_domain` (Text), `difficulty_tier` (Text), `stage` (`immediate` | `delayed` | `transfer`), `stage_deadline` (Timestamptz), `explanation_shown` (Bool), `immediate_passed` (Bool), `delayed_passed` (Bool), `transfer_passed` (Bool), `cleared` (Bool), `lost_projected_points` (Float).

8. **`completion_time_logs`**:
   - `id` (UUID, PK), `user_id` (UUID), `session_id` (UUID, FK), `skill_domain` (Text), `difficulty_tier` (Int), `duration_seconds` (Int), `logged_at` (Timestamptz). Feeds the 75th percentile empirical calculation for the Priority Engine.

9. **`predictions`**:
   - `id` (UUID, PK), `exam_profile_id` (UUID, FK), `user_id` (UUID), `predicted_percentile` (Float), `band_lower` (Float), `band_upper` (Float), `sessions_used` (Int), `subject_breakdown` (JSONB), `calibration_source` (Text), `is_frozen` (Bool), `frozen_at` (Timestamptz).

10. **`actual_results`**:
    - `id` (UUID, PK), `user_id` (UUID), `prediction_id` (UUID, FK), `exam_name` (Text), `session_label` (Text), `actual_marks` (Float), `actual_percentile` (Float), `subject_breakdown` (JSONB), `opted_in` (Bool).

11. **`calibration_snapshots`**:
    - `id` (UUID, PK), `exam_name` (Text), `exam_date` (Date), `freeze_date` (Date), `session_label` (Text), `total_users_frozen` (Int), `sharpness_median_width` (Float), `coverage` (Float), `coverage_segmented` (JSONB), `report_json` (JSONB).

12. **`exam_topic_weights`**:
    - Historical question distribution and frequency weightings per domain.

13. **`subscriptions`**:
    - `id` (UUID, PK), `user_id` (UUID, FK), `dodo_subscription_id` (Text, Unique), `dodo_customer_id` (Text), `status` (`active` | `past_due` | `cancelled` | `expired` | `inactive`), `plan_type` (`monthly` | `quarterly`), `product_id` (Text), `current_period_end` (Timestamptz).

14. **`result_cards`**:
    - `id` (UUID, PK), `user_id` (UUID), `share_token` (Text, Unique), `card_type` (Text), `card_data` (JSONB), `expires_at` (Timestamptz, 30-day TTL), `view_count` (Int).

15. **`quizzes` & `questions`**:
    - Standalone generated tests: `quiz_id` (UUID, PK), `creator_id` (UUID), `title`, `topic`, `subject`, `difficulty`, `is_public` (Bool), related `questions` records with `distractor_analysis`, `explanation`, and `metadata_json`.

16. **`feedback`**:
    - `id` (UUID, PK), `user_id` (UUID), `category` (Text), `message` (Text), `rating` (Int), `created_at` (Timestamptz).

17. **`generation_usage`**:
    - Daily AI generation and rate-limiting audit log per user.

### Stored Database RPCs
- `submit_answer(p_session_id, p_question_id, p_selected_option, p_is_correct, p_time_ms, p_was_revealed)`: Atomic PostgreSQL transaction recording the answer, updating question counters, and automatically enqueueing missed questions into `comeback_queue_items`.
- `update_quiz_question_count(p_quiz_id)`: Atomically maintains accurate count of active questions in user-created quizzes.
- `get_public_quizzes_with_min_count(min_count, p_limit, p_offset)`: High-performance indexed pagination for the public quiz exploration directory (`/quizzes`).

---

## 5. User Journey & Feature Specifications

### 5.1 Onboarding & Setup (`/setup`)
- **Exam Picker**: Select target exam from the 6 premier global standardized exams (Digital SAT, GMAT Focus, GRE General, CFA Level 1, IELTS Academic, TOEFL iBT).
- **Target Date**: Exam date picker that automatically classifies prep timeline into **Foundation** ($>90$ days), **Acceleration** ($30-90$ days), or **Triage** ($<30$ days).
- **Self-Assessment Priors**: User rates subjects as Weak (prior: 0.25), Okay (prior: 0.50), or Strong (prior: 0.75), initializing their prior distribution without requiring a 3-hour diagnostic exam.
- **Auth Guard**: If not signed in, routes through Google OAuth and redirects back to complete profile initialization.

---

### 5.2 Active Recall Practice Session (`/session/[session_id]`)
File: `components/tutor/SessionPlayer.tsx`

The practice runner is a distraction-free, 100% full-viewport proctoring interface that completely hides site navigation:

#### A. Proctor Header Bar
- **Module Indicator**: Displays the current exam name and specific skill domain.
- **Timer / Stopwatch**: Toggleable elapsed time counter (`formatTime`). Can be hidden during testing to simulate low-anxiety drilling.
- **Draggable Scientific Exam Calculator**: Floating modal powered by an AST parser (`ExamCalculator.tsx`) with scientific keys, memory registers, and keyboard shortcuts.
- **Acoustic Audio Player**: Integrated audio controls for IELTS and TOEFL listening comprehension tasks.
- **Theme Switcher**: In-place light/dark mode toggle.
- **End Test Modal**: Provides safe choices:
  - *Discard Session*: Calls `discardSessionAction` to delete session records and child telemetry, redirecting back to `/home`.
  - *Finish Early & Review*: Opens the Section Review grid to finalize answers.

#### B. Dual Practice Modes
1. **Tutor Drill Mode**:
   - Instant feedback on every option selection.
   - Highlights the correct option in emerald and trap selections in rose.
   - Displays full **Examiner Trap Breakdown**, identifying cognitive errors (e.g. *Cartesian sign inversion*, *Data Sufficiency C vs E traps*, *false synonym pairs*).
   - Provides step-by-step mathematical derivation rendered via KaTeX.
   - Implements a mandatory 3-second pacing delay to prevent impulsive blind guessing.
2. **Exam Simulation Mode**:
   - Timed simulation mimicking real testing environments.
   - Answers remain masked throughout the test.
   - Question Flagging ("Mark for Review") with visual indicators.
   - Bottom Dock Question Navigator palette allowing rapid jumping between questions.
   - Supports 6-choice option layouts for GRE Sentence Equivalence.

#### C. Section Review ("Check Your Work") Screen
- Accessible prior to submission or via the Question Palette.
- Displays complete summary strip: Total, Answered, Unanswered, and Flagged counts.
- Highlights unanswered questions with warning callouts and quick-jump actions.
- Interactive question card grid allowing students to revisit and change any response with one click.

#### D. Session Autopsy Matrix / Diagnostic Review
Upon completion:
- Calibrates SuperMemo-2 intervals in the background.
- Summary metrics: Raw score, accuracy %, total pacing, distractor traps caught.
- Filter tabs: **All**, **Flagged**, **Mistakes**, **Traps**, and **Correct**.
- Expandable question cards showing step-by-step solutions, correct derivations, and specific misconception traps.
- Next Action Launchpad: Instant drill launch button for the student's weakest domain.

#### E. Safe Session Management Actions
File: `lib/actions/tutor.ts`
- `discardSessionAction`: Atomically removes a session and cascades through `session_answers`, `comeback_queue_items`, and `completion_time_logs`.
- `discardAllActiveSessionsAction`: Cleans up multiple dangling active sessions.
- `cleanupGhostSessionsAction`: Automatically purges zero-answer ghost sessions during session initialization.

---

### 5.3 User Command Center (`/home`)
Files: `app/home/page.tsx`, `components/tutor/DashboardView.tsx`

*(Note: `/dashboard` permanently redirects with HTTP 308 to `/home`)*

- **HeaderPortal Integration**: Automatically teleports the student's overall readiness index and overdue domain counter into the global navigation bar.
- **Smart Start Strip**:
  - *Spaced Recall Review*: Directly launches overdue concepts flagged by the SM-2 half-life decay function.
  - *Weak-Spot Elimination*: Automatically targets the lowest mastery domain in the syllabus.
- **Custom Mock Simulator (Pro Tier)**:
  - Configurable question volume (10, 25, or 50 questions).
  - Domain selector to drill specific syllabus sections under timed exam conditions.
- **ProjectionHero**:
  - Visual gauge displaying the calibrated percentile and score prediction band tailored to the specific exam (e.g. 1420–1480 for SAT, 695–735 for GMAT, 322–328 for GRE, Band 7.5–8.0 for IELTS, 102–108 for TOEFL).
  - Confidence tracker showing sessions completed toward sharp calibration (20+ sessions).
- **Interactive Syllabus Mastery Matrix**:
  - Grouped by subject and sub-domains.
  - In-place mastery percentage badges with questions attempted counters.
  - Interactive SM-2 calibration status tooltips.
  - One-click launch button to drill any individual domain.

---

### 5.4 Practice & Quiz History (`/history`)
Files: `app/history/page.tsx`, `components/tutor/HistoryTabsView.tsx`, `components/quiz-results/QuizHistory.tsx`

- **Dual-Tab Architecture**:
  - *Practice Sessions Tab*: Tracks adaptive practice sets, mock simulations, and spaced review sessions.
  - *Custom Quizzes Tab*: Tracks user-generated and community quizzes.
- **HeaderPortal Telemetry**: Collapses session count and average accuracy percentage into the top navbar.
- **Session History Cards**:
  - Displays exam name, session date, accuracy %, total question count, and target domains.
  - Direct deep-link to post-exam Review Mode (`/session/[id]?mode=review`).
  - Safe discard action with cascading database cleanup and optimistic UI state removal.

---

### 5.5 Analytics Unified Dashboard (`/analytics`)
Files: `app/analytics/page.tsx`

- To prevent UI clutter and eliminate duplicate database queries, metrics (Readiness Index, Day Streak, Questions Answered) and the Syllabus Mastery Map are unified directly on the **Home** dashboard (`/home`).
- `/analytics` permanently redirects directly to `/home`. Active/unfinished sessions are elevated directly to the Home dashboard via `ActiveSessionsBanner`.

---

### 5.6 Interactive Study Workstation Homepage (`/`)
Files: `app/page.tsx`, `components/landing/LandingPage.tsx`

The homepage is structured as an interactive, distraction-free study workstation:
1. **`PracticeHeroSection`**:
   - Above-the-fold authentic terminal with real test questions for each of the 6 exams.
   - Interactive answering with instant distractor trap breakdown, formula sheet modal, AST calculator, and timer.
   - Exam selector with 0ms URL query state synchronization (`?exam=gmat`).
   - Seamless bridge: question attempts are saved to `localStorage` (`landingPrefill`) and migrated to the user's active session upon login.
2. **`ThreePillarsSection`**:
   - 01. **Targeted Practice**: Skill-by-skill isolation over random mixed question sets.
   - 02. **First-Principles Solutions**: Core principles, clean derivations, and trap autopsies.
   - 03. **Spaced Repetition**: Automatic recall queues before memory decays.
3. **`GlobalExamsSection`**:
   - Complete architectural overview of the 6 standardized curricula.
   - Links directly to syllabus pages and 10-question diagnostic practice sets.
4. **`ScorePlannerSection`**:
   - Real-time score gap estimator with interactive baseline and target score sliders.
   - Empirical study hours multiplier and required question volume calculations.
5. **`SimpleCTASection`**:
   - High-contrast, clean CTA for immediate study plan creation.
   - Permanent redirect: `/landing/students` routes directly to the canonical `/`.

---

### 5.7 Practice Catalog & Syllabus Hub (`/practice`, `/practice/[exam]`, `/practice/[exam]/[subject]/[domain]`)
Files: `app/practice/page.tsx`, `components/practice/PracticeCatalogFilter.tsx`, `components/practice/TopicPracticeDrill.tsx`

- **Practice Catalog (`/practice`)**:
  - Comprehensive searchable directory of 100+ syllabus topics across all 6 exams.
  - Interactive `PracticeCatalogFilter` supporting real-time text search and exam category filtering.
  - Curated featured practice sets (`FEATURED_DRILLS`).
- **Exam Syllabus Hub (`/practice/[exam]`)**:
  - Authoritative breakdown of subjects, timing blueprints, scoring structures, and topic lists (`ExamTopicsList`).
- **In-Page Topic Practice Sets (`/practice/[exam]/[subject]/[domain]`)**:
  - Interactive zero-friction topic questions powered by `TopicPracticeDrill` and `ALL_BANKS`.
  - Curriculum knowledge base (`lib/curriculum-knowledge.ts`): Weightage tier, core principles, primary distractor traps, and topic FAQs.
  - Complete Schema.org JSON-LD BreadcrumbList and FAQPage structured data for rich search engine snippets.

---

### 5.8 Authoritative Error Benchmarks & Peer Insights (`/insights`, `/insights/[exam]/hardest-topics`)
Files: `app/insights/page.tsx`, `app/insights/[exam]/hardest-topics/page.tsx`, `components/insights/InsightsClientView.tsx`

- **Immediate Benchmarks Without Empty States**:
  - Pre-calibrated empirical error baselines across all 6 curricula (`lib/insights-queries.ts`).
  - Displays top 5 hardest topics, empirical failure rates, primary trap patterns, and average solving time.
  - Direct 1-click launch into topic-specific practice questions.
- **Architectural Redirects**:
  - Legacy `/insights/[exam]/most-failed-concepts` permanently redirects to `/insights/[exam]/hardest-topics` to consolidate SEO crawl equity.

---

### 5.9 Interactive Exam Score Estimator & Study Planner (`/predictor`)
Files: `app/predictor/page.tsx`, `components/predictor/ScorePredictorTool.tsx`

- Replaced legacy mobile/OTP phone gates with an open, client-side interactive tool.
- Supports all 6 global exam scoring scales:
  - Digital SAT (400–1600, 10-pt steps)
  - GMAT Focus (205–805, 10-pt steps ending in 5)
  - GRE General (260–340, 1-pt steps)
  - CFA Level 1 (50–90% MPS scale)
  - IELTS Academic (4.0–9.0, 0.5-band steps)
  - TOEFL iBT (40–120, 1-pt steps)
- Real-time score gap analysis, empirical study hour calculations, question count projections, and high-yield focus topics.
- Full two-way URL query parameter synchronization (`?exam=sat&current=1150&target=1450`) enabling instant plan sharing and bookmarking.
- Comprehensive Schema.org WebApplication and FAQPage structured data.

---

### 5.10 Custom Quiz Generator (`/create`, `/edit/[slug]`, `/quiz/[slug]`)
- Allows generating custom tests via three modalities:
  1. **Text Prompt**: Instant AI question generation on any topic.
  2. **Raw Notes**: Paste study notes or textbook excerpts.
  3. **PDF Upload**: Client-side parsing via `pdfjs-dist` to generate structured multiple-choice tests.
- Quizzes can be edited, published to the public catalog (`/quizzes`), or exported as PDF (`@react-pdf/renderer`) and Excel (`exceljs`) files.

---

### 5.11 Programmatic SEO, Multi-Sitemap Architecture & LLM Agents
AceThePrep implements high-performance programmatic SEO architectures:
- **Dedicated Sitemaps**:
  - `/sitemap.xml`: Primary index routing to modular child sitemaps.
  - `/(sitemap)/sitemap-practice`: All syllabus and topic practice pages.
  - `/(sitemap)/sitemap-insights`: Authoritative hardest-topic benchmark pages.
  - `/(sitemap)/sitemap-blog`: Engineering and study methodology articles.
- **Engineering & Prep Blog**: `/blog`, `/blog/[slug]`, with dynamic RSS feeds at `/blog/rss.xml`.
- **LLM Agent Discoverability**: Complete machine-readable endpoints at `/llms.txt` and `/llms-full.txt`.

---

### 5.12 Viral Growth Loop (`/s/[token]`) & Dynamic Result Cards
- Generates a shareable **Result Card** with a unique 30-day TTL token upon session completion.
- Displays percentile forecast, mastery delta, and hardest question conquered.
- Features dynamic OpenGraph card generation via Next.js Edge Route `/api/og`.

---

## 6. Monetization & Subscription Architecture

Billing is powered by **Dodo Payments** (`lib/billing.ts`, `lib/actions/billing.ts`, `app/api/webhooks/dodo/route.ts`).

### Tier Comparison & Entitlements

| Feature | Free Tier | Pro Tier (Monthly / Quarterly) |
|---|---|---|
| **Daily Questions** | Capped at 10 Questions / Day | **Unlimited Practice Questions** |
| **Session Sizes** | 10 Questions only | **10, 25, or 50 Question Practice Sets & Mocks** |
| **Custom Mock Tests** | Locked | **Unlocked (Custom domain selection)** |
| **Step-by-Step Distractor Analysis** | Basic | **Full Socratic breakdowns & Examiner Traps** |
| **Comeback Queue 3-Stage Reviews** | Standard | **Priority Spaced Automation** |
| **Percentile Calibration Forecast** | Single Baseline Band | **Deep Subject Breakdown & Band Shrinkage** |

### Plans
1. **Monthly Pro**: $29 / month (For intensive final review).
2. **3-Month Exam Season Pass**: $69 / quarter ($23/month, 25% savings).

### Webhook Event Handling
The webhook endpoint at `/api/webhooks/dodo` validates signatures and synchronizes customer records:
- `subscription.active` / `payment.succeeded`: Marks subscription status as `active` and updates `current_period_end`.
- `subscription.cancelled` / `subscription.expired`: Marks subscription status as `cancelled` or `expired`, reverting user to free tier limits seamlessly without destructive data loss.

---

## 7. Security, Auth, and Performance Optimization

### 7.1 Security Architecture
- **Row Level Security (RLS)**: Enforced across all 18 Supabase tables. Authenticated users can only read/write their own records (`auth.uid() = user_id`).
- **Server Actions & Public API Hardening**: Every Server Action and API endpoint executes a 3-step gate:
  1. Auth verification (`supabase.auth.getUser()`).
  2. Strict Zod schema validation (`parsed.data`).
  3. Database mutation with error boundary trapping.
- **No Service Key Leakage**: `SUPABASE_SECRET_KEY` / `SUPABASE_SERVICE_ROLE_KEY` is exclusively instantiated in `lib/supabase/admin.ts` on the server and never bundled into client chunks.

### 7.2 Zero-Latency Performance Principles
- **Server Components at Root**: All top-level routes (`page.tsx`) are React Server Components that fetch parallel data via `Promise.all()` directly from Supabase.
- **Client Boundaries at the Edge**: `"use client"` is isolated to interactive leaves (`SessionPlayer`, `ExamCalculator`, `DashboardView`, `PracticeCatalogFilter`, `ScorePredictorTool`, `PracticeHeroSection`).
- **Optimistic UI**: Answer clicks, session deletions, and flag toggles update client state immediately (0ms perceived latency) while submitting RPCs asynchronously in the background.

---

## 8. Development & Environment Configuration

### Required Environment Variables (`.env.local`)
```ini
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...

# AI Provider
AI_PROVIDER=deepseek                    # "deepseek" or "openai"
AI_BASE_URL=https://api.deepseek.com
DEEPSEEK_API_KEY=sk-...
OPENAI_API_KEY=sk-...

# Payments (Dodo Payments)
DODO_PAYMENTS_API_KEY=test_... or live_...
DODO_PAYMENTS_WEBHOOK_KEY=whsec_...
NEXT_PUBLIC_DODO_PRODUCT_MONTHLY=pdt_monthly_pro
NEXT_PUBLIC_DODO_PRODUCT_QUARTERLY=pdt_quarterly_pass

# Application URLs & Email
NEXT_PUBLIC_BASE_URL=https://www.acetheprep.com
RESEND_API_KEY=re_...
```

### Essential CLI Commands
- `npm run dev`: Starts Next.js development server with Turbopack.
- `npm run build`: Production compilation and static type-checking.
- `npm run generate:types`: Generates TypeScript interfaces directly from Supabase schema (`types/supabase.ts`).
- `npm run lint`: Executes Next.js & ESLint rule validation.
