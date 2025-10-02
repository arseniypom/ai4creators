"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Strategy {
  suggestions: {
    hooks: string[];
    contentIdeas: string[];
    bestPractices: string[];
  };
}

interface StrategyResultProps {
  strategy: Strategy | undefined;
  isLoading: boolean;
  onRegenerate: () => void;
}

export function StrategyResult({
  strategy,
  isLoading,
  onRegenerate,
}: StrategyResultProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!strategy) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Content Strategy</h2>
        <Button onClick={onRegenerate} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Example Hooks</CardTitle>
          <CardDescription>
            Use these hooks to grab attention instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {strategy.suggestions.hooks.map((hook: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <span className="flex-1">{hook}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(hook, `hook-${index}`)}
              >
                {copied === `hook-${index}` ? (
                  "Copied!"
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Ideas</CardTitle>
          <CardDescription>
            Topics aligned with your content pillars
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {strategy.suggestions.contentIdeas.map(
            (idea: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline">{index + 1}</Badge>
                <span>{idea}</span>
              </div>
            ),
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>
            Tips specific to your niche and audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {strategy.suggestions.bestPractices.map(
              (practice: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{practice}</span>
                </li>
              ),
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
