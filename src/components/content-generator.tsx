"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles, RefreshCw } from "lucide-react";
import { HookCard } from "@/components/hook-card";
import { ScriptCard } from "@/components/script-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useContentGenerator } from "@/hooks/use-content-generator";

const placeholders = [
  "How to grow your Instagram following",
  "5 productivity hacks that actually work",
  "The secret to perfect coffee at home",
  "Why morning routines are overrated",
  "Simple recipe for meal prep",
  "Tech gadgets under $50 worth buying",
];

export function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [useTopCreatorHooks, setUseTopCreatorHooks] = useState(false);
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  // Set random placeholder after hydration to avoid mismatch
  useEffect(() => {
    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length)],
    );
  }, []);

  const { content, isLoading, error, generateContent, resetContent } =
    useContentGenerator();

  const handleGenerate = () => {
    if (topic.trim()) {
      generateContent({
        topic: topic.trim(),
        useTopCreatorHooks,
      });
    }
  };

  const handleReset = () => {
    resetContent();
    setTopic("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">What&apos;s your content about?</Label>
            <Textarea
              id="topic"
              placeholder={placeholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="top-creators"
                checked={useTopCreatorHooks}
                onCheckedChange={setUseTopCreatorHooks}
                disabled={isLoading}
              />
              <Label htmlFor="top-creators" className="cursor-pointer">
                Use hooks from top creators
              </Label>
            </div>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex gap-2">
            {!content ? (
              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Content
                </Button>
                <Button
                  onClick={handleGenerate}
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Regenerate
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {isLoading && !content && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-16" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-3 w-48 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-16" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      )}

      {content && !isLoading && (
        <div className="space-y-4">
          <HookCard hook={content.hook} />
          <ScriptCard script={content.script} />
        </div>
      )}
    </div>
  );
}
