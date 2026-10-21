// Path: app/predictor/layout.tsx
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Free Exam Score & Percentile Predictor",
  description:
    "Calibrate your test readiness with empirical diagnostic telemetry. Get predictive score percentiles and confidence intervals for standardized competitive exams.",
  alternates: {
    canonical: `${baseUrl}/predictor`,
  },
  openGraph: {
    title: `Free Exam Score & Percentile Predictor | ${siteConfig.name}`,
    description:
      "Calibrate your test readiness with empirical diagnostic telemetry. Get predictive score percentiles and confidence intervals.",
    url: `${baseUrl}/predictor`,
    images: [
      {
        url: `${baseUrl}/api/og?type=insights&title=Score%20%26%20Percentile%20Predictor&topic=Diagnostic%20Engine`,
        width: 1200,
        height: 630,
        alt: "AceThePrep Score & Percentile Predictor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Exam Score & Percentile Predictor | ${siteConfig.name}`,
    description:
      "Calibrate your test readiness with empirical diagnostic telemetry. Get predictive score percentiles.",
    images: [
      `${baseUrl}/api/og?type=insights&title=Score%20%26%20Percentile%20Predictor&topic=Diagnostic%20Engine`,
    ],
  },
};

export default function PredictorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
