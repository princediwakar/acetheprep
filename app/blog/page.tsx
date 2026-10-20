// Path: app/blog/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: `Engineering & Cognitive Science Guides | ${siteConfig.name}`,
  description:
    "First-principles research and strategy on memory decay, spaced repetition, distractor psychometrics, and high-yield competitive exam prep for JEE, NEET, UPSC, and GMAT.",
  openGraph: {
    title: `Engineering & Cognitive Science Guides | ${siteConfig.name}`,
    description:
      "First-principles research and strategy on memory decay, spaced repetition, distractor psychometrics, and high-yield exam prep.",
    url: `${baseUrl}/blog`,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Blog & Research", url: `${baseUrl}/blog` },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <StructuredData schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cognitive Science & Exam Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Research & Strategy
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            First-principles engineering breakdowns of spaced repetition mathematics, distractor psychometrics, and cognitive load reduction for serious aspirants.
          </p>
        </div>

        {/* Post Grid */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">New articles arriving shortly</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Our cognitive engineering team is finalizing our latest exam analysis.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, idx) => (
              <article
                key={post.slug}
                className={`group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg ${
                  idx === 0 ? "md:col-span-2 md:p-8 bg-gradient-to-br from-card via-card to-primary/5" : ""
                }`}
              >
                <div>
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
