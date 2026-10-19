// Path: lib/mdx.ts

import { BLOG_POSTS, type BlogPost } from "./blog-data";

export type { BlogPost };
export type BlogPostMetadata = Omit<BlogPost, "content">;

/**
 * Returns all published blog posts sorted by date descending.
 * 0ms in-memory resolution for instantaneous Server Component rendering.
 */
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  return BLOG_POSTS.filter((p) => p.published)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns a single blog post by its slug.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const normalized = slug.toLowerCase().trim();
  const post = BLOG_POSTS.find((p) => p.slug === normalized && p.published);
  return post || null;
}
