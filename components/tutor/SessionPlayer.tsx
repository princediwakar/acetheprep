// Path: components/tutor/SessionPlayer.tsx
"use client";

import { ExamCalculator } from "@/components/tutor/ExamCalculator";
import { SessionStartScreen } from "@/components/tutor/player/SessionStartScreen";
import { SessionPaletteModal } from "@/components/tutor/player/SessionPaletteModal";
import { SessionExitModal } from "@/components/tutor/player/SessionExitModal";
import { SessionSectionReview } from "@/components/tutor/player/SessionSectionReview";
import { SessionResultsView } from "@/components/tutor/player/SessionResultsView";
import { SessionProctorHeader } from "@/components/tutor/player/SessionProctorHeader";
import { SessionActionDock } from "@/components/tutor/player/SessionActionDock";
import { QuestionCard } from "@/components/tutor/player/QuestionCard";
import { useSessionEngine } from "@/components/tutor/player/hooks/useSessionEngine";
import type { SessionQuestion, SelectedOption } from "@/types/tutor";

export interface QuestionAttemptRecord {
  selected: SelectedOption | null;
  isCorrect: boolean;
  wasRevealed: boolean;
  timeMs: number;
}

export interface SessionPlayerProps {
  sessionId: string;
  questions: SessionQuestion[];
  examProfileId: string;
  taxonomyDomains?: string[];
  initialMastery?: Record<string, number>;
  initialMode?: "tutor" | "exam";
  examName?: string;
  isReviewMode?: boolean;
  initialUserAttempts?: Record<string, QuestionAttemptRecord>;
  initialScore?: number;
  initialTimeElapsed?: number;
  initialIndex?: number;
  autoStart?: boolean;
}

export function SessionPlayer(props: SessionPlayerProps) {
  const {
    examName,
    questions,
  } = props;

  const {
    mode,
    hasStarted,
    currentIndex,
    current,
    total,
    selectedOption,
    answerState,
    isCorrect,
    score,
    sessionComplete,
    setSessionComplete,
    startingNext,
    userAttempts,
    answeredCount,
    totalTimeElapsed,
    showExitDialog,
    setShowExitDialog,
    isDiscarding,
    showSectionReview,
    setShowSectionReview,
    flaggedQuestions,
    showTimer,
    setShowTimer,
    showCalculator,
    setShowCalculator,
    showPalette,
    setShowPalette,
    nextDomain,
    handleStartTest,
    handleDiscardSession,
    handleFinishEarly,
    handleOptionClick,
    handleNext,
    handlePrev,
    handleSkipQuestion,
    handleJumpToQuestion,
    handleToggleFlag,
    handleBackToDashboard,
    handleStartNextTopic,
  } = useSessionEngine(props);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const estimatedMinutes = Math.max(1, Math.round(questions.length * 1.5));

  // --- Start Screen ---
  if (!hasStarted) {
    return (
      <SessionStartScreen
        examName={examName}
        questionCount={questions.length}
        estimatedMinutes={estimatedMinutes}
        skillDomain={current?.skill_domain}
        mode={mode}
        onStart={handleStartTest}
        onDiscard={handleDiscardSession}
        isDiscarding={isDiscarding}
      />
    );
  }

  // --- Official Section Review Screen (Pre-Submission Review) ---
  if (showSectionReview && !sessionComplete) {
    return (
      <SessionSectionReview
        examName={examName}
        currentIndex={currentIndex}
        total={total}
        questions={questions}
        userAttempts={userAttempts}
        flaggedQuestions={flaggedQuestions}
        totalTimeElapsed={totalTimeElapsed}
        showTimer={showTimer}
        onReturnToCurrent={() => setShowSectionReview(false)}
        onJumpToQuestion={handleJumpToQuestion}
        onSubmitFinal={() => {
          setShowSectionReview(false);
          setSessionComplete(true);
        }}
        formatTime={formatTime}
      />
    );
  }

  // --- Session Complete Screen (Post-Exam Diagnostic Review) ---
  if (sessionComplete) {
    return (
      <SessionResultsView
        examName={examName}
        total={total}
        score={score}
        totalTimeElapsed={totalTimeElapsed}
        questions={questions}
        userAttempts={userAttempts}
        flaggedQuestions={flaggedQuestions}
        nextDomain={nextDomain}
        startingNext={startingNext}
        onBackToDashboard={handleBackToDashboard}
        onStartNextTopic={handleStartNextTopic}
        formatTime={formatTime}
      />
    );
  }

  // --- Active Test Runner Screen ---
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background select-none">
      <ExamCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        examName={examName}
      />

      <SessionPaletteModal
        isOpen={showPalette}
        onClose={() => setShowPalette(false)}
        total={total}
        currentIndex={currentIndex}
        questions={questions}
        userAttempts={userAttempts}
        flaggedQuestions={flaggedQuestions}
        onJumpToQuestion={handleJumpToQuestion}
        onOpenSectionReview={() => {
          setShowPalette(false);
          setShowSectionReview(true);
        }}
      />

      <SessionProctorHeader
        examName={examName}
        skillDomain={current.skill_domain}
        mode={mode}
        showTimer={showTimer}
        totalTimeElapsed={totalTimeElapsed}
        showCalculator={showCalculator}
        onToggleTimer={() => setShowTimer((prev) => !prev)}
        onToggleCalculator={() => setShowCalculator((prev) => !prev)}
        onEndTest={() => setShowExitDialog(true)}
        formatTime={formatTime}
      />

      <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 bg-background">
        <QuestionCard
          current={current}
          mode={mode}
          selectedOption={selectedOption}
          answerState={answerState}
          isCorrect={isCorrect}
          onOptionClick={handleOptionClick}
        />
      </main>

      <SessionActionDock
        currentIndex={currentIndex}
        total={total}
        flaggedQuestions={flaggedQuestions}
        answerState={answerState}
        selectedOption={selectedOption}
        mode={mode}
        onTogglePalette={() => setShowPalette((prev) => !prev)}
        onToggleFlag={handleToggleFlag}
        onOpenSectionReview={() => setShowSectionReview(true)}
        onPrev={handlePrev}
        onNext={handleNext}
        onSkip={handleSkipQuestion}
      />

      <SessionExitModal
        isOpen={showExitDialog}
        onOpenChange={setShowExitDialog}
        answeredCount={answeredCount}
        total={total}
        isDiscarding={isDiscarding}
        onFinishEarly={handleFinishEarly}
        onDiscard={handleDiscardSession}
      />
    </div>
  );
}
