// Path: app/predictor/page.tsx

import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { ScorePredictorTool } from "@/components/predictor/ScorePredictorTool";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { Calculator, Sparkles, BookOpen, TrendingUp, HelpCircle } from "lucide-react";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";

const baseUrl = siteConfig.url;

export default function PredictorPage() {
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Score Predictor", url: `${baseUrl}/predictor` },
  ];

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AceThePrep Exam Score Gap & Study Planner",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free adaptive score estimator and deliberate study timeline planner for Digital SAT, GMAT Focus, GRE General, and CFA Level 1.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many study hours are needed to improve 100 points on the Digital SAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Based on empirical data across adaptive modules, closing a 100-point gap on the Digital SAT typically requires ~30 to 50 hours of deliberate practice targeting specific misconception patterns (such as Extraneous Solutions and Rhetorical Synthesis) rather than passive video watching.",
        },
      },
      {
        "@type": "Question",
        name: "How is score improvement calculated on the GMAT Focus Edition?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The GMAT Focus Edition is scored from 205 to 805 in 10-point increments across Quantitative, Verbal, and Data Insights. Improving 30 to 50 points requires targeted mastery of high-penalty mistake patterns like Data Sufficiency traps and Multi-Source Reasoning synthesis.",
        },
      },
      {
        "@type": "Question",
        name: "Can I save or share my calculated study timeline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every adjustment to your baseline and target scores updates your URL query parameters in real time, allowing you to bookmark or share your customized preparation plan with study partners.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />
      <StructuredData schema={softwareAppSchema as any} />
      <StructuredData schema={faqSchema as any} />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <PageHero
          badge={
            <HeroBadge icon={Calculator}>
              Interactive Diagnostic Engine
            </HeroBadge>
          }
          title="Exam Score Estimator & Study Planner"
          subtitle="Determine the realistic preparation time, question volume, and high-yield focus topics required to close your target score gap."
        />

        {/* Interactive Tool */}
        <Suspense
          fallback={
            <div className="h-96 rounded-2xl border border-border/80 bg-card p-8 animate-pulse flex items-center justify-center text-muted-foreground text-sm">
              Loading Diagnostic Engine...
            </div>
          }
        >
          <ScorePredictorTool />
        </Suspense>

        {/* FAQ Section */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-muted-foreground">
              Methodology and empirical guidelines for score projection.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{faq.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}