// Path: app/(sitemap)/sitemap-blog/route.ts

import { getAllBlogPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export async function GET() {
  const posts = await getAllBlogPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
    .map(
      (post) =>
        `<url><loc>${baseUrl}/blog/${post.slug}</loc><lastmod>${new Date(post.date).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
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
