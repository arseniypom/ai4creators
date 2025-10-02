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

interface ContentTypeStepProps {
  data: {
    contentType: string;
    niche: string;
    targetAudience: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ContentTypeStep({ data, onChange }: ContentTypeStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Type & Niche</CardTitle>
        <CardDescription>
          Let&apos;s define your content focus and target audience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>What type of content do you want to create?</Label>
          <RadioGroup
            value={data.contentType}
            onValueChange={(value) => onChange("contentType", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="educational" id="educational" />
              <Label htmlFor="educational">
                Educational - Teach something valuable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entertaining" id="entertaining" />
              <Label htmlFor="entertaining">
                Entertaining - Make people laugh or smile
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inspirational" id="inspirational" />
              <Label htmlFor="inspirational">
                Inspirational - Motivate and inspire
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="promotional" id="promotional" />
              <Label htmlFor="promotional">
                Promotional - Showcase products/services
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="niche">What&apos;s your niche?</Label>
          <Input
            id="niche"
            placeholder="e.g., Fitness, Tech, Cooking, Fashion, Business..."
            value={data.niche}
            onChange={(e) => onChange("niche", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Who is your target audience?</Label>
          <Input
            id="audience"
            placeholder="e.g., Young professionals, Students, Parents, Entrepreneurs..."
            value={data.targetAudience}
            onChange={(e) => onChange("targetAudience", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
