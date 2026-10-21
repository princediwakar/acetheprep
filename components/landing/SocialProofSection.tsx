// Path: components/landing/SocialProofSection.tsx

import { HeaderSection } from "@/components/shared/HeaderSection";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { studentTestimonials } from "@/config/landing";
import { SocialProofClient } from "./SocialProofSection.client";

export default function SocialProofSection() {
  const testimonials = studentTestimonials.slice(0, 6);

  return (
    <section className="relative py-20 sm:py-28">
      <MaxWidthWrapper>
        <HeaderSection
          label="Verified Exam Calibration"
          title="Engineered for high-stakes test-day precision."
          subtitle="Real diagnostic results from test takers across Digital SAT, GRE, GMAT Focus, CFA, IELTS, and TOEFL who replaced passive reading with calibrated retrieval."
        />
        <div className="mt-16">
          <SocialProofClient testimonials={testimonials} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
