import { FeedbackList } from "@/components/feedback/FeedbackList";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Student Feedback & Reviews",
  description:
    "Read verified student feedback and reviews on AceThePrep. See how candidates prepare for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, and TOEFL.",
  alternates: {
    canonical: `${baseUrl}/feedback`,
  },
  openGraph: {
    title: `Student Feedback & Platform Reviews | ${siteConfig.name}`,
    description:
      "Read real feedback from students mastering exam mistakes and building test recall with AceThePrep.",
    url: `${baseUrl}/feedback`,
    images: [
      {
        url: `${baseUrl}/api/og?type=home&title=Student%20Feedback%20%26%20Reviews&topic=Real%20Readiness`,
        width: 1200,
        height: 630,
        alt: "AceThePrep Student Feedback",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Student Feedback & Platform Reviews | ${siteConfig.name}`,
    description:
      "Read real feedback from students mastering exam mistakes with AceThePrep.",
    images: [`${baseUrl}/api/og?type=home&title=Student%20Feedback%20%26%20Reviews&topic=Real%20Readiness`],
  },
};

export default function FeedbackPage() {
	return (
		<div className="container mx-auto p-4">
			<div className="mx-auto">
				<h1 className="text-3xl font-bold mb-6">
					User Feedback
				</h1>
				<FeedbackList />
			</div>
		</div>
	);
}
