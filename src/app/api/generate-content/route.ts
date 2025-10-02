import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getContentGenerationPrompt, OPENAI_MODEL } from "@/lib/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic, useTopCreatorHooks } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 },
      );
    }

    const systemPrompt = getContentGenerationPrompt(useTopCreatorHooks);

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create content about: ${topic}` },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 500,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

    if (!result.hook || !result.script) {
      throw new Error("Invalid response format from OpenAI");
    }

    return NextResponse.json({
      hook: result.hook,
      script: result.script,
      generationId: crypto.randomUUID(),
    });
  } catch (error) {
    console.error("Content generation error:", error);

    const err = error as { status?: number };
    if (err?.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key" },
        { status: 401 },
      );
    }

    if (err?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 },
    );
  }
}
