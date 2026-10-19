// Path: app/(sitemap)/sitemap-insights/[id]/route.ts
import taxonomyData from "@/lib/taxonomies.json";
import { siteConfig } from "@/config/site";
import { examToSlug } from "@/lib/slugs";

const baseUrl = siteConfig.url;
const entriesPerSitemap = 50000;

type TaxonomyMap = Record<string, Record<string, string[]>>;
const taxonomy = taxonomyData as unknown as TaxonomyMap;

interface RouteParams {
  id: string;
}

interface SitemapEntry {
  url: string;
  lastModified: string;
  priority: number;
}

function getAllInsightsEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const lastModified = new Date().toISOString();

  // Top-level insights landing page
  entries.push({
    url: "/insights",
    lastModified,
    priority: 0.85,
  });

  // Per-exam insight pages with canonical kebab-case slugs
  for (const exam of Object.keys(taxonomy)) {
    if (exam === "_schema_version") continue;
    const examSlug = examToSlug(exam);

    entries.push({
      url: `/insights/${examSlug}/hardest-topics`,
      lastModified,
      priority: 0.8,
    });
    entries.push({
      url: `/insights/${examSlug}/most-failed-concepts`,
      lastModified,
      priority: 0.8,
    });
  }

  return entries;
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

  const allEntries = getAllInsightsEntries();
  const paginatedEntries = allEntries.slice(
    page * entriesPerSitemap,
    (page + 1) * entriesPerSitemap,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paginatedEntries
    .map(
      (entry) =>
        `<url><loc>${baseUrl}${entry.url}</loc><lastmod>${entry.lastModified}</lastmod><changefreq>daily</changefreq><priority>${entry.priority}</priority></url>`,
    )
    .join("\n  ")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
