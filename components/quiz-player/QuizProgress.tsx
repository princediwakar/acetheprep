interface QuizProgressProps {
  current: number; // Now expects 1-based index
  total: number;
}

export const QuizProgress = ({ current, total }: QuizProgressProps) => (
  <>
    <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
      <div
        className="bg-primary h-full rounded-full transition-all duration-300"
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
    </div>
    <div className="text-xs text-muted-foreground mb-6 font-mono">
      Question {current} of {total}
    </div>
  </>
);