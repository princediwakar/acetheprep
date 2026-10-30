// File: app/api/og/route.ts
import React from "react";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

type ImageType = "home" | "quiz" | "session" | "practice" | "insights" | "blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || siteConfig.name;
  const topic = searchParams.get("topic") || "Competitive Exams";
  const type = (searchParams.get("type") as ImageType) || "home";

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
      },
      // Top brand badge
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 800,
            },
          },
          "A"
        ),
        React.createElement(
          "span",
          {
            style: {
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            },
          },
          siteConfig.name
        ),
        React.createElement(
          "div",
          {
            style: {
              marginLeft: "12px",
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#818cf8",
              fontSize: "14px",
              fontWeight: 600,
            },
          },
          type === "practice"
            ? "Verified Practice"
            : type === "insights"
              ? "Student Performance Data"
              : type === "blog"
                ? "Cognitive Science"
                : "Adaptive Exam Engine"
        )
      ),

      // Middle content block
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          },
        },
        topic &&
          topic !== "Competitive Exams" &&
          React.createElement(
            "div",
            {
              style: {
                fontSize: "22px",
                fontWeight: 600,
                color: "#a5b4fc",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              },
            },
            topic
          ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: title.length > 40 ? "52px" : "64px",
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
            },
          },
          title
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "800px",
            },
          },
          type === "home"
            ? "Stop cramming 8 hours to forget by Sunday. Cognitive-science retrieval practice and real-time distractor analysis."
            : type === "practice"
              ? `Interactive diagnostic questions and misconception analysis for ${title}.`
              : type === "insights"
                ? `Real candidate performance data: topic error rates and solving time analytics.`
                : "Research-backed preparation methodologies for competitive examinations."
        )
      ),

      // Bottom footer bar
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              color: "#64748b",
              fontSize: "16px",
              fontWeight: 500,
            },
          },
          "acetheprep.com"
        ),
        React.createElement(
          "span",
          {
            style: {
              color: "#64748b",
              fontSize: "16px",
              fontWeight: 500,
            },
          },
          "100% Free • No Credit Card Required"
        )
      )
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000, s-maxage=31536000",
      },
    }
  );
}
