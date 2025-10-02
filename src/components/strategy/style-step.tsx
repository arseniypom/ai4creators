"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
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

interface StyleStepProps {
  data: {
    tone: string;
    hookStyle: string;
    contentPillars: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

export function StyleStep({ data, onChange }: StyleStepProps) {
  const t = useTranslations('StyleStep');
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
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>{t('toneLabel')}</Label>
          <RadioGroup
            value={data.tone}
            onValueChange={(value) => onChange("tone", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="casual" id="casual" />
              <Label htmlFor="casual">
                {t('tones.casual')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional">
                {t('tones.professional')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="humorous" id="humorous" />
              <Label htmlFor="humorous">{t('tones.humorous')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="serious" id="serious" />
              <Label htmlFor="serious">{t('tones.serious')}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>{t('hookStyleLabel')}</Label>
          <RadioGroup
            value={data.hookStyle}
            onValueChange={(value) => onChange("hookStyle", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="question" id="question" />
              <Label htmlFor="question">
                {t('hookStyles.question')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="statement" id="statement" />
              <Label htmlFor="statement">
                {t('hookStyles.statement')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="story" id="story" />
              <Label htmlFor="story">
                {t('hookStyles.story')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="statistic" id="statistic" />
              <Label htmlFor="statistic">
                {t('hookStyles.statistic')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>{t('contentPillarsLabel')}</Label>
          <div className="flex gap-2">
            <Input
              placeholder={t('contentPillarsPlaceholder')}
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
              {t('add')}
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
              {t('noPillars')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
