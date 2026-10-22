// Path: app/blog/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { getAllBlogPosts, getBlogFilterOptions } from "@/lib/mdx";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";
import { BlogClientView } from "@/components/blog/BlogClientView";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Engineering & Cognitive Science Guides",
  description:
    "First-principles research and strategy on memory decay, spaced repetition, distractor psychometrics, and high-yield competitive exam prep for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS Academic, and TOEFL iBT.",
  alternates: {
    canonical: `${baseUrl}/blog`,
    types: {
      "application/rss+xml": `${baseUrl}/blog/rss.xml`,
    },
  },
  openGraph: {
    title: `Engineering & Cognitive Science Guides | ${siteConfig.name}`,
    description:
      "First-principles research and strategy on memory decay, spaced repetition, distractor psychometrics, and high-yield exam prep for SAT, GRE, GMAT Focus, CFA, IELTS, and TOEFL.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og?type=blog&title=Engineering%20%26%20Cognitive%20Science%20Guides&topic=Exam%20Architecture`,
        width: 1200,
        height: 630,
        alt: "AceThePrep Cognitive Science Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Engineering & Cognitive Science Guides | ${siteConfig.name}`,
    description:
      "First-principles research on memory decay, spaced repetition, and distractor psychometrics.",
    images: [`${baseUrl}/api/og?type=blog&title=Engineering%20%26%20Cognitive%20Science%20Guides&topic=Exam%20Architecture`],
  },
};

export default async function BlogIndexPage() {
  const [allPosts, filterOptions] = await Promise.all([
    getAllBlogPosts(),
    getBlogFilterOptions(),
  ]);

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Blog & Research", url: `${baseUrl}/blog` },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />
      <Suspense fallback={<div className="max-w-5xl mx-auto py-12" />}>
        <BlogClientView allPosts={allPosts} filterOptions={filterOptions} />
      </Suspense>
    </div>
  );
}
