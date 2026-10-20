// app/quizzes/metadata.ts
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const ogImageUrl = `${baseUrl}/api/og?type=home`;

export const metadata: Metadata = {
  title: "Practice Tests | AceThePrep",
  description:
    "Explore practice tests on any topic. Find what you don't know before exam day.",
  robots: {
    index: false,
    follow: false,
  },
  keywords: [

    "practice tests",
    "exam prep",
    "practice questions",
    "AI study",
    "learning",
    "education",
  ],
  openGraph: {
    title: "Practice Tests | AceThePrep",
    description: "Explore practice tests on any topic",
    url: `${baseUrl}/quizzes`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "AceThePrep Practice Tests",
      },
    ],
  },
  twitter: {
    title: "Practice Tests | AceThePrep",
    description: "Explore practice tests on any topic",
    images: [ogImageUrl],
  },
};