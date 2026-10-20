# AceThePrep — Comprehensive System Architecture & Application Guide

## 1. Executive Summary & Product Mission

**AceThePrep** (`acetheprep.com`) is an adaptive, AI-powered competitive exam preparation and active-recall drilling platform. It is engineered from first principles to solve the fundamental failure mode of traditional exam prep: **passive rereading and uncalibrated practice**. 

Rather than treating practice tests as static PDFs or rote question banks, AceThePrep models each student's memory state using spaced repetition, diagnoses deep cognitive traps through distractor analysis, dynamically selects high-yield questions using a priority engine, and forecasts calibrated percentile bands backed by empirical testing data.

### Supported Curricula & Exam Taxonomies
AceThePrep provides structured, multi-tier syllabus taxonomies covering:
- **STEM & Engineering/Medical**: JEE Main (Physics, Chemistry, Mathematics), NEET (Physics, Chemistry, Biology), GATE (Engineering Math, Core Engineering, General Aptitude).
- **Graduate & Business School Admissions**: GMAT Focus (Quantitative Reasoning, Verbal Reasoning, Data Insights), GRE (Verbal, Quant, Analytical Writing), CAT (Verbal Ability, DILR, QA).
- **Undergraduate & College Admissions**: SAT (Reading & Writing, Mathematics).
- **Civil Services & Law**: UPSC CSE (GS I, II, III, CSAT), CLAT (English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques).
- **Professional Finance & Accounting**: CFA Level 1 (10 Topic Areas), CA Foundation (Accounting, Business Laws, Math, Economics).
- **Language Proficiency**: IELTS Academic (Reading, Listening), TOEFL iBT (Reading, Listening).

---

## 2. Technology Stack & Physical Architecture

