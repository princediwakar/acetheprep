// Path: app/blog/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getBlogFilterOptions, getExamPriorityRank } from "@/lib/mdx";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Filter, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BlogTechnicalDiagram } from "@/components/blog/BlogTechnicalDiagram";

const baseUrl = siteConfig.url;

interface BlogIndexPageProps {
  searchParams?: Promise<{ exam?: string }>;
}

export const metadata: Metadata = {
  title: "Engineering & Cognitive Science Guides",
  description:
    "First-principles research and strategy on memory decay, spaced repetition, distractor psychometrics, and high-yield competitive exam prep for Digital SAT, GRE, GMAT Focus, CFA Level 1, IELTS Academic, and TOEFL iBT.",
  alternates: {
    canonical: `${baseUrl}/blog`,
    types: {
      "application/rss+xml": `${baseUrl}/blog/rss.xml`,
    },
  },
  openGraph: {
    title: `Engineering & Cognitive Science Guides | ${siteConfig.name}`,
    description:
      "First-principles research and strategy on memory decay, spaced repetition, distractor psychometrics, and high-yield exam prep for SAT, GRE, GMAT Focus, CFA, IELTS, and TOEFL.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og?type=blog&title=Engineering%20%26%20Cognitive%20Science%20Guides&topic=Exam%20Architecture`,
        width: 1200,
        height: 630,
        alt: "AceThePrep Cognitive Science Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Engineering & Cognitive Science Guides | ${siteConfig.name}`,
    description:
      "First-principles research on memory decay, spaced repetition, and distractor psychometrics.",
    images: [`${baseUrl}/api/og?type=blog&title=Engineering%20%26%20Cognitive%20Science%20Guides&topic=Exam%20Architecture`],
  },
};

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const activeExam = resolvedParams?.exam?.toLowerCase().trim() || "";

  const [allPosts, filterOptions] = await Promise.all([
    getAllBlogPosts(),
    getBlogFilterOptions(),
  ]);

  // Apply server-side URL filter
  const posts = activeExam
    ? allPosts.filter((post) => {
        if (activeExam === "cognitive-science") {
          return !post.examTag || getExamPriorityRank(post.examTag) === 999;
        }
        if (!post.examTag) return false;
        const tagLower = post.examTag.toLowerCase();
        return tagLower.includes(activeExam) || activeExam.includes(tagLower);
      })
    : allPosts;

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Blog & Research", url: `${baseUrl}/blog` },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cognitive Science & Exam Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Research & Strategy
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            First-principles engineering breakdowns of spaced repetition mathematics, distractor psychometrics, and cognitive load reduction for serious aspirants across SAT, GRE, GMAT Focus, CFA, IELTS, and global competitive examinations.
          </p>

          {/* Filter Pills Bar */}
          <div className="mt-8 flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground hidden sm:block shrink-0" />
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
              {filterOptions.map((opt) => {
                const isActive =
                  opt.value === "" ? activeExam === "" : activeExam === opt.value;
                const href = opt.value ? `/blog?exam=${encodeURIComponent(opt.value)}` : "/blog";

                return (
                  <Link
                    key={opt.value}
                    href={href}
                    prefetch
                    className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/80"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background text-muted-foreground border border-border/50"
                      }`}
                    >
                      {opt.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Active Filter Indicator */}
          {activeExam && (
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-xl px-4 py-2 border border-border">
              <span>
                Showing <strong>{posts.length}</strong> {posts.length === 1 ? "guide" : "guides"} for{" "}
                <span className="capitalize font-semibold text-foreground">
                  {filterOptions.find((o) => o.value === activeExam)?.label || activeExam}
                </span>
              </span>
              <Link
                href="/blog"
                prefetch
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                Reset filter
              </Link>
            </div>
          )}
        </div>

        {/* Post Grid */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">No matching guides found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Our cognitive engineering team is currently authoring deep breakdowns for this category.
            </p>
            <div className="mt-6">
              <Link
                href="/blog"
                prefetch
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow transition hover:opacity-90"
              >
                View All Published Guides
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, idx) => (
              <article
                key={post.slug}
                className={`group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg ${
                  idx === 0 && !activeExam ? "md:col-span-2 md:p-8 bg-gradient-to-br from-card via-card to-primary/5" : ""
                }`}
              >
                <div>
                  <BlogTechnicalDiagram examTag={post.examTag} category={post.category} />
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {post.category}
                    </span>
                    {post.examTag && (
                      <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {post.examTag}
                      </span>
                    )}
                  </div>

                  <h2
                    className={`font-bold tracking-tight text-foreground group-hover:text-primary transition-colors ${
                      idx === 0 ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                    Read guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA banner at the bottom */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Ready to test your memory retention?
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Experience adaptive spaced repetition tailored to your target exam. Free 10-question practice sets with step-by-step mistake explanations.
            </p>
          </div>
          <Link
            href="/setup"
            className="inline-flex whitespace-nowrap items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90"
          >
            Set Up Your Exam Free
          </Link>
        </div>
      </div>
    </div>
  );
}
