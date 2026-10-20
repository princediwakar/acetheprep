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
    target: `${baseUrl}/quizzes?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
} as WithContext<WebSite>;

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: baseUrl,
  logo: `${baseUrl}/icon.ico`,
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
  educationalLevel: "High School, Undergraduate, Graduate",
  teaches: "Physics, Chemistry, Mathematics, Biology, Logical Reasoning, Quantitative Aptitude",
  educationalUse: "Personalized adaptive practice, knowledge assessment, spaced repetition review",
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
  logo: `${baseUrl}/icon.ico`,
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
    name: q.questionText.length > 110 ? q.questionText.slice(0, 107) + "..." : q.questionText,
    suggestedAnswer: q.options.map((opt) => ({
      "@type": "Answer",
      text: `${opt.label}) ${opt.text}`,
    })),
    acceptedAnswer: {
      "@type": "Answer",
      text: `${q.correctOption}) ${q.correctText}`,
    },
  })),
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