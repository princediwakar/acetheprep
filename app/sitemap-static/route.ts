// Path: app/sitemap-static/route.ts

import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

interface StaticRoute {
  url: string;
  changeFrequency?: string;
  priority?: number;
}

export async function GET() {
  const routes: StaticRoute[] = [
    { url: "", changeFrequency: "daily", priority: 1.0 }, // Homepage (GMAT Focus default)
    { url: "/practice", changeFrequency: "daily", priority: 0.95 }, // Practice Portal
    { url: "/pricing", changeFrequency: "daily", priority: 0.95 }, // Pro Pricing & Pass
    { url: "/blog", changeFrequency: "daily", priority: 0.9 }, // Blog Index
    { url: "/insights", changeFrequency: "weekly", priority: 0.85 }, // Insights & Hardest Topics
    { url: "/predictor", changeFrequency: "weekly", priority: 0.85 }, // Diagnostic Percentile Predictor
    { url: "/tools", changeFrequency: "daily", priority: 0.9 }, // Micro-Tools Hub
    { url: "/tools/gmat-focus-score-calculator", changeFrequency: "daily", priority: 0.95 }, // GMAT Focus Calculator
    { url: "/tools/digital-sat-score-calculator", changeFrequency: "daily", priority: 0.95 }, // Digital SAT Calculator
    { url: "/tools/ielts-band-score-calculator", changeFrequency: "daily", priority: 0.95 }, // IELTS Band Calculator
    { url: "/tools/toefl-to-ielts-converter", changeFrequency: "daily", priority: 0.95 }, // TOEFL to IELTS Converter
    { url: "/tools/cfa-level-1-score-calculator", changeFrequency: "daily", priority: 0.95 }, // CFA Level 1 Calculator
    { url: "/tools/gre-to-gmat-converter", changeFrequency: "daily", priority: 0.95 }, // GRE to GMAT Converter
    { url: "/compare", changeFrequency: "weekly", priority: 0.85 }, // Exam Comparisons Hub
    { url: "/compare/gmat-focus-vs-gre", changeFrequency: "weekly", priority: 0.9 }, // GMAT Focus vs GRE
    { url: "/compare/ielts-vs-toefl", changeFrequency: "weekly", priority: 0.9 }, // IELTS vs TOEFL
    { url: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const lastModified = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      const changefreq = route.changeFrequency
        ? `<changefreq>${route.changeFrequency}</changefreq>`
        : "";
      const priority =
        route.priority !== undefined ? `<priority>${route.priority}</priority>` : "";
      return `<url><loc>${baseUrl}${route.url}</loc><lastmod>${lastModified}</lastmod>${changefreq}${priority}</url>`;
    })
    .join("")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
