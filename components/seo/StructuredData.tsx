// File: components/seo/StructuredData.tsx
import { WithContext, WebSite, Organization } from "schema-dts";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteConfig.name} - Cognitive Science Exam Prep`,
  url: baseUrl,
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/practice?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
} as WithContext<WebSite>;

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: baseUrl,
  logo: `${baseUrl}/apple-touch-icon.png`,
  sameAs: [siteConfig.links.github],
};

export const educationalAppSchema: WithContext<any> = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: siteConfig.name,
  url: baseUrl,
  description: siteConfig.description,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  educationalLevel: "Undergraduate, Graduate, Professional",
  teaches: "Digital SAT Math & Reading, GRE Quantitative & Verbal, GMAT Focus Data Insights, CFA Level 1 Financial Analysis, IELTS Academic, TOEFL iBT",
  educationalUse: "Personalized adaptive practice, distractor error analysis, spaced repetition retrieval",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const educationalOrgSchema: WithContext<any> = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  url: baseUrl,
  logo: `${baseUrl}/apple-touch-icon.png`,
  description: siteConfig.description,
  sameAs: [siteConfig.links.github],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "exam aspirants",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free AI-powered exam practice with no credit card required",
  },
};

export const practiceQuizSchema = (params: {
  url: string;
  examName: string;
  domain: string;
  subject: string;
  description: string;
  questions: Array<{
    questionText: string;
    options: { label: string; text: string }[];
    correctOption: string;
    correctText: string;
    distractorAnalysis?: Record<string, string>;
    explanation?: string;
  }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: `${params.domain} Practice Questions - ${params.examName}`,
  description: params.description,
  url: params.url,
  educationalLevel: params.examName,
  about: { "@type": "Thing", name: params.domain },
  hasPart: params.questions.map((q) => ({
    "@type": "Question",
    eduQuestionType: "Multiple choice",
    learningResourceType: "Practice problem",
    name: q.questionText.length > 110 ? q.questionText.slice(0, 107) + "..." : q.questionText,
    text: q.questionText,
    suggestedAnswer: q.options.map((opt) => ({
      "@type": "Answer",
      text: `${opt.label}) ${opt.text}`,
      comment: q.distractorAnalysis?.[opt.label]
        ? `Common misconception: ${q.distractorAnalysis[opt.label]}`
        : undefined,
    })),
    acceptedAnswer: {
      "@type": "Answer",
      text: `${q.correctOption}) ${q.correctText}`,
      comment: q.explanation || "Correct step-by-step mathematical or logical solution.",
    },
  })),
});

export const productOfferSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${siteConfig.name} Pro Test Prep`,
  description: "Official adaptive question banks, distractor teardowns, full mock simulations, and spaced review scheduler for Digital SAT, GRE, GMAT Focus, and CFA Level 1.",
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
  offers: [
    {
      "@type": "Offer",
      name: "AceThePrep Free Diagnostic Tier",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
    },
    {
      "@type": "Offer",
      name: "AceThePrep Pro Monthly",
      price: "29",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      priceValidUntil: "2027-12-31",
    },
    {
      "@type": "Offer",
      name: "AceThePrep 3-Month Season Pass",
      price: "69",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      priceValidUntil: "2027-12-31",
    },
  ],
});

export const faqPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const insightsDatasetSchema = (params: {
  url: string;
  examName: string;
  reportType: string;
  description: string;
  datePublished: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: `${params.examName} ${params.reportType} — ${siteConfig.name}`,
  description: params.description,
  url: params.url,
  creator: { "@type": "Organization", name: siteConfig.name, url: baseUrl },
  datePublished: params.datePublished,
  educationalLevel: params.examName,
});

export const learningResourceSchema = (params: {
  url: string;
  examName: string;
  domains: string[];
  scorePct: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: `${params.examName} Practice Session — ${params.scorePct}%`,
  url: params.url,
  educationalLevel: params.examName,
  teaches: params.domains,
  educationalUse: "Practice Session",
  provider: { "@type": "Organization", name: siteConfig.name, url: baseUrl },
});

export const examCourseSchema = (params: {
  examName: string;
  description: string;
  url: string;
  subjects: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: `${params.examName} Preparation & Retrieval Practice Curriculum`,
  description: params.description,
  url: params.url,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    sameAs: siteConfig.url,
  },
  educationalLevel: params.examName,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "Self-paced adaptive retrieval practice",
  },
  teaches: params.subjects,
});

export const educationalCredentialSchema = (params: {
  examName: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  name: `${params.examName} Readiness Assessment`,
  description: params.description,
  url: params.url,
  credentialCategory: "Competitive Examination Readiness",
  recognizedBy: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
});

export const subjectCourseSchema = (params: {
  examName: string;
  subjectName: string;
  description: string;
  url: string;
  domains: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: `${params.examName} ${params.subjectName} Modules`,
  description: params.description,
  url: params.url,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    sameAs: siteConfig.url,
  },
  educationalLevel: params.examName,
  teaches: params.domains,
});

export const toolWebApplicationSchema = (params: {
  name: string;
  url: string;
  description: string;
  featureList?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: params.name,
  url: params.url,
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: params.featureList || [
    "0ms client-side calculation",
    "Official 2026 concordance models",
    "Percentile ranking calibrator",
    "No registration or email required",
  ],
  description: params.description,
});

export const concordanceDatasetSchema = (params: {
  name: string;
  url: string;
  description: string;
  variableMeasured: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: params.name,
  description: params.description,
  url: params.url,
  creator: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  variableMeasured: params.variableMeasured,
  license: "https://creativecommons.org/licenses/by/4.0/",
});

interface StructuredDataProps {
  schema: WithContext<any>;
}

export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default StructuredData;