"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WelcomeStep } from "@/components/strategy/welcome-step";
import { ContentTypeStep } from "@/components/strategy/content-type-step";
import { StyleStep } from "@/components/strategy/style-step";
import { StrategyResult } from "@/components/strategy/strategy-result";
import { useMutation } from "@tanstack/react-query";

const TOTAL_STEPS = 2;

type ProfileType = {
  contentType: string;
  niche: string;
  targetAudience: string;
  tone: string;
  hookStyle: string;
  contentPillars: string[];
};

export default function StrategyPage() {
  const t = useTranslations('StrategyPage');
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    // Step 1
    contentType: "",
    niche: "",
    targetAudience: "",
    // Step 2
    tone: "",
    hookStyle: "",
    contentPillars: [],
  });

  const generateStrategy = useMutation({
    mutationFn: async (profile: ProfileType) => {
      const response = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate strategy");
      }

      return response.json();
    },
    onSuccess: () => {
      setShowResult(true);
    },
  });

  const handleFieldChange = (field: string, value: string | string[]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return true; // Welcome step is always valid
      case 1:
        return profile.contentType && profile.niche && profile.targetAudience;
      case 2:
        return (
          profile.tone && profile.hookStyle && profile.contentPillars.length > 0
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS) {
      generateStrategy.mutate(profile);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleBeginStrategy = () => {
    setCurrentStep(1);
  };

  const handleRegenerate = () => {
    generateStrategy.mutate(profile);
  };

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button onClick={handleBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('backToStrategy')}
        </Button>
        <StrategyResult
          strategy={generateStrategy.data}
          isLoading={generateStrategy.isPending}
          onRegenerate={handleRegenerate}
        />
      </div>
    );
  }

  // Show welcome step separately without progress bar and navigation
  if (currentStep === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <WelcomeStep onBegin={handleBeginStrategy} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {t('stepOf', { current: currentStep, total: TOTAL_STEPS })}
          </span>
          <span>{t('percentComplete', { percent: Math.round((currentStep / TOTAL_STEPS) * 100) })}</span>
        </div>
        <Progress value={(currentStep / TOTAL_STEPS) * 100} />
      </div>

      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <ContentTypeStep data={profile} onChange={handleFieldChange} />
        )}
        {currentStep === 2 && (
          <StyleStep data={profile} onChange={handleFieldChange} />
        )}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentStep === 1}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isStepValid() || generateStrategy.isPending}
        >
          {currentStep === TOTAL_STEPS ? (
            generateStrategy.isPending ? (
              t('generating')
            ) : (
              t('generateStrategy')
            )
          ) : (
            <>
              {t('next')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
