import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "AceThePrep — Real Exam Readiness | Free Adaptive Practice",
		template: "%s | AceThePrep",
	},
	description:
		"Coverage is not readiness. Master common mistakes, build fast recall under exam conditions, and lock concepts into long-term memory for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, and TOEFL.",
	keywords: [
		"Digital SAT prep",
		"GRE preparation",
		"GMAT Focus prep",
		"CFA Level 1 exam",
		"IELTS Academic practice",
		"TOEFL iBT prep",
		"exam readiness",
		"active recall",
		"spaced repetition",
		"free test prep",
		"distractor analysis",
		"competitive exams",
	],

	openGraph: {
		title: "AceThePrep — Real Exam Readiness | Free Adaptive Practice",
		description:
			"Coverage is not readiness. Master common mistakes, build fast recall under exam conditions, and lock concepts into long-term memory.",
		url: process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com",
		siteName: "AceThePrep",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com"}/api/og?type=home`,
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AceThePrep — Real Exam Readiness",
		description:
			"Coverage is not readiness. Master common mistakes, build fast recall under exam conditions, and lock concepts into long-term memory.",
		images: [
			`${process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com"}/api/og?type=home`,
		],
	},
};
