// Path: app/pricing/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PricingCards } from "@/components/billing/PricingCards";
import { FullPaymentTrustBanner } from "@/components/billing/PaymentTrustBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Sparkles, X } from "lucide-react";
import { PageHero, HeroBadge } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site";
import StructuredData, {
  faqPageSchema,
  productOfferSchema,
  breadcrumbSchema,
} from "@/components/seo/StructuredData";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Pricing & Plans — Transparent Test Prep",
  description:
    "Simple, transparent pricing for Digital SAT, GRE, GMAT Focus, and CFA Level 1. Start free with 10-question practice sets or unlock official sectional drills and full mock simulations with AceThePrep Pro.",
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
  openGraph: {
    title: `Pricing & Plans | ${siteConfig.name}`,
    description:
      "Simple, transparent pricing for competitive exams. Start free with 10-question practice sets or unlock official sectional drills and full mock simulations with AceThePrep Pro.",
    url: `${baseUrl}/pricing`,
    images: [
      {
        url: `${baseUrl}/api/og?type=home&title=Pricing%20%26%20Plans&topic=AceThePrep%20Pro`,
        width: 1200,
        height: 630,
        alt: "AceThePrep Pricing & Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing & Plans | ${siteConfig.name}`,
    description:
      "Simple, transparent pricing for competitive exams. Free adaptive practice + Pro mock simulations.",
    images: [`${baseUrl}/api/og?type=home&title=Pricing%20%26%20Plans&topic=AceThePrep%20Pro`],
  },
};

const COMPARISON_ROWS = [
  {
    feature: "10-Question Quick Practice Sets",
    starter: true,
    pro: true,
    description: "Targeted practice questions across any subject domain",
  },
  {
    feature: "Step-by-Step Solutions & Mistake Explanations",
    starter: true,
    pro: true,
    description: "Clear explanations showing why correct answers work and why tempting wrong options fail",
  },
  {
    feature: "Baseline Readiness Index",
    starter: true,
    pro: true,
    description: "Calibrated diagnostic score based on accuracy and solving speed",
  },
  {
    feature: "Official Sectional Practice Modules",
    starter: false,
    pro: true,
    description: "Timed practice modules matching official section lengths and time limits",
  },
  {
    feature: "Official Full Mock Exam Simulations",
    starter: false,
    pro: true,
    description: "Real test conditions matching official question counts and timing for your exam, with full solutions revealed when you finish",
  },
  {
    feature: "Unlimited Daily AI Sessions",
    starter: false,
    pro: true,
    description: "Generate as many targeted practice mocks as you need without limits",
  },
  {
    feature: "SM-2 Spaced Repetition Priority Queue",
    starter: false,
    pro: true,
    description: "Algorithmically resurfaces decaying concepts right before you forget them",
  },
  {
    feature: "Cross-Subject Weakness Diagnostic Radar",
    starter: false,
    pro: true,
    description: "Pinpoints exactly which syllabus domains cost you the most marks",
  },
];

const FAQS = [
  {
    q: "How does billing and payment work?",
    a: "Payments are processed securely via Dodo Payments, our global Merchant of Record. We accept all major international credit/debit cards, Apple Pay, Google Pay, and domestic Indian payment methods including UPI and Netbanking.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel your monthly subscription at any time with a single click. You will retain full Pro access until the end of your current billing period.",
  },
  {
    q: "Why should I pick the 3-Month Exam Season Pass?",
    a: "Competitive exams like GMAT, CFA, GRE, or SAT follow a 2 to 3 month preparation cycle. The Season Pass provides 90 days of uninterrupted access for a single payment of $69 ($23/month), saving you 25% compared to monthly renewal.",
  },
  {
    q: "Which exams does AceThePrep support?",
    a: "We provide dedicated taxonomies and calibrated distractor engines for Digital SAT, GRE General, GMAT Focus, CFA Level 1, IELTS Academic, and TOEFL iBT.",
  },
  {
    q: "What makes AceThePrep different from traditional question banks?",
    a: "Traditional question banks give you static answer keys. AceThePrep uses step-by-step cognitive breakdowns that analyze why you picked a specific distractor option, exposing the exact misconception or calculation trap before you make it on test day.",
  },
];

export default function PricingPage() {
  const pricingFaqs = FAQS.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={productOfferSchema()} />
      <StructuredData schema={faqPageSchema(pricingFaqs)} />
      <StructuredData
        schema={breadcrumbSchema([
          { name: "Home", url: baseUrl },
          { name: "Pricing", url: `${baseUrl}/pricing` },
        ])}
      />

      {/* Hero Section */}
      <div className="mb-14">
        <PageHero
          badge={
            <HeroBadge icon={Sparkles}>
              Transparent &amp; Simple Pricing
            </HeroBadge>
          }
          title="Invest in Your Target Score, Not Generic Prep."
          subtitle="Start free with 10-question practice sets. Upgrade to AceThePrep Pro when you are ready for full 25Q practice sets and 50Q mock tests."
        />
      </div>

      {/* Pricing Cards */}
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch" aria-hidden="true">
            <div className="rounded-3xl border border-border/80 bg-card p-7 sm:p-8 h-[520px] flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-8 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded" />
                <Skeleton className="h-10 w-28 rounded-lg mt-4" />
                <div className="space-y-2 pt-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full rounded" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="rounded-3xl border-2 border-primary/20 bg-card p-7 sm:p-8 h-[520px] flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                <Skeleton className="h-5 w-32 rounded-full" />
                <Skeleton className="h-8 w-52 rounded-lg" />
                <Skeleton className="h-4 w-72 rounded" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Skeleton className="h-14 rounded-xl" />
                  <Skeleton className="h-14 rounded-xl" />
                </div>
                <div className="space-y-2 pt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full rounded" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        }
      >
        <PricingCards />
      </Suspense>

      {/* Institutional Trust & Security Banner */}
      <div className="max-w-4xl mx-auto mt-12">
        <FullPaymentTrustBanner />
      </div>

      {/* Comparison Matrix */}
      <div className="max-w-4xl mx-auto mt-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
            Compare Plan Features
          </h2>
          <p className="text-sm text-muted-foreground">
            Clear, honest feature breakdown. Zero hidden limits.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-muted/40 p-4 font-semibold text-sm border-b border-border/80">
            <div className="col-span-6 sm:col-span-7 text-foreground">Capability</div>
            <div className="col-span-3 sm:col-span-2 text-center text-muted-foreground">Starter</div>
            <div className="col-span-3 sm:col-span-3 text-center text-primary font-bold">Pro Member</div>
          </div>

          <div className="divide-y divide-border/60">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.feature} className="grid grid-cols-12 p-4 items-center text-sm hover:bg-muted/10 transition-colors">
                <div className="col-span-6 sm:col-span-7 pr-2">
                  <div className="font-medium text-foreground">{row.feature}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block mt-0.5">{row.description}</div>
                </div>
                <div className="col-span-3 sm:col-span-2 flex justify-center">
                  {row.starter ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/40" />
                  )}
                </div>
                <div className="col-span-3 sm:col-span-3 flex justify-center">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <Check className="w-3.5 h-3.5 text-primary" /> Included
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto mt-24 space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
            Questions & Answers
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border/80 rounded-xl px-5 bg-card/60 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-base py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-4xl mx-auto mt-24 rounded-3xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/30 p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Ready to test your real exam readiness?
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Take your first 10-question practice session in seconds. Zero credit card required to start.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/setup"
            className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-all text-sm"
          >
            Start Free Diagnostic
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center font-semibold px-6 py-3.5 rounded-xl border border-border bg-card hover:bg-secondary transition-all text-sm text-foreground"
          >
            Browse Practice Banks
          </Link>
        </div>
      </div>
    </main>
  );
}
