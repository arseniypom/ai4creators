"use client";

import {useTranslations} from 'next-intl';
import { ContentGenerator } from "@/components/content-generator";

export default function Home() {
  const t = useTranslations('GeneratePage');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <ContentGenerator />
    </div>
  );
}
