"use client";

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

interface ContentTypeStepProps {
  data: {
    contentType: string;
    niche: string;
    targetAudience: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ContentTypeStep({ data, onChange }: ContentTypeStepProps) {
  const t = useTranslations('ContentTypeStep');

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
          <Label>{t('contentTypeLabel')}</Label>
          <RadioGroup
            value={data.contentType}
            onValueChange={(value) => onChange("contentType", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="educational" id="educational" />
              <Label htmlFor="educational">
                {t('contentTypes.educational')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entertaining" id="entertaining" />
              <Label htmlFor="entertaining">
                {t('contentTypes.entertaining')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inspirational" id="inspirational" />
              <Label htmlFor="inspirational">
                {t('contentTypes.inspirational')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="promotional" id="promotional" />
              <Label htmlFor="promotional">
                {t('contentTypes.promotional')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="niche">{t('nicheLabel')}</Label>
          <Input
            id="niche"
            placeholder={t('nichePlaceholder')}
            value={data.niche}
            onChange={(e) => onChange("niche", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">{t('audienceLabel')}</Label>
          <Input
            id="audience"
            placeholder={t('audiencePlaceholder')}
            value={data.targetAudience}
            onChange={(e) => onChange("targetAudience", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
