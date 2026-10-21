import { Suspense } from "react";
import PublicLanding from "@/components/landing/PublicLanding";

interface StudentsLandingProps {
  initialExam?: string;
}

export default function StudentsLanding({ initialExam }: StudentsLandingProps) {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Suspense fallback={<div className="min-h-screen" />}>
        <PublicLanding initialExam={initialExam} />
      </Suspense>
    </main>
  );
}
