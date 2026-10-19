// Path: app/landing/students/page.tsx

import dynamic from "next/dynamic";
import InteractiveDemoHero from "@/components/landing/InteractiveDemoHero";
import CognitiveFlowSection from "@/components/landing/CognitiveFlowSection";
import ReliefComparisonSection from "@/components/landing/ReliefComparisonSection";
import ExamTracksSection from "@/components/landing/ExamTracksSection";
import CTA from "@/components/landing/CTA";
import SiteFooter from "@/components/landing/SiteFooter";

const SocialProofSection = dynamic(
  () => import("@/components/landing/SocialProofSection"),
);
const PeerInsightsSection = dynamic(
  () => import("@/components/landing/PeerInsightsSection"),
);

const StudentsLanding = async () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <InteractiveDemoHero />
      <CognitiveFlowSection />
      <ReliefComparisonSection />
      <ExamTracksSection />
      <PeerInsightsSection />
      <SocialProofSection />
      <CTA />
      <SiteFooter />
    </main>
  );
};

export default StudentsLanding;
