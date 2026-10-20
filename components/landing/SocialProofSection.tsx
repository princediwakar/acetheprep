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
          label="Student Results"
          title="Over 50,000 students have transformed how they prepare."
          subtitle="Real results from students across SAT, GRE, GMAT, JEE, NEET, and CAT who replaced passive reading with active recall."
        />
        <div className="mt-16">
          <SocialProofClient testimonials={testimonials} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
