import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getStrategyGenerationPrompt, OPENAI_MODEL } from "@/lib/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface StrategyProfile {
  contentType: string;
  niche: string;
  targetAudience: string;
  tone: string;
  hookStyle: string;
  contentPillars: string[];
}

export async function POST(req: NextRequest) {
  let profile: StrategyProfile | undefined;

  try {
    const body = await req.json();
    profile = body.profile;

    if (!profile) {
      return NextResponse.json(
        { error: "Profile data is required" },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return mock data if no API key
      return NextResponse.json({
        profile,
        suggestions: {
          hooks: [
            "Stop scrolling! This will change how you create content",
            "The #1 mistake creators make (and how to fix it)",
            "I gained 10K followers using this one simple trick",
            "Why your content isn't getting views (brutal truth)",
            "POV: You finally cracked the Instagram algorithm",
          ],
          contentIdeas: [
            "Behind-the-scenes of your creative process",
            "Quick tips and hacks for your niche",
            "Myth-busting common misconceptions",
            "Before vs After transformations",
            "Day in the life content",
          ],
          bestPractices: [
            "Post consistently at peak engagement times for your audience",
            "Use trending audio but add your unique spin",
            "Keep videos between 15-30 seconds for maximum retention",
          ],
        },
      });
    }

    const systemPrompt = getStrategyGenerationPrompt(profile);

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            "Generate the content strategy based on the provided profile.",
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 800,
    });

    const suggestions = JSON.parse(
      completion.choices[0]?.message?.content || "{}",
    );

    if (
      !suggestions.hooks ||
      !suggestions.contentIdeas ||
      !suggestions.bestPractices
    ) {
      throw new Error("Invalid response format from OpenAI");
    }

    return NextResponse.json({
      profile,
      suggestions,
    });
  } catch (error) {
    console.error("Strategy generation error:", error);

    // Return fallback strategy on error
    const fallbackProfile = profile || { niche: "" } as StrategyProfile;
    return NextResponse.json({
      profile: fallbackProfile,
      suggestions: {
        hooks: [
          "Here's what nobody tells you about " +
            (fallbackProfile?.niche || "content creation"),
          "The truth about " + (fallbackProfile?.niche || "your industry"),
          "I tried this for 30 days and here's what happened",
          "Warning: This might be controversial",
          "The biggest myth about " + (fallbackProfile?.niche || "your field"),
        ],
        contentIdeas: [
          "Share your expertise through quick tutorials",
          "Document your journey and progress",
          "Answer common questions from your audience",
          "Create relatable content about challenges",
          "Show the real, authentic side of what you do",
        ],
        bestPractices: [
          "Hook viewers in the first 3 seconds",
          "Use captions for accessibility and engagement",
          "Engage with comments to boost algorithm favor",
        ],
      },
    });
  }
}
