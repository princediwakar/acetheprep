-- Migration: 006_purge_indian_exams.sql
-- Description: Permanently purge all Indian national exam data and references
-- Target Exams: 'JEE Main', 'NEET', 'CAT', 'GATE', 'UPSC CSE', 'CLAT', 'CA Foundation', 'JEE Advanced', 'UPSC Civil Services'

BEGIN;

-- 1. Create list of decommissioned exams
CREATE TEMP TABLE decommissioned_exams (name TEXT);
INSERT INTO decommissioned_exams (name) VALUES 
  ('JEE Main'),
  ('NEET'),
  ('CAT'),
  ('GATE'),
  ('UPSC CSE'),
  ('UPSC Civil Services'),
  ('CLAT'),
  ('CA Foundation'),
  ('JEE Advanced');

-- 2. Identify all exam_profile_ids linked to decommissioned exams
CREATE TEMP TABLE target_profiles AS
SELECT profile_id 
FROM exam_profiles 
WHERE exam_name IN (SELECT name FROM decommissioned_exams);

-- 3. Cascade delete user activity linked to these profiles
DELETE FROM session_answers 
WHERE session_id IN (
  SELECT id FROM sessions WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles)
);

DELETE FROM completion_time_logs
WHERE session_id IN (
  SELECT id FROM sessions WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles)
);

DELETE FROM sessions 
WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles);

DELETE FROM concept_mastery 
WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles);

DELETE FROM predictions 
WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles);

DO $$
BEGIN
  IF to_regclass('public.comeback_queue') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.comeback_queue WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles)';
  END IF;
  IF to_regclass('public.comeback_queue_items') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.comeback_queue_items WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles)';
  END IF;
END $$;

DELETE FROM predictor_sessions 
WHERE exam_profile_id IN (SELECT profile_id FROM target_profiles)
   OR exam_name IN (SELECT name FROM decommissioned_exams);

-- 4. Delete the exam profiles themselves
DELETE FROM exam_profiles 
WHERE profile_id IN (SELECT profile_id FROM target_profiles);

-- 5. Delete pre-materialized questions in question_bank
DELETE FROM question_bank 
WHERE exam_name IN (SELECT name FROM decommissioned_exams);

-- 6. Delete topic weights and prior distributions
DELETE FROM exam_topic_weights 
WHERE exam_name IN (SELECT name FROM decommissioned_exams);

-- 7. Clean up temp tables
DROP TABLE target_profiles;
DROP TABLE decommissioned_exams;

COMMIT;
