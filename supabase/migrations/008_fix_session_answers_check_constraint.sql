-- Migration: 008_fix_session_answers_check_constraint.sql
-- Allow options 'E' and 'F' (and NULL for free-text/semantic answers) in session_answers

ALTER TABLE session_answers
  DROP CONSTRAINT IF EXISTS question_results_selected_option_check;

ALTER TABLE session_answers
  DROP CONSTRAINT IF EXISTS session_answers_selected_option_check;

ALTER TABLE session_answers
  ADD CONSTRAINT session_answers_selected_option_check
  CHECK (selected_option IN ('A', 'B', 'C', 'D', 'E', 'F') OR selected_option IS NULL);
