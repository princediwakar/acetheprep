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
    { url: "", changeFrequency: "daily", priority: 1.0 }, // Homepage
    { url: "/blog", changeFrequency: "daily", priority: 0.9 }, // Blog Index
    { url: "/practice", changeFrequency: "daily", priority: 0.9 }, // Practice Portal
    { url: "/insights", changeFrequency: "weekly", priority: 0.8 }, // Insights
    { url: "/feedback", changeFrequency: "monthly", priority: 0.5 },
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