The platform is designed for near zero-friction, minimal round-trip latency, and strict type safety:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                              │
│   Next.js 16 (React 19) • Tailwind CSS • Radix UI • KaTeX Math Rendering │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / WSS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        EDGE / NEXT.JS PROXY                            │
│   proxy.ts (Auth Token Refresh, Session Cookie Validation, Rerouting)   │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       SERVER COMPONENTS / ACTIONS    │  │       API ROUTE HANDLERS     │
│   • page.tsx (Parallel Data Fetch)   │  │   • /api/session/*           │
│   • lib/actions/billing.ts           │  │   • /api/predictor/*         │
│   • lib/actions/tutor.ts             │  │   • /api/comeback/*          │
│   • lib/actions/auth.ts              │  │   • /api/webhooks/dodo       │
└───────────────────┬──────────────────┘  └──────────────┬───────────────┘
                    │                                    │
                    ▼                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       DATA & EXTERNAL SERVICES                         │
│  ┌──────────────────────┐ ┌────────────────────┐ ┌───────────────────┐ │
│  │ Supabase PostgreSQL │ │ AI Model Engine    │ │ Dodo Payments     │ │
│  │  - Auth (OAuth/SSR)  │ │  - DeepSeek Flash  │ │  - Subscriptions  │ │
│  │  - RLS Policies      │ │  - OpenAI GPT-4o   │ │  - Webhooks       │ │
│  │  - Stored RPCs       │ │  - DeepSeek Search │ │  - Customer Portal│ │
│  └──────────────────────┘ └────────────────────┘ └───────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Technologies
- **Framework**: Next.js 16.2 with Turbopack, React 19, TypeScript 5.8.
- **Styling & Components**: Tailwind CSS, shadcn/ui (Radix UI primitives), Lucide React icons, Framer Motion for micro-interactions, Recharts for analytics data visualization.
- **Mathematics & Formula Rendering**: KaTeX with `@matejmazur/react-katex` for high-performance rendering of algebraic expressions, chemistry equations, and LaTeX physics notations.
- **Backend & Database**: Supabase (PostgreSQL 15+) with Row Level Security (RLS), custom RPC functions, and automated TypeScript schema generation (`types/supabase.ts`).
- **Authentication**: Supabase Auth with Google OAuth, managed server-side via `@supabase/ssr` with cookie persistence in `proxy.ts`.
- **AI Question Generation & Tutor Engine**: OpenAI SDK interfacing with DeepSeek (`deepseek-flash`) or OpenAI (`gpt-4o`), augmented by custom prompt templates, JSON repair/recovery routines, and DeepSeek Search for current-affairs validation.
- **Payment Processing**: Dodo Payments (`@dodopayments/nextjs`, SDK v2) supporting global recurring cards, Indian UPI, NetBanking, and automated subscription lifecycle management via webhooks.
- **Document Processing**: `pdf-parse`, `pdfjs-dist`, `pdf-lib` for reading source materials, and `exceljs` / `@react-pdf/renderer` for quiz exporting.

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

- **Exam Weight ($W$)**: Historical question frequency extracted from past 10-year official exam papers (e.g., JEE Main 10-year topic frequency weights).
- **Knowledge Gap ($G$)**: $1 - \text{MasteryScore}$.
- **Forgetting Risk ($R$)**:
  $$R = 1 - \exp\left(-\frac{\ln(2) \times \text{DaysSinceReview}}{\text{HalfLife}}\right) \times \text{ProximityFactor}$$
  Where half-life varies by time mode (Foundation: 30d, Acceleration: 14d, Triage: 7d).
- **$C_{\text{tier}}$ Cap**: The 75th percentile empirical completion time logged across all students for that difficulty tier (Foundation: 30m, Application: 45m, Advanced: 60m, Expert: 75m), preventing low-yield time sinks from monopolizing prep time.

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

### 3.4 Percentile & Score Prediction Engine
Files: `lib/predictor/engine.ts`, `lib/predictor/nta-priors.ts`, `lib/calibration.ts`

Predicts official exam percentiles and marks with narrowing confidence intervals:
- **Cold-Start Phase**: Uses official public NTA (National Testing Agency) normalization tables linking marks to percentiles.
- **Dynamic Blending Weight ($\alpha$)**:
  $$\alpha = \min\left(1.0, \; \sqrt{\frac{\text{Sessions Completed}}{20}}\right)$$
  - Session 0: 100% public baseline prior.
  - Session 5: 50% public, 50% personal performance.
  - Session 20+: 100% personal calibrated performance.
- **Band Shrinkage**: Initial confidence bands span $\pm 5-8$ percentile points. As sessions accumulate, the confidence band contracts to sharp bounds ($\pm 1.5-2$ points).
- **Calibration Snapshots**: Before major exam dates, predictions freeze into `calibration_snapshots` to evaluate prediction sharpness against actual released exam scores (`actual_results`).

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
         │                                │
         ├─────────────<┌─────────────────▼──┐
         │              │      sessions      │
         │              └─────────┬──────────┘
         │                        │
         ├─────────────<┌─────────▼──────────┐
         │              │  session_answers   │
         │              └────────────────────┘
         │
         ├─────────────<┌────────────────────┐
         │              │   subscriptions    │
         │              └────────────────────┘
         │
         ├─────────────<┌────────────────────┐
         │              │    result_cards    │
         │              └────────────────────┘
         │
         └─────────────<┌────────────────────┐            ┌───────────────────┐
                        │      quizzes       │───────────<│     questions     │
                        └────────────────────┘            └───────────────────┘
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

6. **`comeback_queue_items`**:
   - `id` (UUID, PK), `user_id` (UUID), `exam_profile_id` (UUID, FK), `original_session_id` (UUID, FK), `question_id` (Text), `skill_domain` (Text), `difficulty_tier` (Text), `stage` (`immediate` | `delayed` | `transfer`), `stage_deadline` (Timestamptz), `explanation_shown` (Bool), `immediate_passed` (Bool), `delayed_passed` (Bool), `transfer_passed` (Bool), `cleared` (Bool), `lost_projected_points` (Float).

7. **`predictions`**:
   - `id` (UUID, PK), `exam_profile_id` (UUID, FK), `user_id` (UUID), `predicted_percentile` (Float), `band_lower` (Float), `band_upper` (Float), `sessions_used` (Int), `subject_breakdown` (JSONB), `calibration_source` (Text), `is_frozen` (Bool), `frozen_at` (Timestamptz).

8. **`actual_results`**:
   - `id` (UUID, PK), `user_id` (UUID), `prediction_id` (UUID, FK), `exam_name` (Text), `session_label` (Text), `actual_marks` (Float), `actual_percentile` (Float), `subject_breakdown` (JSONB), `opted_in` (Bool).

9. **`subscriptions`**:
   - `id` (UUID, PK), `user_id` (UUID, FK), `dodo_subscription_id` (Text, Unique), `dodo_customer_id` (Text), `status` (`active` | `past_due` | `cancelled` | `expired` | `inactive`), `plan_type` (`monthly` | `quarterly`), `product_id` (Text), `current_period_end` (Timestamptz).

10. **`result_cards`**:
    - `id` (UUID, PK), `user_id` (UUID), `share_token` (Text, Unique), `card_type` (Text), `card_data` (JSONB), `expires_at` (Timestamptz, 30-day TTL), `view_count` (Int).

11. **`quizzes` & `questions`**:
    - Standalone generated tests: `quiz_id` (UUID, PK), `creator_id` (UUID), `title`, `topic`, `subject`, `difficulty`, `is_public` (Bool), `questions` related with `question_text`, `options` (JSONB), `correct_option`, `explanation`, `distractor_analysis` (JSONB), `metadata_json`.

---

## 5. User Journey & Feature Specifications

### 5.1 Onboarding & Setup (`/setup`)
- **Exam Picker**: Select target exam from the 13 supported curriculums.
- **Target Date**: Exam date picker that automatically classifies prep timeline into **Foundation** ($>90$ days), **Acceleration** ($30-90$ days), or **Triage** ($<30$ days).
- **Self-Assessment Priors**: User rates subjects as Weak (prior: 0.25), Okay (prior: 0.50), or Strong (prior: 0.75), initializing their prior distribution without requiring a 3-hour diagnostic exam.
- **Auth Guard**: If not signed in, routes through Google OAuth and redirects back to complete profile initialization.

### 5.2 The Active Recall Practice Session (`/session/[id]`)
- **Dual Practice Modes**:
  1. **Tutor Mode**: Immediate instant feedback on every click. Explains why the selected option was correct or reveals the distractor trap (e.g., *Cartesian sign inversion*, *kinetic vs thermodynamic control*). Includes a 3-second cooldown to discourage blind answer guessing.
  2. **Exam Mode**: Strict timed simulation. Answers are hidden during test execution. A full score breakdown, time per question, and distractor review are shown upon completion.
- **LaTeX Math Support**: Mathematical and chemical expressions render natively via KaTeX syntax ($`\int_a^b f(x)dx`$, matrices, chemical equations).
- **Real-Time SM-2 Ingestion**: Every answer click calls `POST /api/session/answer` using PostgreSQL atomic RPC `submit_answer`, instantaneously queuing mistake items to the Comeback Queue if answered incorrectly.

### 5.3 User Command Center (`/dashboard`)
- **Readiness Index**: Dynamic 0-100% weighted index reflecting mastery across all syllabus domains.
- **Projected Percentile & Confidence Band**: Real-time display of predicted percentile range (e.g., $97.2 - 98.8\%$) with session count calibration status.
- **Syllabus Mastery Grid**: Visual progress bars per subject and domain, highlighting overdue reviews and weakest topics.
- **Quick-Start Session Actions**: 
  - *Spaced Review Session* (overdue concepts).
  - *Weak-Spot Elimination* (lowest mastery domains).
  - *Custom Mock Drill* (Pro tier feature).

### 5.4 Custom Quiz Generator (`/create`)
- Allows generating custom tests via three modalities:
  1. **Text Topic**: Instant AI prompt generation.
  2. **Raw Notes / Paste Text**: Extracts questions directly from user notes.
  3. **PDF Upload**: Extracts text using client-side `pdfjs-dist` and generates structured quizzes with graph or table supporting data.
- Quizzes can be edited, shared publicly, or exported as formatted PDF and Excel files.

### 5.5 Viral Growth Loop (`/s/[token]`)
- Upon completing a session or mock exam, students can generate a shareable **Result Card** with a unique 30-day token.
- Displays:
  - Percentile forecast or overall score.
  - "Mastery Delta" (domains improved during that specific session).
  - Hardest question conquered with complete step-by-step logic.
  - Dynamic OpenGraph preview images generated on-the-fly (`/api/og`).

### 5.6 Percentile Predictor (`/predictor`)
- Funnel page enabling students to check their exam readiness.
- Supports phone verification with OTP authentication to link mobile users to their diagnostic baseline.

---

## 6. Monetization & Subscription Architecture

Billing is powered by **Dodo Payments** (`lib/billing.ts`, `lib/actions/billing.ts`, `app/api/webhooks/dodo/route.ts`).

### Tier Comparison & Entitlements

| Feature | Free Tier | Pro Tier (Monthly / Quarterly) |
|---|---|---|
| **Daily Questions** | Capped at 10 Questions / Day | **Unlimited Questions** |
| **Session Sizes** | 10 Questions only | **10, 25, or 50 Question Full Simulations** |
| **Custom Mock Tests** | Locked | **Unlocked (Custom domain selection)** |
| **Step-by-Step Distractor Analysis** | Basic | **Full Socratic breakdowns & Traps** |
| **Comeback Queue 3-Stage Reviews** | Standard | **Priority Spaced Automation** |
| **Percentile Calibration Forecast** | Single Baseline Band | **Deep Subject Breakdown & Band Shrinkage** |

### Plans
1. **Monthly Pro**: $29 / month (For final intensive review).
2. **3-Month Exam Season Pass**: $69 / quarter ($23/month, 25% savings).

### Webhook Event Handling
Webhook endpoint at `/api/webhooks/dodo` verifies incoming Dodo signatures and manages user subscription state:
- `subscription.active` / `payment.succeeded`: Sets subscription status to `active` and records `current_period_end`.
- `subscription.cancelled` / `subscription.expired`: Marks subscription status as `cancelled` or `expired`, reverting user to free tier limits seamlessly without destructive data loss.

---

## 7. Security, Auth, and Performance Optimization

### 7.1 Security Architecture
- **Row Level Security (RLS)**: Enforced across all Supabase tables. Authenticated users can only read/write their own records (`auth.uid() = user_id`).
- **Server Actions & Public API Hardening**: Every Server Action and API endpoint executes a 3-step gate:
  1. Auth verification (`supabase.auth.getUser()`).
  2. Strict Zod schema validation (`parsed.data`).
  3. Database mutation with error boundary trapping.
- **No Service Key Leakage**: `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_SECRET_KEY` is exclusively instantiated in `lib/supabase/admin.ts` and never bundled into client chunks.

### 7.2 Zero-Latency Performance Principles
- **Server Components at Root**: All top-level routes (`page.tsx`) are React Server Components that fetch parallel data via `Promise.all()` directly from Supabase.
- **Client Boundaries at the Edge**: `"use client"` is isolated to interactive leaves (`SessionPlayer`, `SetupForm`, `DashboardView`).
- **Optimistic UI**: Answer selections update state immediately on the client (0ms perceived latency) while submitting RPCs asynchronously in the background.

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
NEXT_PUBLIC_BASE_URL=https://acetheprep.com
RESEND_API_KEY=re_...
```

### Essential CLI Commands
- `npm run dev`: Starts Next.js development server with Turbopack.
- `npm run build`: Production compilation and static type-checking.
- `npm run generate:types`: Generates TypeScript interfaces directly from Supabase schema.
- `npm run lint`: Executes Next.js & ESLint rule validation.
