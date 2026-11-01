// app/quizzes/metadata.ts
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";
const ogImageUrl = `${baseUrl}/api/og?type=home`;

export const metadata: Metadata = {
  title: "Public Practice Quizzes & Subject Mock Tests | AceThePrep",
  description:
    "Explore community-shared and AI-curated practice quizzes across competitive exams, quantitative reasoning, verbal ability, and data insights.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${baseUrl}/quizzes`,
  },
  keywords: [
    "practice tests",
    "public quizzes",
    "competitive exam prep",
    "quantitative reasoning tests",
    "verbal reasoning quiz",
    "data insights practice",
    "AI quiz generator",
    "free test prep",
  ],
  openGraph: {
    title: "Public Practice Quizzes & Subject Mock Tests | AceThePrep",
    description: "Explore curated practice tests and drills shared by the test-prep community.",
    url: `${baseUrl}/quizzes`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "AceThePrep Public Practice Tests",
      },
    ],
  },
  twitter: {
    title: "Public Practice Quizzes & Subject Mock Tests | AceThePrep",
    description: "Explore curated practice tests and drills shared by the test-prep community.",
    images: [ogImageUrl],
  },
};