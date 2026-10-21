import { Suspense } from "react";
import LandingPage from "@/components/landing/LandingPage";

interface StudentsLandingProps {
  initialExam?: string;
}

export default function StudentsLanding({ initialExam }: StudentsLandingProps) {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Suspense fallback={<div className="min-h-screen" />}>
        <LandingPage initialExam={initialExam} />
      </Suspense>
    </main>
  );
}
