// Path: app/pricing/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscriptionStatus } from "@/lib/billing";
import { PricingCards } from "@/components/billing/PricingCards";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, HelpCircle, ShieldCheck, Sparkles, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Plans | AceThePrep — Calibrated AI Test Prep",
  description:
    "Simple, transparent pricing for competitive exams. Start free with 10-question practice sets or unlock 25Q practice sets and 50Q full mock tests with AceThePrep Pro.",
};

const COMPARISON_ROWS = [
  {
    feature: "10-Question Practice Sets",
    starter: true,
    pro: true,
    description: "Targeted quick drills across any subject domain",
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
    feature: "25-Question Sectional Practice",
    starter: false,
    pro: true,
    description: "Realistic sectional stamina drills with timed pressure",
  },
  {
    feature: "50-Question Full Mock Tests",
    starter: false,
    pro: true,
    description: "Real test conditions with full solutions and score breakdown revealed when you finish",
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
    a: "We provide dedicated taxonomies and calibrated distractor engines for Digital SAT, GRE General, GMAT Focus, CFA Level 1, IELTS Academic, TOEFL iBT, JEE Main, NEET, CAT, GATE, UPSC CSE, CLAT, and CA Foundation.",
  },
  {
    q: "What makes AceThePrep different from traditional question banks?",
    a: "Traditional question banks give you static answer keys. AceThePrep uses step-by-step cognitive breakdowns that analyze why you picked a specific distractor option, exposing the exact misconception or calculation trap before you make it on test day.",
  },
];

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const subscriptionStatus = user
    ? await getUserSubscriptionStatus(user.id)
    : { isPro: false, planType: null };

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-wider font-semibold py-1 px-3">
          <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
          Transparent & Simple Pricing
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Invest in Your Target Score, Not Generic Prep.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Start free with 10-question practice sets. Upgrade to AceThePrep Pro when you are ready for full 25Q practice sets and 50Q mock tests.
        </p>
      </div>

      {/* Pricing Cards */}
      <PricingCards userEmail={user?.email} isPro={subscriptionStatus.isPro} />

      {/* Comparison Matrix */}
      <div className="max-w-4xl mx-auto mt-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
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
        <div className="pt-2">
          <Link
            href={user ? "/home" : "/setup"}
            className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-all text-sm"
          >
            {user ? "Go to Home" : "Set Up Free Profile"}
          </Link>
        </div>
      </div>
    </main>
  );
}
