// Path: app/api/og/result-card/route.tsx
import React from "react";
import { ImageResponse } from "next/og";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  let examName = "Practice Session";
  let pct = 0;
  let score = 0;
  let total = 0;
  let hardestTopic = "Standardized Practice";
  let tier = 2;

  if (token) {
    try {
      const { data: card } = await supabaseAdmin
        .from("result_cards")
        .select("card_data")
        .eq("share_token", token)
        .single();

      if (card && card.card_data) {
        const cd = card.card_data as Record<string, any>;
        examName = cd.exam_name || examName;
        score = cd.correct_count ?? cd.score ?? 0;
        total = cd.total_questions ?? 0;
        pct = total > 0 ? Math.round((score / total) * 100) : 0;
        if (Array.isArray(cd.questions) && cd.questions.length > 0) {
          hardestTopic = cd.questions[0].skill_domain || hardestTopic;
          tier = cd.questions[0].difficulty_tier || tier;
        }
      }
    } catch (e) {
      console.error("[OG Result Card] Failed to fetch card:", e);
    }
  }

  const scoreColor = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171";

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
            "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
      },
      // Header brand
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: "12px" } },
          React.createElement(
            "div",
            {
              style: {
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "22px",
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
                fontSize: "26px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              },
            },
            siteConfig.name
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#a5b4fc",
              fontSize: "15px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            },
          },
          "Peer Challenge"
        )
      ),

      // Center Hero Content
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "1000px",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: "20px",
              fontWeight: 600,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            },
          },
          `${examName} Diagnostic Result`
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "24px",
            },
          },
          React.createElement(
            "span",
            {
              style: {
                fontSize: "84px",
                fontWeight: 900,
                color: scoreColor,
                lineHeight: 1,
                letterSpacing: "-2px",
              },
            },
            `${pct}%`
          ),
          total > 0 &&
            React.createElement(
              "span",
              {
                style: {
                  fontSize: "32px",
                  color: "#94a3b8",
                  fontWeight: 600,
                },
              },
              `(${score} of ${total} correct)`
            )
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: "26px",
              color: "#f8fafc",
              fontWeight: 700,
              marginTop: "8px",
            },
          },
          `Hardest Topic: ${hardestTopic} (Tier ${tier})`
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: "20px",
              color: "#a5b4fc",
              fontWeight: 500,
            },
          },
          "Can you beat this question? Tap to attempt the micro-quiz challenge."
        )
      ),

      // Footer
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              color: "#64748b",
              fontSize: "18px",
              fontWeight: 500,
            },
          },
          "acetheprep.com"
        ),
        React.createElement(
          "span",
          {
            style: {
              color: "#e2e8f0",
              fontSize: "18px",
              fontWeight: 700,
            },
          },
          "Instant Distractor Analysis • Zero Sign-in Required"
        )
      )
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=86400, s-maxage=86400",
      },
    }
  );
}

