// Path: app/(sitemap)/sitemap-questions/[id]/route.ts

import { ALL_BANK_ENTRIES } from "@/lib/data/banks";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;
const entriesPerSitemap = 50000;

interface RouteParams {
  id: string;
}

interface QuestionSitemapUrl {
  loc: string;
  priority: number;
  changefreq: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const resolvedParams = await params;
  const page = parseInt(resolvedParams.id) - 1;

  if (isNaN(page) || page < 0) {
    return new Response(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      },
    );
  }

  const allUrls: QuestionSitemapUrl[] = ALL_BANK_ENTRIES.map((entry) => ({
    loc: `${baseUrl}/q/${entry.slug}`,
    priority: 0.85,
    changefreq: "weekly",
  }));

  const paginatedUrls = allUrls.slice(
    page * entriesPerSitemap,
    (page + 1) * entriesPerSitemap,
  );

  const lastModified = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paginatedUrls
    .map(
      (item) =>
        `<url><loc>${item.loc}</loc><lastmod>${lastModified}</lastmod><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`,
    )
    .join("\n  ")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}

