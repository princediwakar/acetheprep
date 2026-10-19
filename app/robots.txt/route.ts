// Path: app/robots.txt/route.ts

import { siteConfig } from "@/config/site";

export async function GET() {
  const baseUrl = siteConfig.url;

  const robotsTxt = `# Robots.txt for ${siteConfig.name}
# LLM Knowledge Feed: ${baseUrl}/llms.txt
# Full Curriculum Feed: ${baseUrl}/llms-full.txt

User-agent: *
Allow: /
Allow: /practice/
Allow: /insights/
Allow: /blog/
Allow: /feedback
Allow: /privacy
Allow: /terms
Allow: /api/og
Disallow: /dashboard/
Disallow: /session/
Disallow: /setup
Disallow: /history/
Disallow: /edit/
Disallow: /api/

# AI Crawlers & Generative Search Engines
User-agent: GPTBot
Allow: /
Allow: /practice/
Allow: /insights/
Allow: /blog/
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /dashboard/
Disallow: /session/
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Allow: /practice/
Allow: /insights/
Allow: /blog/
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /dashboard/
Disallow: /session/
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Allow: /practice/
Allow: /insights/
Allow: /blog/
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /dashboard/
Disallow: /session/
Disallow: /api/

User-agent: Google-Extended
Allow: /
Allow: /practice/
Allow: /insights/
Allow: /blog/

User-agent: Applebot-Extended
Allow: /
Allow: /practice/
Allow: /insights/
Allow: /blog/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}