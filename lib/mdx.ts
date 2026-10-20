import { BLOG_POSTS, type BlogPost } from "./blog-data";
import { GLOBAL_EXAM_PRIORITY } from "./slugs";

export type { BlogPost };
export type BlogPostMetadata = Omit<BlogPost, "content">;

/**
 * Resolves priority rank based on GLOBAL_EXAM_PRIORITY.
 * Exact and substring matching against priority exams.
 */
export function getExamPriorityRank(examTag?: string): number {
  if (!examTag) return 999;
  const tagUpper = examTag.toUpperCase();
  for (let i = 0; i < GLOBAL_EXAM_PRIORITY.length; i++) {
    const priorityExam = GLOBAL_EXAM_PRIORITY[i].toUpperCase();
    if (
      tagUpper === priorityExam ||
      tagUpper.includes(priorityExam) ||
      priorityExam.includes(tagUpper)
    ) {
      return i;
    }
  }
  return 999;
}

/**
 * Returns all published blog posts sorted strictly by GLOBAL_EXAM_PRIORITY,
 * then secondary-sorted by date descending.
 * 0ms in-memory resolution for instantaneous Server Component rendering.
 */
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  return BLOG_POSTS.filter((p) => p.published)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => {
      const rankA = getExamPriorityRank(a.examTag);
      const rankB = getExamPriorityRank(b.examTag);
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/**
 * Returns a single blog post by its slug.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const normalized = slug.toLowerCase().trim();
  const post = BLOG_POSTS.find((p) => p.slug === normalized && p.published);
  return post || null;
}

/**
 * Returns sibling/related blog posts for a given post.
 * Matches by exact examTag first, then category, then falls back to top priority global posts.
 */
export async function getRelatedBlogPosts(
  currentSlug: string,
  limit: number = 2,
): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPosts();
  const current = allPosts.find((p) => p.slug === currentSlug);
  if (!current) return allPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  const candidates = allPosts.filter((p) => p.slug !== currentSlug);

  // Score candidates: exact examTag match = 10, category match = 5
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.examTag && current.examTag && p.examTag.toLowerCase() === current.examTag.toLowerCase()) {
      score += 10;
    } else if (
      p.examTag &&
      current.examTag &&
      (p.examTag.toLowerCase().includes(current.examTag.toLowerCase()) ||
        current.examTag.toLowerCase().includes(p.examTag.toLowerCase()))
    ) {
      score += 7;
    }
    if (p.category.toLowerCase() === current.category.toLowerCase()) {
      score += 5;
    }
    return { post: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

/**
 * Returns available filter chips with post counts.
 */
export async function getBlogFilterOptions(): Promise<{ label: string; value: string; count: number }[]> {
  const posts = await getAllBlogPosts();

  const options: { label: string; value: string; count: number }[] = [
    { label: "All Guides", value: "", count: posts.length },
  ];

  for (const exam of GLOBAL_EXAM_PRIORITY) {
    const examLower = exam.toLowerCase();
    const count = posts.filter(
      (p) =>
        p.examTag &&
        (p.examTag.toLowerCase() === examLower ||
          p.examTag.toLowerCase().includes(examLower) ||
          examLower.includes(p.examTag.toLowerCase())),
    ).length;

    if (count > 0) {
      options.push({ label: exam, value: examLower, count });
    }
  }

  // Cross-disciplinary category
  const generalCount = posts.filter((p) => !p.examTag || getExamPriorityRank(p.examTag) === 999).length;
  if (generalCount > 0) {
    options.push({ label: "Cognitive Science", value: "cognitive-science", count: generalCount });
  }

  return options;
}


