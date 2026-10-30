// components/quiz/QuizCardInfo.tsx
import { FC } from "react";

interface QuizCardInfoProps {
  title: string;
  creatorName?: string;
  description?: string;
}

export const QuizCardInfo: FC<QuizCardInfoProps> = ({
  title,
  creatorName,
  description,
}) => (
  <div className="space-y-1.5">
    <h3 className="text-sm font-semibold line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-snug">
      {title}
    </h3>

    {creatorName && (
      <p className="text-[11px] text-muted-foreground">
        By <span className="font-medium text-foreground/75">{creatorName}</span>
      </p>
    )}

    {description && (
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {description}
      </p>
    )}
  </div>
);
