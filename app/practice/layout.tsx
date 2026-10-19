// Path: app/practice/layout.tsx

import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

export const metadata: Metadata = {
  title: {
    default: "Practice Questions | AceThePrep",
    template: "%s | AceThePrep",
  },
  description:
    "Free exam practice questions with AI-generated explanations and distractor analysis. Prepare for JEE, NEET, UPSC, GMAT, SAT, GRE, CAT, GATE, CLAT, and CA Foundation.",
  keywords: [
    "practice questions",
    "exam preparation",
    "free test prep",
    "AI-generated questions",
    "JEE practice",
    "NEET practice",
    "UPSC practice",
    "GMAT practice",
    "SAT practice",
    "GRE practice",
  ],
  openGraph: {
    title: "Practice Questions | AceThePrep",
    description:
      "Free exam practice questions with AI-generated explanations and distractor analysis.",
    url: `${baseUrl}/practice`,
    siteName: "AceThePrep",
    images: [{ url: `${baseUrl}/api/og?type=practice&title=Practice%20Questions&topic=AceThePrep`, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
