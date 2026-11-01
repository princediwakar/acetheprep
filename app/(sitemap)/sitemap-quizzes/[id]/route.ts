// Path: app/(sitemap)/sitemap-quizzes/[id]/route.ts

import { supabaseAdmin } from "@/lib/supabase/admin";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;
const entriesPerSitemap = 50000;

interface RouteParams {
  id: string;
}

interface QuizSitemapUrl {
  loc: string;
  lastmod: string;
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

  const allUrls: QuizSitemapUrl[] = [
    // Top-level public quizzes catalog
    {
      loc: `${baseUrl}/quizzes`,
      lastmod: new Date().toISOString(),
      priority: 0.9,
      changefreq: "daily",
    },
  ];

  try {
    const { data: quizzes, error } = await supabaseAdmin
      .from("quizzes")
      .select("quiz_id, slug, updated_at, created_at")
      .eq("is_public", true)
      .eq("status", "ready")
      .order("created_at", { ascending: false });

    if (!error && quizzes) {
      for (const q of quizzes) {
        const pathSlug = q.slug || q.quiz_id;
        const lastmod = q.updated_at || q.created_at || new Date().toISOString();
        allUrls.push({
          loc: `${baseUrl}/quiz/${pathSlug}`,
          lastmod: new Date(lastmod).toISOString(),
          priority: 0.75,
          changefreq: "weekly",
        });
      }
    }
  } catch (err) {
    console.error("Failed to fetch public quizzes for sitemap:", err);
  }

  const paginatedUrls = allUrls.slice(
    page * entriesPerSitemap,
    (page + 1) * entriesPerSitemap,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paginatedUrls
    .map(
      (item) =>
        `<url><loc>${item.loc}</loc><lastmod>${item.lastmod}</lastmod><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`,
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

