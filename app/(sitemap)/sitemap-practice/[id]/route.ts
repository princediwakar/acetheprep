// Path: app/(sitemap)/sitemap-practice/[id]/route.ts

import { getAllTaxonomyEntries } from "@/lib/slugs";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;
const entriesPerSitemap = 50000;

interface RouteParams {
  id: string;
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

  const allEntries = getAllTaxonomyEntries();
  const paginatedEntries = allEntries.slice(
    page * entriesPerSitemap,
    (page + 1) * entriesPerSitemap,
  );

  const lastModified = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paginatedEntries
    .map(
      (entry) =>
        `<url><loc>${baseUrl}/practice/${entry.examSlug}/${entry.subjectSlug}/${entry.domainSlug}</loc><lastmod>${lastModified}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    )
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
