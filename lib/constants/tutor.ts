// Path: lib/constants/tutor.ts

export const TUTOR_ROUTES = {
  SETUP: "/setup",
  SESSION_START: "/session/start",
  SESSION: (sessionId: string) => `/session/${sessionId}`,
  HOME: "/home",
  DASHBOARD: "/home",
  API_SESSION_START: "/api/session/start",
  API_SESSION_ANSWER: "/api/session/answer",
  API_SESSION_COMPLETE: "/api/session/complete",
  PUBLIC_SHARE: (token: string) => `/s/${token}`,
  PREDICTOR: "/predictor",
  API_PREDICTOR_START: "/api/predictor/start",
  API_PREDICTOR_VERIFY: "/api/predictor/verify",
  API_PREDICTOR_RESULT: "/api/predictor/result",
} as const;

export const TUTOR_ERRORS = {
  SESSION_NOT_FOUND:
    "We couldn't find this practice session. Start a new session from your dashboard.",
  SESSION_ALREADY_COMPLETED:
    "This session has already been completed. Start a new one to continue practicing.",
  QUESTION_NOT_FOUND:
    "We couldn't find this question in your session. Try refreshing the page.",
  ANSWER_ALREADY_SUBMITTED:
    "You've already submitted an answer for this question. Move on to the next one.",
  UNAUTHORIZED:
    "Sign in to access your practice sessions and track your progress.",
  INVALID_EXAM_PROFILE:
    "Your exam profile is incomplete. Update your settings to start a practice session.",
  RATE_LIMIT_EXCEEDED:
    "You've reached the daily session limit of 10. Come back tomorrow for more practice.",
  AI_GENERATION_FAILED:
    "We had trouble generating your questions. Check your connection and try again.",
} as const;

export const SESSION_INTENTS = {
  SPACED_REVIEW: 'spaced_review',
  ACTIVE_TARGET: 'active_target',
  CUSTOM_MOCK: 'custom_mock',
  DIAGNOSTIC: 'diagnostic',
} as const;

export const TUTOR_CONFIG = {
  DEFAULT_QUESTION_COUNT: Number(process.env.NEXT_PUBLIC_TUTOR_DEFAULT_QUESTION_COUNT) || 10,
  MAX_QUESTION_COUNT: Number(process.env.NEXT_PUBLIC_TUTOR_MAX_QUESTION_COUNT) || 200,
  MIN_QUESTION_COUNT: Number(process.env.NEXT_PUBLIC_TUTOR_MIN_QUESTION_COUNT) || 3,
  DIFFICULTY_DISTRIBUTION: {
    easy: 0.3,
    medium: 0.5,
    hard: 0.2,
  },
  TRIAGE_DIFFICULTY_DISTRIBUTION: {
    easy: 0.1,
    medium: 0.4,
    hard: 0.5,
  },
  NEXT_QUESTION_DELAY_MS: Number(process.env.NEXT_PUBLIC_NEXT_QUESTION_DELAY_MS) || 2000,
  REVEAL_ANSWER_COOLDOWN_MS:
    Number(process.env.NEXT_PUBLIC_REVEAL_ANSWER_COOLDOWN_MS) || 3000,
  MAX_DAILY_SESSIONS: Number(process.env.MAX_DAILY_SESSIONS) || 10,
  MAX_CUSTOM_MOCK_PER_DAY: 2,
  ACTIVE_TARGET_MAX_TOPICS: 3,
  DIAGNOSTIC_QUESTION_COUNT: 5,
  TEMPORAL_THRESHOLDS: {
    foundation: 90,
    acceleration: 30,
  },
  SM2_DEFAULTS: {
    initial_ease_factor: 2.5,
    initial_interval_days: 1,
    min_ease_factor: 1.3,
  },
  MASTERY_PRIORS: {
    weak: 0.25,
    okay: 0.5,
    strong: 0.75,
  },
} as const;

export const PREREQUISITE_WEIGHTS: Record<string, number> = {
  Calculus: 1.5,
  Algebra: 1.3,
  Trigonometry: 1.2,
  'Laws of Motion': 1.3,
  Kinematics: 1.2,
  'Work, Energy and Power': 1.2,
  Thermodynamics: 1.1,
  Electrostatics: 1.1,
  'Modern Physics': 1.0,
  'Atomic Structure': 1.1,
  'Chemical Bonding': 1.1,
  'Coordination Compounds': 0.9,
  'Complex Numbers': 1.0,
  // GMAT Focus
  'Data Sufficiency': 1.5,
  'Critical Reasoning': 1.4,
  'Reading Comprehension': 1.3,
  Arithmetic: 1.3,
  'Number Properties': 1.4,
  'Word Problems': 1.2,
  'Two-Part Analysis': 1.2,
  'Table Analysis': 1.1,
  'Graphics Interpretation': 1.1,
  'Multi-Source Reasoning': 1.1,
  // GRE General
  'Quantitative Comparison': 1.5,
  'Text Completion': 1.4,
  'Sentence Equivalence': 1.4,
  'Geometry': 1.3,
  'Data Analysis': 1.2,
  'Number Properties & Divisibility': 1.4,
  'Counting Methods & Probability': 1.3,
  'Statistics & Data Interpretation': 1.2,
  // IELTS Academic
  'Academic Vocabulary in Context': 1.4,
  'True-False-Not Given': 1.5,
  'TFNG: Modal Qualification': 1.4,
  'Headings and Main Idea Matching': 1.3,
  'Summary Completion': 1.2,
  'Multiple Choice Traps': 1.4,
  'Form and Note Completion': 1.2,
  'Task 2: Task Response (TR)': 1.5,
  'Task 2: Coherence & Cohesion (CC)': 1.4,
  // TOEFL iBT
  'Vocabulary in Context': 1.3,
  'Factual Information': 1.4,
  'Negative Factual Information': 1.4,
  'Sentence Simplification': 1.5,
  'Insert Text': 1.3,
  'Prose Summary': 1.5,
  'Gist-Content and Purpose': 1.4,
  'Function and Speaker Stance': 1.3,
  'Integrated Writing: Lecture Refutation': 1.5,
  'Academic Discussion: Contribution': 1.4,
};

export const TUTOR_AI_CONFIG = {
  MODEL: process.env.TUTOR_AI_MODEL || "deepseek-flash",
  FEATURES: {
    thinking: { type: "disabled" },
  },
  RESPONSE_FORMAT: { type: "json_object" },
  MAX_TOKENS_PER_QUESTION: 250,
  MAX_TOKENS_BUFFER: 1000,
} as const;
