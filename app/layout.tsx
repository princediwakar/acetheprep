import { ThemeProvider } from "@/components/ThemeProvider"

import { AppShell } from "@/components/AppShell";
import { Toaster } from "@/components/ui/sonner"
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { Metadata, Viewport } from "next";
import StructuredData, { websiteSchema, organizationSchema, educationalOrgSchema, educationalAppSchema } from "@/components/seo/StructuredData";
import "./globals.css";
import "katex/dist/katex.min.css";

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrl =
    rawBaseUrl && (rawBaseUrl.startsWith("http://") || rawBaseUrl.startsWith("https://"))
        ? rawBaseUrl
        : "https://www.acetheprep.com";

export const metadata: Metadata = {
    title: {
        default: "AceThePrep — Real Exam Readiness for SAT, GRE, GMAT, CFA & Global Exams",
        template: "%s | AceThePrep",
    },
    description: "Adaptive exam preparation for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, TOEFL, and global competitive exams. Master common mistakes, build recall under exam conditions, and stop memory decay.",
    keywords: ["Digital SAT prep", "GRE preparation", "GMAT Focus prep", "CFA Level 1 exam", "IELTS practice", "TOEFL iBT", "exam readiness", "active recall", "spaced repetition", "distractor analysis", "adaptive test prep", "free practice questions"],
    alternates: {
        canonical: baseUrl,
        types: {
            "application/rss+xml": `${baseUrl}/blog/rss.xml`,
            "text/markdown": `${baseUrl}/llms.txt`,
        },
    },
    openGraph: {
        title: "AceThePrep — Real Exam Readiness for SAT, GRE, GMAT, CFA & Global Exams",
        description: "Adaptive exam preparation for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, and global exams. Master common mistakes with personalized distractor analysis.",
        url: baseUrl,
        siteName: "AceThePrep",
        images: [{ url: `${baseUrl}/api/og?type=home`, width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AceThePrep — Real Exam Readiness for SAT, GRE, GMAT & CFA",
        description: "Adaptive exam preparation for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS, and TOEFL. Spaced repetition with instant mistake analysis.",
        images: [`${baseUrl}/api/og?type=home`],
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/_static/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/_static/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/site.webmanifest",
    metadataBase: new URL(baseUrl),
};


export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StructuredData schema={websiteSchema} />
                    <StructuredData schema={organizationSchema} />
                    <StructuredData schema={educationalOrgSchema} />
                    <StructuredData schema={educationalAppSchema} />
                    <AppShell>
                        {children}
                        <FeedbackWidget />
                        <Toaster position="top-center" richColors />
                    </AppShell>
                </ThemeProvider>
            </body>
        </html>
    );
}
