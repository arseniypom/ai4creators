"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StyleStepProps {
  data: {
    tone: string;
    hookStyle: string;
    contentPillars: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

export function StyleStep({ data, onChange }: StyleStepProps) {
  const [pillarInput, setPillarInput] = useState("");

  const addPillar = () => {
    if (pillarInput.trim() && data.contentPillars.length < 3) {
      onChange("contentPillars", [...data.contentPillars, pillarInput.trim()]);
      setPillarInput("");
    }
  };

  const removePillar = (index: number) => {
    onChange(
      "contentPillars",
      data.contentPillars.filter((_, i) => i !== index),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Preferences</CardTitle>
        <CardDescription>
          Define your content style and approach
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>What tone do you prefer?</Label>
          <RadioGroup
            value={data.tone}
            onValueChange={(value) => onChange("tone", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="casual" id="casual" />
              <Label htmlFor="casual">
                Casual - Friendly and conversational
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional">
                Professional - Authoritative and polished
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="humorous" id="humorous" />
              <Label htmlFor="humorous">Humorous - Light-hearted and fun</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="serious" id="serious" />
              <Label htmlFor="serious">Serious - Direct and informative</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>What hook style works best for you?</Label>
          <RadioGroup
            value={data.hookStyle}
            onValueChange={(value) => onChange("hookStyle", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="question" id="question" />
              <Label htmlFor="question">
                Question - &ldquo;Did you know...?&rdquo;
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="statement" id="statement" />
              <Label htmlFor="statement">
                Statement - &ldquo;Here&apos;s why...&rdquo;
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="story" id="story" />
              <Label htmlFor="story">
                Story - &ldquo;Last week I...&rdquo;
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="statistic" id="statistic" />
              <Label htmlFor="statistic">
                Statistic - &ldquo;90% of people...&rdquo;
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Content Pillars (up to 3)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Tips & Tricks, Behind the scenes..."
              value={pillarInput}
              onChange={(e) => setPillarInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addPillar())
              }
              disabled={data.contentPillars.length >= 3}
            />
            <Button
              onClick={addPillar}
              disabled={data.contentPillars.length >= 3}
              type="button"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.contentPillars.map((pillar, index) => (
              <Badge key={index} variant="secondary" className="pr-1">
                {pillar}
                <button
                  onClick={() => removePillar(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          {data.contentPillars.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No content pillars added yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
