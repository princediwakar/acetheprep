import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getBlogPost, getRelatedBlogPosts } from "@/lib/mdx";
import { slugify, examToSlug, GLOBAL_EXAM_PRIORITY } from "@/lib/slugs";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowLeft, Calendar, Clock, User, Sparkles, ListTree, ArrowRight, BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BlogTechnicalDiagram } from "@/components/blog/BlogTechnicalDiagram";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const baseUrl = siteConfig.url;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };

  const url = `${baseUrl}/blog/${post.slug}`;
  const ogImage = `${baseUrl}/api/og?type=blog&title=${encodeURIComponent(post.title)}&topic=${encodeURIComponent(post.examTag || post.category || "Cognitive Science")}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${baseUrl}/blog/rss.xml`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, post.examTag || ""].filter(Boolean),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}



export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getBlogPost(slug),
    getRelatedBlogPosts(slug, 2),
  ]);

  if (!post) {
    notFound();
  }

  const articleUrl = `${baseUrl}/blog/${post.slug}`;

  // Extract headings for Table of Contents
  const tocItems = post.content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const title = l.replace("## ", "").trim();
      return { title, id: slugify(title) };
    });

  // Resolve target exam for practice cross-linking
  let targetExamName = "";
  let practiceSlug = "";
  if (post.examTag) {
    const matchedPriority = GLOBAL_EXAM_PRIORITY.find(
      (e) =>
        post.examTag.toLowerCase().includes(e.toLowerCase()) ||
        e.toLowerCase().includes(post.examTag.toLowerCase()),
    );
    targetExamName = matchedPriority || post.examTag;
    practiceSlug = examToSlug(targetExamName);
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      logo: `${baseUrl}/apple-touch-icon.png`,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: articleUrl,
  };

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: articleUrl },
  ];

  return (
    <article className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={articleSchema} />
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all guides
        </Link>

        {/* Article Header */}
        <header className="mb-10 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {post.category}
            </span>
            {post.examTag && (
              <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {post.examTag}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Article Figure Banner */}
        <div className="mb-10">
          <BlogTechnicalDiagram
            examTag={post.examTag}
            category={post.category}
            className="h-44 sm:h-56 rounded-2xl shadow-sm"
          />
        </div>

        {/* Table of Contents */}
        {tocItems.length >= 2 && (
          <nav
            aria-label="Table of Contents"
            className="my-8 rounded-2xl border border-border/80 bg-muted/30 p-5"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              <ListTree className="w-4 h-4 text-primary" />
              <span>Table of Contents</span>
            </div>
            <ol className="space-y-2 text-sm">
              {tocItems.map((item, idx) => (
                <li key={item.id} className="flex items-start gap-2">
                  <span className="font-mono text-xs text-primary font-semibold mt-0.5">
                    {idx + 1}.
                  </span>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Direct Practice Launchpad */}
        {practiceSlug && (
          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Instant Interactive Calibration
              </span>
              <h4 className="text-base font-bold text-foreground mt-0.5">
                Practice {targetExamName} Distractor Traps Free
              </h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-md">
                Experience adaptive test-taking under real exam timing with immediate mistake breakdowns.
              </p>
            </div>
            <Link
              href={`/practice/${practiceSlug}`}
              className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow transition hover:opacity-90"
            >
              Start Diagnostic
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Related Guides Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Recommended Cognitive Guides
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {related.category}
                      </span>
                      {related.examTag && (
                        <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                          {related.examTag}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${related.slug}`}>
                        <span className="absolute inset-0" />
                        {related.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {related.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{related.readTime}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      Read guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* In-article PLG Conversion Widget */}
        <div className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Personalized Exam Preparation</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Master High-Yield Concepts Under Real Exam Timing
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteConfig.name} uses cognitive science algorithms to pinpoint your weak areas before exam day. Practice under realistic time constraints with instant mistake explanations.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/setup"
              className="w-full sm:w-auto text-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90"
            >
              Set Up Your Exam Free
            </Link>
            <Link
              href="/practice"
              className="w-full sm:w-auto text-center rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              Explore Practice Questions
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

