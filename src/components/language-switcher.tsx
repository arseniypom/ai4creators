"use client";

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Languages, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const router = useRouter();

  // Get current locale from cookie
  const getCurrentLocale = () => {
    if (typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/locale=([^;]+)/);
    return match ? match[1] : 'en';
  };

  const currentLocale = getCurrentLocale();

  const setLocale = (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`; // 1 year
    router.refresh(); // Reload to apply new locale
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Languages className="h-4 w-4 mr-2" />
          {t('label')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setLocale('en')}>
          <Check className={`h-4 w-4 mr-2 ${currentLocale === 'en' ? 'opacity-100' : 'opacity-0'}`} />
          {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('ru')}>
          <Check className={`h-4 w-4 mr-2 ${currentLocale === 'ru' ? 'opacity-100' : 'opacity-0'}`} />
          {t('russian')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
