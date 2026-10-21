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
          label="Student Stories"
          title="From textbook burnout to top scores."
          subtitle="Hear from students across SAT, GRE, GMAT, and CFA who replaced passive reading with real timed practice."
        />
        <div className="mt-16">
          <SocialProofClient testimonials={testimonials} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
