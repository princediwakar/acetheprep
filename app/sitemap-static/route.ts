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
    { url: "/?exam=sat", changeFrequency: "daily", priority: 0.95 }, // Digital SAT Trap Arena
    { url: "/?exam=gre", changeFrequency: "daily", priority: 0.95 }, // GRE General Trap Arena
    { url: "/?exam=cfa", changeFrequency: "daily", priority: 0.95 }, // CFA Level 1 Trap Arena
    { url: "/?exam=ielts", changeFrequency: "daily", priority: 0.95 }, // IELTS Academic Trap Arena
    { url: "/?exam=toefl", changeFrequency: "daily", priority: 0.95 }, // TOEFL iBT Trap Arena
    { url: "/practice", changeFrequency: "daily", priority: 0.95 }, // Practice Portal
    { url: "/pricing", changeFrequency: "daily", priority: 0.95 }, // Pro Pricing & Pass
    { url: "/blog", changeFrequency: "daily", priority: 0.9 }, // Blog Index
    { url: "/insights", changeFrequency: "weekly", priority: 0.85 }, // Insights & Hardest Topics
    { url: "/predictor", changeFrequency: "weekly", priority: 0.8 }, // Diagnostic Percentile Predictor
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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
