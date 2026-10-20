// Path: app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getBlogPost } from "@/lib/mdx";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowLeft, Calendar, Clock, User, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

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
  return {
    title: post.title,
    description: post.description,

    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, post.examTag || ""].filter(Boolean),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

/**
 * Lightweight, robust markdown-to-JSX renderer for articles.
 * Renders semantic HTML tags without heavy client-side markdown bundles.
 */
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeader: string[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const flushTable = (key: number) => {
    if (tableHeader.length > 0) {
      elements.push(
        <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/50">
              <tr>
                {tableHeader.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/20">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      tableHeader = [];
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-6 overflow-x-auto rounded-xl bg-slate-900 dark:bg-black/80 p-4 font-mono text-sm text-emerald-400 border border-slate-800"
          >
            <code>{codeBuffer.join("\n")}</code>
          </pre>,
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Table row
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

      // Check if delimiter row
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      inTable = false;
      flushTable(i);
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2"
        >
          {line.replace("## ", "").trim()}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground"
        >
          {line.replace("### ", "").trim()}
        </h3>,
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
        >
          {line.replace("> ", "").trim()}
        </blockquote>,
      );
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      elements.push(<hr key={`hr-${i}`} className="my-8 border-border" />);
      continue;
    }

    // Unordered List item
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const text = line.trim().replace(/^[-*]\s+/, "");
      elements.push(
        <li key={`li-${i}`} className="ml-6 list-disc text-muted-foreground my-1.5 leading-relaxed">
          {renderFormattedText(text)}
        </li>,
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const text = line.trim().replace(/^\d+\.\s+/, "");
      elements.push(
        <li key={`nli-${i}`} className="ml-6 list-decimal text-muted-foreground my-1.5 leading-relaxed">
          {renderFormattedText(text)}
        </li>,
      );
      continue;
    }

    // Paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="my-4 leading-relaxed text-muted-foreground text-base sm:text-lg">
          {renderFormattedText(line)}
        </p>,
      );
    }
  }

  if (inTable) {
    flushTable(lines.length);
  }

  return <div>{elements}</div>;
}

/**
 * Parses bold, code, and inline formatting
 */
function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${baseUrl}/blog/${post.slug}`;

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
      logo: `${baseUrl}/icon.ico`,
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

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

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
