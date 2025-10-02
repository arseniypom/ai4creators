"use client";

import { ContentGenerator } from "@/components/content-generator";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Viral Content</h1>
        <p className="text-muted-foreground">
          Generate compelling hooks and scripts for Instagram Reels and
          short-form videos
        </p>
      </div>

      <ContentGenerator />
    </div>
  );
}
