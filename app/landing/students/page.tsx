// Path: app/landing/students/page.tsx
import { Suspense } from "react";
import OutOfTheBoxLanding from "@/components/landing/OutOfTheBoxLanding";

export default function StudentsLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Suspense fallback={<div className="min-h-screen" />}>
        <OutOfTheBoxLanding />
      </Suspense>
    </main>
  );
}
