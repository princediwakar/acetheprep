-- Migration: 007_reddit_anchored_growth.sql
-- Engine A: Question Community Debate & Anonymous Trap Polls
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.question_community_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id TEXT NOT NULL,
    selected_option TEXT NOT NULL,
    voter_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(question_id, voter_hash)
);

-- Index for high-speed O(1) vote aggregation by question and option
CREATE INDEX IF NOT EXISTS idx_comm_votes_qid_option 
  ON public.question_community_votes(question_id, selected_option);

-- Index for voter lookup
CREATE INDEX IF NOT EXISTS idx_comm_votes_qid_voter 
  ON public.question_community_votes(question_id, voter_hash);

-- Atomic RPC function: Record or update vote and return aggregated distribution in 1 round-trip
CREATE OR REPLACE FUNCTION public.vote_question_trap(
    p_question_id TEXT,
    p_option TEXT,
    p_voter_hash TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_stats JSONB;
BEGIN
    INSERT INTO public.question_community_votes (question_id, selected_option, voter_hash)
    VALUES (p_question_id, p_option, p_voter_hash)
    ON CONFLICT (question_id, voter_hash) 
    DO UPDATE SET selected_option = EXCLUDED.selected_option, created_at = NOW();

    SELECT jsonb_object_agg(selected_option, vote_count)
    INTO v_stats
    FROM (
        SELECT selected_option, COUNT(*)::INT AS vote_count
        FROM public.question_community_votes
        WHERE question_id = p_question_id
        GROUP BY selected_option
    ) sub;

    RETURN COALESCE(v_stats, '{}'::jsonb);
END;
$$;

-- RLS: Enable public anonymous reading and voting
ALTER TABLE public.question_community_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to community votes"
  ON public.question_community_votes FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert and update to community votes"
  ON public.question_community_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to community votes"
  ON public.question_community_votes FOR UPDATE
  USING (true);

