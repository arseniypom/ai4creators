"use client";

import {useTranslations} from 'next-intl';
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
  const t = useTranslations('WelcomeStep');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              {t('intro')}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t('whatYouGet')}
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('hooks.title')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('hooks.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contentIdeas.title')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('contentIdeas.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('bestPractices.title')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('bestPractices.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <Badge variant="secondary">{t('badges.quickSteps')}</Badge>
            <Badge variant="secondary">{t('badges.time')}</Badge>
            <Badge variant="secondary">{t('badges.free')}</Badge>
          </div>

          <Button onClick={onBegin} size="lg" className="w-full">
            {t('begin')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
