// Constants and prompts for the application

export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

export const getContentGenerationPrompt = (useTopCreatorHooks: boolean) => {
  const basePrompt = `You are an expert Instagram Reels and short-form content creator. Your task is to generate a compelling hook and a short script (15-30 seconds) for a video.

${
  useTopCreatorHooks
    ? `Use hooks inspired by top creators like:
- Start with a controversial or surprising statement
- Use pattern interrupts
- Create curiosity gaps
- Ask engaging questions
- Use numbers and statistics when relevant`
    : "Create original, engaging hooks that capture attention immediately."
}

The script should be:
- Concise and punchy (15-30 seconds when read aloud)
- Easy to understand and follow
- Actionable or valuable to the viewer
- End with a clear CTA or takeaway

Return the response in JSON format with the following structure:
{
  "hook": "The attention-grabbing opening line (5-10 words)",
  "script": "The full script for the video, including the hook at the beginning. Use line breaks for natural pauses."
}`;

  return basePrompt;
};

interface StrategyProfile {
  contentType: string;
  niche: string;
  targetAudience: string;
  tone: string;
  hookStyle: string;
  contentPillars: string[];
}

export const getStrategyGenerationPrompt = (profile: StrategyProfile) => {
  return `Based on the following creator profile, generate a content strategy for Instagram Reels and short-form content:

Content Type: ${profile.contentType}
Niche: ${profile.niche}
Target Audience: ${profile.targetAudience}
Tone: ${profile.tone}
Hook Style: ${profile.hookStyle}
Content Pillars: ${profile.contentPillars.join(", ")}

Generate personalized recommendations including:
1. 5 example hooks that would work well for this creator
2. 5 content ideas aligned with their pillars
3. 3 best practices specific to their niche and audience

Return the response in JSON format:
{
  "hooks": ["hook1", "hook2", ...],
  "contentIdeas": ["idea1", "idea2", ...],
  "bestPractices": ["practice1", "practice2", ...]
}`;
};
