-- Migration: 005_question_bank.sql
-- High-speed pre-materialized question bank for instant retrieval and 0% duplication
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  skill_domain TEXT NOT NULL,
  difficulty_tier INT NOT NULL CHECK (difficulty_tier IN (1, 2, 3)),
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option TEXT NOT NULL,
  explanation TEXT NOT NULL,
  distractor_analysis JSONB DEFAULT '{}'::jsonb,
  misconception TEXT,
  time_estimate_seconds INT DEFAULT 60,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata_json JSONB DEFAULT '{}'::jsonb
);

-- Index for high-speed domain & tier matching by Priority Engine
CREATE INDEX IF NOT EXISTS idx_question_bank_lookup 
  ON question_bank (exam_name, skill_domain, difficulty_tier);

-- Index for general domain queries
CREATE INDEX IF NOT EXISTS idx_question_bank_domain 
  ON question_bank (skill_domain);

-- Index for instant user deduplication check
CREATE INDEX IF NOT EXISTS idx_session_answers_user_qid 
  ON session_answers (user_id, question_id);
