'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  t: typeof en;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('biryani-lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir = 'ltr'; // Default to LTR for mixed text
    document.documentElement.lang = 'en';
    localStorage.setItem('biryani-lang', lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

  // Helper to deeply merge two translation objects
  const mergeTranslations = (enObj: any, arObj: any): any => {
    const merged: any = {};
    for (const key in enObj) {
      if (typeof enObj[key] === 'string') {
        const enStr = enObj[key];
        const arStr = arObj?.[key];
        if (enStr === arStr || !arStr) {
          merged[key] = enStr;
        } else {
          merged[key] = `${enStr} | ${arStr}`;
        }
      } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
        merged[key] = mergeTranslations(enObj[key], arObj?.[key] || {});
      } else {
        merged[key] = enObj[key];
      }
    }
    return merged;
  };

  // Precompute the merged translations map
  const [mergedT] = useState(() => mergeTranslations(en, ar));

  const t = mergedT as typeof en;
  const isRTL = false; // Disable global RTL when displaying both languages inline

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
