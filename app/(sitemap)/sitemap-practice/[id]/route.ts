// Path: app/(sitemap)/sitemap-practice/[id]/route.ts

import { getAllTaxonomyEntries, examToSlug, subjectToSlug, GLOBAL_EXAM_PRIORITY } from "@/lib/slugs";
import { siteConfig } from "@/config/site";
import taxonomyRaw from "@/lib/taxonomies.json";

const baseUrl = siteConfig.url;
const entriesPerSitemap = 50000;

interface RouteParams {
  id: string;
}

interface PracticeSitemapUrl {
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

  const allUrls: PracticeSitemapUrl[] = [];

  // 1. Root Practice Portal
  allUrls.push({
    loc: `${baseUrl}/practice`,
    priority: 0.9,
    changefreq: "daily",
  });

  const taxonomy = taxonomyRaw as unknown as Record<
    string,
    Record<string, string[]>
  >;

  // 2. Exam Hubs and Subject Directories (Global tracks first)
  const examKeys = Object.keys(taxonomy).filter(
    (k) => k !== "_schema_version" && typeof taxonomy[k] === "object" && taxonomy[k] !== null
  );
  examKeys.sort((a, b) => {
    const rankA = GLOBAL_EXAM_PRIORITY.indexOf(a);
    const rankB = GLOBAL_EXAM_PRIORITY.indexOf(b);
    return (rankA === -1 ? 999 : rankA) - (rankB === -1 ? 999 : rankB);
  });

  for (const exam of examKeys) {
    const subjects = taxonomy[exam];
    const examSlug = examToSlug(exam);

    // Exam Portal
    allUrls.push({
      loc: `${baseUrl}/practice/${examSlug}`,
      priority: 0.85,
      changefreq: "daily",
    });

    for (const [subject, domains] of Object.entries(subjects)) {
      if (!Array.isArray(domains)) continue;
      const subjectSlug = subjectToSlug(subject);

      // Subject Directory
      allUrls.push({
        loc: `${baseUrl}/practice/${examSlug}/${subjectSlug}`,
        priority: 0.8,
        changefreq: "weekly",
      });
    }
  }

  // 3. Domain Leaf Pages
  const entries = getAllTaxonomyEntries();
  for (const entry of entries) {
    allUrls.push({
      loc: `${baseUrl}/practice/${entry.examSlug}/${entry.subjectSlug}/${entry.domainSlug}`,
      priority: 0.8,
      changefreq: "weekly",
    });
  }

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
