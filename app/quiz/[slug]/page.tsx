import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz-player/QuizPlayer";
import { extractIdFromSlug } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Metadata } from "next";
import { Quiz } from "@/types/quiz";
import StructuredData, { practiceQuizSchema, breadcrumbSchema } from "@/components/seo/StructuredData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const quizId = extractIdFromSlug(slug);
  if (!quizId) {
    return {
      title: "Quiz Not Found",
      description: "Invalid quiz URL",
    };
  }

  try {
    const supabase = await createClient();
    const { data: quiz, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("quiz_id", quizId)
      .single();

    if (error) {
      console.error("Error fetching quiz for metadata:", error);
      throw error;
    }

    if (!quiz) {
      return {
        title: "Quiz Not Found",
        description: "The requested quiz could not be found",
      };
    }

    const ogImageUrl = `${baseUrl}/api/og?type=quiz&title=${encodeURIComponent(
      quiz.title
    )}&topic=${encodeURIComponent(quiz.topic || "General")}`;

    const isIndexable = Boolean(quiz.is_public && quiz.status === "ready");

    return {
      title: `${quiz.title} | AceThePrep Practice Test`,
      description: quiz.description || `Practice ${quiz.title} on AceThePrep with active cognitive feedback and instant explanations.`,
      keywords: [
        quiz.title,
        quiz.topic,
        quiz.subject,
        quiz.difficulty,
        "quiz",
        "test",
        "practice questions",
        "knowledge test",
      ].filter(Boolean) as string[],
      robots: isIndexable
        ? {
            index: true,
            follow: true,
          }
        : {
            index: false,
            follow: false,
          },
      alternates: {
        canonical: `${baseUrl}/quiz/${slug}`,
      },
      openGraph: {
        title: `${quiz.title} | AceThePrep`,
        description: quiz.description || `Test your knowledge with ${quiz.title}.`,
        url: `${baseUrl}/quiz/${slug}`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${quiz.title} Quiz`,
          },
        ],
      },
      twitter: {
        title: `${quiz.title} | AceThePrep`,
        description: quiz.description || `Test your knowledge with ${quiz.title}.`,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for quiz:", error);
    return {
      title: "Practice Quiz | AceThePrep",
      description: "Take quizzes and test your knowledge",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}


export default async function QuizPage({ params }: PageProps) {
  const { slug } = await params;
  let supabase;
  
  try {
    supabase = await createClient();
  } catch (error) {
    console.error("Failed to create Supabase client:", error);
    throw new Error("Failed to initialize database connection");
  }

  let user = null;

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      if (error.message !== "Auth session missing!") {
        console.error("[QuizPage] Unexpected auth error:", error.message);
      }
    } else {
      user = data.user;
    }
  } catch (e) {
    console.error("[QuizPage] Failed to fetch user session:", e);
  }

  const quizId = extractIdFromSlug(slug);
  if (!quizId) notFound();

  try {
    // Fetch quiz details
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("quiz_id", quizId)
      .single();

    if (quizError) {
      console.error("Error fetching quiz:", quizError.message);
      throw quizError;
    }

    if (!quizData) {
      notFound();
    }

    // Fetch standalone questions (group_id is null)
    const { data: standaloneQuestions, error: standaloneError } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", quizId)
      .is("group_id", null);

    if (standaloneError) {
      console.error("Error fetching standalone questions:", standaloneError.message);
      throw standaloneError;
    }

    // Fetch question groups with their supporting content
    const { data: questionGroups, error: groupsError } = await supabase
      .from("question_groups")
      .select("group_id, supporting_content_type, supporting_content, caption, group_order")
      .eq("quiz_id", quizId)
      .order("group_order", { ascending: true });

    if (groupsError) {
      console.error("Error fetching question groups:", groupsError.message);
      throw groupsError;
    }

    // Fetch questions for each group
    const questionGroupsWithQuestions = questionGroups?.length
      ? await Promise.all(
          questionGroups.map(async (group) => {
            const { data: groupQuestions, error: groupQuestionsError } = await supabase
              .from("questions")
              .select("*")
              .eq("group_id", group.group_id);

            if (groupQuestionsError) {
              console.error(`Error fetching questions for group ${group.group_id}:`, groupQuestionsError.message);
              throw groupQuestionsError;
            }

            return {
              ...group,
              supporting_content: {
                type: group.supporting_content_type,
                content: group.supporting_content,
                caption: group.caption || "",
              },
              questions: groupQuestions || [],
            };
          })
        )
      : [];

    // Calculate total question count (standalone + grouped questions)
    const standaloneCount = standaloneQuestions?.length || 0;
    const groupedCount = questionGroupsWithQuestions.reduce(
      (sum, group) => sum + group.questions.length,
      0
    );
    const totalQuestionCount = standaloneCount + groupedCount;

    // Fetch creator name (if not already in quizData)
    let creatorName = "Unknown";
    try {
      const { data: creatorData, error: creatorError } = await supabaseAdmin.auth.admin.getUserById(
        quizData.creator_id
      );
      if (creatorError) {
        console.error("Error fetching creator data:", creatorError.message);
        throw creatorError;
      }
      if (creatorData) {
        creatorName =
          creatorData.user.user_metadata?.full_name ||
          creatorData.user.user_metadata?.name ||
          creatorData.user.email?.split("@")[0] ||
          "Unknown";
      }
    } catch (error) {
      console.error("Error fetching creator name:", error);
      // Don't throw here, just use default creator name
    }

    // Construct the quiz object
    const quiz: Quiz = {
      ...quizData,
      questions: standaloneQuestions || [],
      question_groups: questionGroupsWithQuestions || [],
      creator_name: creatorName,
      question_count: totalQuestionCount,
    };

    const isCreator = user?.id === quiz.creator_id;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://acetheprep.com";

    const quizUrl = `${baseUrl}/quiz/${slug}`;
    const quizSchema = quiz.is_public && quiz.questions.length > 0
      ? practiceQuizSchema({
          url: quizUrl,
          examName: quiz.topic || quiz.subject || "Competitive Exam",
          domain: quiz.title,
          subject: quiz.subject || "General",
          description: quiz.description || `Practice ${quiz.title} on AceThePrep with active cognitive feedback and instant explanations.`,
          questions: quiz.questions.slice(0, 10).map((q) => {
            const opts = typeof q.options === "object" && q.options
              ? Object.entries(q.options).map(([k, v]) => ({ label: k, text: String(v) }))
              : [];
            return {
              questionText: q.question_text,
              options: opts,
              correctOption: q.correct_option,
              correctText: (q.options as Record<string, string>)?.[q.correct_option] || q.correct_option,
              explanation: q.explanation || "Detailed step-by-step reasoning on AceThePrep.",
            };
          }),
        })
      : null;

    const breadcrumbs = breadcrumbSchema([
      { name: "Home", url: baseUrl },
      { name: "Public Quizzes", url: `${baseUrl}/quizzes` },
      { name: quiz.title, url: quizUrl },
    ]);

    return (
      <>
        {quizSchema && <StructuredData schema={quizSchema} />}
        <StructuredData schema={breadcrumbs} />
        <QuizPlayer quiz={quiz} isCreator={isCreator} />
      </>
    );
    
  } catch (error) {
    console.error("Error in QuizPage:", error);
    throw error;
  }
}
