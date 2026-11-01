-- Migration: 009_enable_rls_and_policies.sql
-- Description: Locks down all unrestricted tables with Row Level Security (RLS) and strict access policies
-- Run this in Supabase SQL Editor

-- ==============================================================================
-- 1. PUBLIC READ-ONLY REFERENCE / CACHE TABLES
-- Any user (authenticated or anon) can read questions/weights; only backend (service_role) can mutate.
-- ==============================================================================

-- question_bank
DO $$ BEGIN
  IF to_regclass('public.question_bank') IS NOT NULL THEN
    ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow public read access to question_bank" ON public.question_bank;
    CREATE POLICY "Allow public read access to question_bank"
      ON public.question_bank FOR SELECT
      USING (true);

    DROP POLICY IF EXISTS "Service role full access to question_bank" ON public.question_bank;
    CREATE POLICY "Service role full access to question_bank"
      ON public.question_bank FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- practice_questions
DO $$ BEGIN
  IF to_regclass('public.practice_questions') IS NOT NULL THEN
    ALTER TABLE public.practice_questions ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow public read access to practice_questions" ON public.practice_questions;
    CREATE POLICY "Allow public read access to practice_questions"
      ON public.practice_questions FOR SELECT
      USING (true);

    DROP POLICY IF EXISTS "Service role full access to practice_questions" ON public.practice_questions;
    CREATE POLICY "Service role full access to practice_questions"
      ON public.practice_questions FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- exam_topic_weights
DO $$ BEGIN
  IF to_regclass('public.exam_topic_weights') IS NOT NULL THEN
    ALTER TABLE public.exam_topic_weights ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow public read access to exam_topic_weights" ON public.exam_topic_weights;
    CREATE POLICY "Allow public read access to exam_topic_weights"
      ON public.exam_topic_weights FOR SELECT
      USING (true);

    DROP POLICY IF EXISTS "Service role full access to exam_topic_weights" ON public.exam_topic_weights;
    CREATE POLICY "Service role full access to exam_topic_weights"
      ON public.exam_topic_weights FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- calibration_snapshots
DO $$ BEGIN
  IF to_regclass('public.calibration_snapshots') IS NOT NULL THEN
    ALTER TABLE public.calibration_snapshots ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow public read access to calibration_snapshots" ON public.calibration_snapshots;
    CREATE POLICY "Allow public read access to calibration_snapshots"
      ON public.calibration_snapshots FOR SELECT
      USING (true);

    DROP POLICY IF EXISTS "Service role full access to calibration_snapshots" ON public.calibration_snapshots;
    CREATE POLICY "Service role full access to calibration_snapshots"
      ON public.calibration_snapshots FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- 2. USER-SCOPED DATA TABLES
-- Authenticated users can only view, insert, update, and delete their own rows.
-- Uses (auth.uid()::text = user_id::text) so it works regardless of UUID vs TEXT column types.
-- ==============================================================================

-- predictions
DO $$ BEGIN
  IF to_regclass('public.predictions') IS NOT NULL THEN
    ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own predictions" ON public.predictions;
    CREATE POLICY "Users can manage own predictions"
      ON public.predictions FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to predictions" ON public.predictions;
    CREATE POLICY "Service role full access to predictions"
      ON public.predictions FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- actual_results
DO $$ BEGIN
  IF to_regclass('public.actual_results') IS NOT NULL THEN
    ALTER TABLE public.actual_results ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own actual_results" ON public.actual_results;
    CREATE POLICY "Users can manage own actual_results"
      ON public.actual_results FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to actual_results" ON public.actual_results;
    CREATE POLICY "Service role full access to actual_results"
      ON public.actual_results FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- comeback_queue_items
DO $$ BEGIN
  IF to_regclass('public.comeback_queue_items') IS NOT NULL THEN
    ALTER TABLE public.comeback_queue_items ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own comeback_queue_items" ON public.comeback_queue_items;
    CREATE POLICY "Users can manage own comeback_queue_items"
      ON public.comeback_queue_items FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to comeback_queue_items" ON public.comeback_queue_items;
    CREATE POLICY "Service role full access to comeback_queue_items"
      ON public.comeback_queue_items FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- comeback_queue (legacy table fallback)
DO $$ BEGIN
  IF to_regclass('public.comeback_queue') IS NOT NULL THEN
    ALTER TABLE public.comeback_queue ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own comeback_queue" ON public.comeback_queue;
    CREATE POLICY "Users can manage own comeback_queue"
      ON public.comeback_queue FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to comeback_queue" ON public.comeback_queue;
    CREATE POLICY "Service role full access to comeback_queue"
      ON public.comeback_queue FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- completion_time_logs
DO $$ BEGIN
  IF to_regclass('public.completion_time_logs') IS NOT NULL THEN
    ALTER TABLE public.completion_time_logs ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own completion_time_logs" ON public.completion_time_logs;
    CREATE POLICY "Users can manage own completion_time_logs"
      ON public.completion_time_logs FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to completion_time_logs" ON public.completion_time_logs;
    CREATE POLICY "Service role full access to completion_time_logs"
      ON public.completion_time_logs FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- sessions
DO $$ BEGIN
  IF to_regclass('public.sessions') IS NOT NULL THEN
    ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own sessions" ON public.sessions;
    CREATE POLICY "Users can manage own sessions"
      ON public.sessions FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to sessions" ON public.sessions;
    CREATE POLICY "Service role full access to sessions"
      ON public.sessions FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- session_answers
DO $$ BEGIN
  IF to_regclass('public.session_answers') IS NOT NULL THEN
    ALTER TABLE public.session_answers ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users can manage own session_answers" ON public.session_answers;
    CREATE POLICY "Users can manage own session_answers"
      ON public.session_answers FOR ALL
      TO authenticated
      USING (auth.uid()::text = user_id::text)
      WITH CHECK (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to session_answers" ON public.session_answers;
    CREATE POLICY "Service role full access to session_answers"
      ON public.session_answers FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- 3. SENSITIVE SERVER-MANAGED TABLES (OTP & PHONE AUTH)
-- Block all public anon read/write via PostgREST.
-- Only server (service_role) or authenticated user looking up their own session can access.
-- ==============================================================================

-- predictor_sessions
DO $$ BEGIN
  IF to_regclass('public.predictor_sessions') IS NOT NULL THEN
    ALTER TABLE public.predictor_sessions ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Users view own predictor sessions" ON public.predictor_sessions;
    CREATE POLICY "Users view own predictor sessions"
      ON public.predictor_sessions FOR SELECT
      TO authenticated
      USING (auth.uid()::text = user_id::text);

    DROP POLICY IF EXISTS "Service role full access to predictor_sessions" ON public.predictor_sessions;
    CREATE POLICY "Service role full access to predictor_sessions"
      ON public.predictor_sessions FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
