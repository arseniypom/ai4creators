"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, Lightbulb, Rocket } from "lucide-react";

interface WelcomeStepProps {
  onBegin: () => void;
}

export function WelcomeStep({ onBegin }: WelcomeStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Create Your Viral Content Strategy
          </CardTitle>
          <CardDescription className="text-base">
            Answer 2 simple questions and get a personalized content strategy in
            seconds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              Our AI will analyze your profile and generate a complete strategy
              tailored to your niche and audience.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                What You&apos;ll Get
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">5 Viral Hook Templates</p>
                    <p className="text-sm text-muted-foreground">
                      Attention-grabbing openings proven to stop the scroll
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">5 Content Ideas</p>
                    <p className="text-sm text-muted-foreground">
                      Topics perfectly aligned with your content pillars
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">3 Best Practices</p>
                    <p className="text-sm text-muted-foreground">
                      Personalized tips specific to your niche and audience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <Badge variant="secondary">2 Quick Steps</Badge>
            <Badge variant="secondary">Takes 30 seconds</Badge>
            <Badge variant="secondary">100% Free</Badge>
          </div>

          <Button onClick={onBegin} size="lg" className="w-full">
            Begin Strategy Creation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
