// Types for the application

export interface GeneratedContent {
  hook: string;
  script: string;
  generationId: string;
}

export interface ContentGenerationRequest {
  topic: string;
  useTopCreatorHooks?: boolean;
}

export interface StrategyProfile {
  // Step 1: Content Type & Niche
  contentType: "educational" | "entertaining" | "inspirational" | "promotional";
  niche: string;
  targetAudience: string;

  // Step 2: Style Preferences
  tone: "casual" | "professional" | "humorous" | "serious";
  hookStyle: "question" | "statement" | "story" | "statistic";
  contentPillars: string[];
}

export interface GeneratedStrategy {
  profile: StrategyProfile;
  suggestions: {
    hooks: string[];
    contentIdeas: string[];
    bestPractices: string[];
  };
}
