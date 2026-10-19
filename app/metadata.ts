import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "AceThePrep — Free AI-Powered Exam Prep for JEE, NEET, UPSC & More",
		template: "%s | AceThePrep",
	},
	description:
		"Free AI-powered exam preparation for JEE Main, NEET, UPSC, GMAT, CAT, and more. Adaptive spaced repetition, personalized assessments, and detailed distractor analysis. Start your free assessment in 5 minutes.",
	keywords: [
		"exam prep",
		"JEE Main preparation",
		"NEET preparation",
		"UPSC preparation",
		"AI tutor",
		"spaced repetition",
		"practice questions",
		"free test prep",
		"practice test",
		"competitive exams",
	],
	openGraph: {
		title: "AceThePrep — Free AI-Powered Exam Prep for JEE, NEET, UPSC & More",
		description:
			"Free AI-powered exam preparation with adaptive spaced repetition. Personalized assessments, distractor analysis, and 10 exam tracks including JEE, NEET, UPSC, and GMAT.",
		url: process.env.NEXT_PUBLIC_BASE_URL,
		siteName: "AceThePrep",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?type=home`,
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AceThePrep — Free AI-Powered Exam Prep",
		description:
			"Free AI-powered exam preparation for JEE, NEET, UPSC, GMAT, CAT. Adaptive spaced repetition with personalized assessments.",
		images: [
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?type=home`,
		],
	},
};
